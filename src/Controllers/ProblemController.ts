import { Response, Request, NextFunction } from "express";
import Problem from "../Models/Problem";

interface ProblemType {
  CreateProblem: (req: Request, res: Response, next: NextFunction) => void;
  GetAllProblem: (req: Request, res: Response, next: NextFunction) => void;
  GetSingleProblem: (req: Request, res: Response, next: NextFunction) => void;
  UpdateProblem: (req: Request, res: Response, next: NextFunction) => void;
}

export const ProblemController: ProblemType = {
  CreateProblem: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ProblemPayload = req.body;
      const newProblem = new Problem(ProblemPayload);
      const saveProblem = await newProblem.save();
      res.status(201).send({ saveProblem });
    } catch (error) {
      next(error);
    }
  },
  GetAllProblem: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const allProblems = await Problem.find();
      res.status(201).send({ payload: allProblems });
    } catch (error) {
      next(error);
    }
  },
  GetSingleProblem: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const problemID = req.params.id;
      if (!problemID) {
        res.status(404).send({ message: "params is invalid" });
        return;
      }
      const isMatch = await Problem.exists({ _id: problemID });
      if (!isMatch) {
        res.status(404).send({ message: "problem id did not match" });
        return;
      }

      const FoundTheOne = await Problem.findOne({ _id: problemID });
      if (!FoundTheOne) {
        res.status(404).send({ message: "no problem found" });
        return;
      }

      res.status(200).send({ payload: FoundTheOne });
    } catch (error) {
      next(error);
    }
  },
  UpdateProblem: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const problemID = req.params.id;
      if (!problemID) {
        res.status(404).send({ message: "params is invalid" });
        return;
      }
      const isMatch = await Problem.exists({ _id: problemID });
      if (!isMatch) {
        res.status(404).send({ message: "problem id did not match" });
        return;
      }

      const FoundTheOne = await Problem.findOne({ _id: problemID });
      if (!FoundTheOne) {
        res.status(404).send({ message: "no problem found" });
        return;
      }
      const PermitedUpadte = ["ProblemDescription", "ProblemType"];
      const objectKeys = Object.keys(req.body);

      const isTrue = objectKeys.every((data) => PermitedUpadte.includes(data));
      if (!isTrue) {
        res
          .status(404)
          .send({ messga: "please provide a valid keys to update" });
        return;
      }

      PermitedUpadte.forEach((data) => {
        if (req.body[data]) {
          (FoundTheOne as any)[data] = req.body[data];
        }
      });

      await FoundTheOne.save();
      res
        .status(201)
        .send({ message: "Updated successfully", payload: FoundTheOne });
    } catch (error) {
      next(error);
    }
  },
};
