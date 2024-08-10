import { expect } from 'chai';
import { authMiddleware } from "../middleware/is-Auth.js"

it('Should throw an error when no authorization error is present' , function(){
    const req = {
        get : function(headerName){
            return null ;
        }
    };

    expect(authMiddleware.bind(this , req, {} , function(){})).to.throw('Not authenticated!');
})