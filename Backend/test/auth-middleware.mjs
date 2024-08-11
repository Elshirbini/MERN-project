import { expect } from "chai";
import { authMiddleware } from "../middleware/is-Auth.js";
import jwt from "jsonwebtoken";
import Sinon from "sinon";

describe("Auth Middleware", () => {
  it("should throw an error if no authorization header is present", () => {
    const req = {
      get: (headerName) => {
        return null;
      },
    };
    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw(
      "Not authenticated!"
    );
  });

  it("should throw an error if the authorization header is only one string", () => {
    const req = {
      get: (headerName) => {
        return "xyz";
      },
    };

    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw();
  });

  it("Should yield a userId after decoding", () => {
    const req = {
      get: (headerName) => {
        return "Bearer fgnsafgnfajgfcvjg";
      },
    };
    Sinon.stub(jwt, "verify");
    jwt.verify.returns({ userId: "abc" });
    authMiddleware(req, {}, () => {});
    expect(req).to.have.property("userId");
    expect(jwt.verify.called).to.be.true;
    jwt.verify.restore();
  });

  it("Should throw an error if the token cannot be verified", () => {
    const req = {
      get: (headerName) => {
        return "Bearer xyz";
      },
    };
    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw();
  });
});
