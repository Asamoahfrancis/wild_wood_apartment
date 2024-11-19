import mongoose from "mongoose";
import dotenv from "dotenv";
import chalk from "chalk";

dotenv.config();

interface Idbconnections {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
}

const dbPORT = process.env.DB_CONNECTION as string;
const dbUrlProd = process.env.MONGODB_PROD as string;

export class DBClass implements Idbconnections {
  private static instance: DBClass | null = null;
  private static serverSelectionTimeoutMS = 5000;
  private static maxRetries = 5;
  private static retryDelay = 2000;

  private constructor() {
    mongoose.connection.on("connected", () =>
      console.log(chalk.white("MongoDB connected"))
    );
    mongoose.connection.on("disconnected", () =>
      console.log(chalk.white("MongoDB disconnected"))
    );
    mongoose.connection.on("error", (error) =>
      console.error("MongoDB connection error:", error)
    );
  }

  // Singleton instance getter
  public static getInstance(): DBClass {
    if (!DBClass.instance) {
      DBClass.instance = new DBClass();
    }
    return DBClass.instance;
  }

  // Retry delay function
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Connect to MongoDB with retry logic
  public async connect(): Promise<void> {
    const connectionString = (() => {
      if (process.env.NODE_ENV === "production") {
        if (!dbUrlProd) {
          console.error(
            "Production MongoDB connection string (MONGODB_PROD) is not defined in environment variables."
          );
          process.exit(1); // Exit if the production connection string is not set
        }
        return dbUrlProd;
      } else {
        if (!dbPORT) {
          console.error(
            "Development MongoDB connection string (DB_CONNECTION) is not defined in environment variables."
          );
          process.exit(1); // Exit if the development connection string is not set
        }
        return dbPORT;
      }
    })();

    let attempt = 0;
    while (attempt < DBClass.maxRetries) {
      try {
        await mongoose.connect(connectionString, {
          serverSelectionTimeoutMS: DBClass.serverSelectionTimeoutMS,
        });
        console.log(chalk.green("MongoDB connection established"));
        return; // Exit if connection is successful
      } catch (error) {
        attempt++;
        console.error(
          `Error connecting to MongoDB (attempt ${attempt}/${DBClass.maxRetries}):`,
          error
        );

        if (attempt >= DBClass.maxRetries) {
          console.error(
            chalk.red("Max retries reached. Failed to connect to MongoDB.")
          );
          process.exit(1); // Exit if max retries are reached
        }

        // Wait before retrying
        console.log(
          chalk.yellow(
            `Retrying to connect in ${DBClass.retryDelay / 1000} seconds...`
          )
        );
        await this.delay(DBClass.retryDelay);
      }
    }
  }

  public async disconnect(): Promise<void> {
    try {
      await mongoose.connection.close();
      console.log("MongoDB connection closed");
    } catch (error) {
      console.error("Error disconnecting from MongoDB:", error);
    }
  }
}
