var supertest = require("supertest");
var should = require("should");
var server = supertest(require('../start.js'))
describe("GET /typeahead/:prefix tests", function() {
	describe("No match test", function() {
		it(`should return an empty array`, function(done) {
			server
			.get('/typeahead/abc')
			.expect("Content-type", /json/)
			.expect(200)
			.end(function(err, res) {
				res.status.should.equal(200);
				res.body.should.be.instanceof(Array).and.have.lengthOf(0);
				done();
			});
		});
	});
	describe("One letter test", function() {
		it(`should return: [{"name": "James": "times": 43}, {"name": "John": "times": 21}, {"name": "Joanna", "times": 13}, {"name": "Ja", "times": 3}]`, function(done) {
			server
			.get('/typeahead/j')
			.expect("Content-type", /json/)
			.expect(200)
			.end(function(err, res) {
				res.status.should.equal(200);
				JSON.stringify(res.body).should.equal(JSON.stringify(JSON.parse('[{"name": "James", "times": 43}, {"name": "John", "times": 21}, {"name": "Joanna", "times": 13}, {"name": "Ja", "times": 3}]')));
				done();
			});
		});
	});
	describe("Two letter test", function() {
		it(`should return: [{"name": "Ja", "times": 3}, {"name": "James", "times": 43}]`, function(done) {
			server
			.get('/typeahead/ja')
			.expect("Content-type", /json/)
			.expect(200)
			.end(function(err, res) {
				res.status.should.equal(200);
				JSON.stringify(res.body).should.equal(JSON.stringify(JSON.parse('[{"name": "Ja", "times": 3}, {"name": "James", "times": 43}]')));
				done();
			});
		});
	})
	describe("increasing \"John\" popularity", function() {
		it(`should return status 200`, function(done) {
			server
			.post('/typeahead/set')
			.send({name: "John"})
			.expect(200)
			.end(function(err, res) {
				res.status.should.equal(200);
				done();
			});
		});
	});
	describe("no name test", function() {
		it("should return status 400", function(done) {
			server
			.post('/typeahead/set')
			.send({})
			.expect(400)
			.end(function(err, res) {
				res.status.should.equal(400);
				done();
			});
		});
	});
	describe("empty json test", function() {
		it("should return status 400", function(done) {
			server
			.post('/typeahead/set')
			.send('')
			.expect(400)
			.end(function(err, res) {
				res.status.should.equal(400);
				done();
			});
		});
	});
	describe("empty name test", function() {
		it("should return status 400", function(done) {
			server
			.post('/typeahead/set')
			.send({name: ''})
			.expect("Content-type", /json/)
			.expect(400)
			.end(function(err, res) {
				res.status.should.equal(400);
				done();
			});
		});
	});

});
