import { expect } from "chai";
import jwt from "jsonwebtoken";
import Sinon from "sinon";
import User from "../models/user.js";
import authController from "../controllers/auth.js";
import mongoose from "mongoose";

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

  it("Should send a response with a valid user status for an existing user", (done) => {
    mongoose
      .connect(
        `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.ufoahrq.mongodb.net/test-messages?retryWrites=true&w=majority&appName=Cluster0`
      )
      .then((result) => {
        const user = new User({
          email: "test@test.com",
          password: "testtest",
          name: "tester",
          posts: [],
        });
        return user.save();
      })
      .then(() => {}).catch(err => console.log(err))
  });
});
