const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

const url = 'localhost:3001';
chai.use(chaiHttp)

describe("User Login", function() {
    describe("Check Auth", function() {
        it("try sign in", function(done) {
             chai.request(url)
            .post('/auth/login')
            .send({
            email: 'adarsh', 
            hash: '123'
            })
            .end(function (err, res) {
                expect(res.body.signIn).to.equal(false);               
                done();
            });
        });

    });
});

describe("User Register", function() {
    describe("Check Auth", function() {
        it("try register ", function(done) {
             chai.request(url)
            .post('/auth/register')
            .send({
            email: 'adarsh', 
            hash: '123'
            })
            .end(function (err, res) {
                expect(res.body.success).to.equal(true);               
                done();
            });
        });

    });
});