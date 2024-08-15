import { expect } from "chai";
import  { User } from "../models/user.js";
import { createPost } from "../controllers/feed.js";
import mongoose from "mongoose";

describe("Feed Controller", () => {
  before((done) => {
    mongoose
      .connect(
        `mongodb+srv://Elshirbini:Aa5527980098@cluster0.ufoahrq.mongodb.net/test-messages?retryWrites=true&w=majority&appName=Cluster0`
      )
      .then((result) => {
        const user = new User({
          email: "test@test.com",
          password: "testtest",
          name: "tester",
          posts: [],
          _id: "5c0f66b979af55031b34728a",
        });
        return user.save();
      })
      .then(() => {
        done();
      })
      .catch((err) => console.log(err));
  });

  it("Should add a created post to the posts of the creator", (done) => {
    const req = {
      body: {
        title: "Test post",
        content: "A test post",
      },
      file: {
        path: "abc",
      },
      userId: "5c0f66b979af55031b34728a",
    };

    const res = {
      status: function() {
        return this;
      },
      json: function() {}
    };

    
      createPost(req, res, () => {})
      .then((savedUser) => {
        expect(savedUser).to.have.property("posts");
        expect(savedUser.posts).to.have.length(1);
        done();
      }).catch(err => console.log(err))
  });

  after((done) => {
    User.deleteMany({})
      .then(() => {
        return mongoose.disconnect();
      })
      .then(() => {
        done();
      })
  })
});
