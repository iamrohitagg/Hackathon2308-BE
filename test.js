const chai = require('chai');
const chaiHttp = require('chai-http');
const serialiser = require('node-serialize')
const should = chai.should();
chai.use(chaiHttp);
let server = require('./index');

describe('GET Issues', () =>{
    const table = "create table issues (id int not null primary key, name varchar(255) not null, description varchar(512) not null, url varchar(255)  not null, number int  not null, label varchar(300), state varchar(10) not null, locked bit not null )"
    it('should test get request for issues', (done) =>{
        chai.request(server).get('/issues?page=1').end((err,res)=>{
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Successfully fetched 10 records');
            res.body.should.have.property('issues');
            done();
        })
    })
})

describe ('POST Issues', () =>{
    it('should test a post request and return entry in a form of issue', (done) => {
        const requestBody = {
            id: 4,
            name: "npm-cache issues",
            description: "The server seems to be having some cache issues",
            url: "https://api.github.com/repos/test-repo/issues/1",
            number: 12,
            label: serialiser.serialize(['issue', 'bug_report']),
            state: 'open',
            locked: false

        }
        chai.request(server).post('/data').set('content-type', 'application/json').send(requestBody).end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('1 record inserted successfully');
            done();
        })
    })
})

describe (' PATCH ISSUES', () => {

    const requestBody = {
        id: 4,
        name: "npm-cache issues",
        description: "The server seems to be having some cache issues",
        url: "https://api.github.com/repos/test-repo/issues/1",
        number: 12,
        label: serialiser.serialize(['issue', 'bug_report']),
        state: 'open',
        locked: false

    }
    it('should test the patch request of the issue pages', (done) => {

        chai.request(server).patch('/update-issue/:' + requestBody.id).send('content-type', 'application/json').send(requestBody).end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('1 record updated successfully');
            done();
        })
    })
})

describe ('Delete Issues' , () => {

    it('should delete the issues mentioned by user', ()=>{

        chai.request(server).delete('/delete-issue/:'+ 4).end((err,res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('1 record deleted successfully');
            done();
        })
    })
})