import { expect } from "chai";
import Sinon from "sinon";
import  { User }  from "../models/user.js";
import {login , getStatus} from "../controllers/auth.js";
import mongoose from "mongoose";


describe("Auth Controller", () => {

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
            _id : '5c0f66b979af55031b34728a'
          });
          return user.save();
        }).then(() => {
            done()
        })
        .catch(err => console.log(err))

    })

  it("Should throw an error with code 500 if accessing the database fails", (done) => {
    Sinon.stub(User, "findOne");
    User.findOne.throws();

    const req = {
      body: {
        email: "test@test.com",
        password: "tester",
      },
    };
    
      login(req, {}, () => {})
      .then((result) => {
        expect(result).to.be.an("error");
        expect(result).to.have.property("statusCode", 500);
        done();
      });

    User.findOne.restore();
  });

  it("Should send a response with a valid user status for an existing user", (done) => {
        const req = {userId : '5c0f66b979af55031b34728a'}
        const res = {
            statusCode : 500,
            userStatus : null,
            status : function(code) {
                this.statusCode = code
                return this
            },
            json : function(data) {
                this.userStatus = data.status
            }
        }
        getStatus(req,res,()=> {}).then(() => {
            expect(res.statusCode).to.be.equal(200)
            expect(res.userStatus).to.be.equal("I'am new !")
            done()
        })
        .catch(err => console.log(err))
    });
    
    after((done) => {
        User.deleteMany({}).then(() => {
            return mongoose.disconnect()
        }).then(() => {
            done()
        })
  })
});
