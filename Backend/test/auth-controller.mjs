import { expect } from "chai";
import jwt from "jsonwebtoken";
import Sinon from "sinon";
import User from "../models/user.js";
import authController from "../controllers/auth.js";

describe("Auth Controller - Login", () => {
  it("Should throw an error with code 500 if accessing the database fails", (done) => {
    Sinon.stub(User, "findOne");
    User.findOne.throws();

    const req = {
      body: {
        email: "test@test.com",
        password: "tester",
      },
    };
    authController
      .login(req, {}, () => {})
      .then((result) => {
        console.log(result);
        expect(result).to.be.an("error");
        expect(result).to.have.property("statusCode", 500);
        done();
      });

    User.findOne.restore();
  });
});
