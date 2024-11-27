import request from "supertest";
import { app } from "../NewExpress/Server";

test("should signup a new user", async () => {
  await request(app)
    .post("/api/v1/auth/signup")
    .send({
      CompanyName: "Saturday Solutions Inc.",
      CompanyLogo: "https://example.com/logo.png",
      CompanyAddress: "1234 Silicon Valley, CA",
      CompanyPhone: "+8373456789",
      CompanyEmail: "Saturday@techsolutions.com",
      CompanyPassword: "hello",
      CompanyConfirmPassword: "hello",
    })
    .expect(201);
});
