var supertest = require("supertest");
var should = require("should");
var server = supertest.agent("localhost:" + (process.env.PORT || 8080));
describe("GET /typeahead/:prefix tests",function(){
  it(`should return an empty array`, function(done){
	server
	.get('/typeahead/abc')
	.expect("Content-type",/json/)
	.expect(200)
	.end(function(err,res){
	  res.status.should.equal(200);
	  res.body.should.be.instanceof(Array).and.have.lengthOf(0);
	  done();
	});
  });
  it(`should return: [{"name": "James": "times": 43}, {"name": "John": "times": 21}, {"name": "Joanna", "times": 13}, {"name": "Ja", "times": 3}]`, function(done){
	server
	.get('/typeahead/j')
	.expect("Content-type",/json/)
	.expect(200)
	.end(function(err,res){
		res.status.should.equal(200);
	  	res.body.toString().should.equal('[{"name": "James": "times": 43}, {"name": "John": "times": 21}, {"name": "Joanna", "times": 13}, {"name": "Ja", "times": 3}]');
	  	done();
	});
  });
  it(`should return: [{"name": "Ja", "times": 3}, {"name": "James", "times": 43}]`, function(done){
  server
  .get('/typeahead/j')
  .expect("Content-type",/json/)
  .expect(200)
  .end(function(err,res){
	  res.status.should.equal(200);
	  res.body.toString().should.equal('[{"name": "James": "times": 43}, {"name": "John": "times": 21}, {"name": "Joanna", "times": 13}, {"name": "Ja", "times": 3}]');
	  done();
  });
  });
})

describe("POST /typeahead/set tests",function(){
  it(`should return status 200`, function(done){
	server
	.post('/typeahead/set')
	.send({name: "John"})
	.expect(200)
	.end(function(err,res){
	  res.status.should.equal(200);
	  done();
	});
  });
  //empty object
  it("should return status 400", function(done){
    server
    .post('/typeahead/set')
    .send({})
    .expect(400)
    .end(function(err,res){
      res.status.should.equal(400);
      done();
    });
  });
  //no json
  it("should return status 400", function(done){
    server
    .post('/typeahead/set')
    .send('')
    .expect(400)
    .end(function(err,res){
      res.status.should.equal(400);
      done();
    });
  });
  //empty name
  it("should return status 400", function(done){
    server
    .post('/typeahead/set')
    .send({name: ''})
    .expect("Content-type",/json/)
    .expect(400)
    .end(function(err,res){
      res.status.should.equal(400);
      done();
    });
  });
});
