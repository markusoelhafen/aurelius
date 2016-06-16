var expect = require('chai').expect;
// var asyncChainable = require('async-chainable');
var asyncChainable = require('/home/mc/Papers/Projects/Node/async-chainable/index.js');
var asyncChainableExec = require('../index');


describe('exec(name, [cmd + params])', function() {
	var output;

	beforeEach(function(done) {
		output = '';

		asyncChainable()
			.use(asyncChainableExec)
			.exec('execOutput', ['echo', 'foo', 'bar', 'baz'])
			.end(function(err) {
				expect(err).to.be.undefined();
				output = this.execOutput;
				done();
			});

	});

	it('should return the correct response', function() {
		expect(output).to.have.length(1);
		expect(output[0]).to.be.equal('foo bar baz');
	});
});


describe('exec(cmd + params)', function(){
	var output;

	beforeEach(function(done) {
		output = '';

		asyncChainable()
			.use(asyncChainableExec)
			.exec('echo w00t')
			.end(function(err) {
				expect(err).to.be.undefined();
				output = this.exec.output;
				done();
			});

	});

	it('should return the correct response', function() {
		expect(output).to.have.length(1);
		expect(output[0]).to.be.equal('w00t');
	});
});


describe('exec(name, cmd)', function(){
	var output;

	beforeEach(function(done) {
		output = '';

		asyncChainable()
			.use(asyncChainableExec)
			.exec('response', 'echo hello world')
			.end(function(err) {
				expect(err).to.be.undefined();
				output = this.response;
				done();
			});

	});

	it('should return the correct response', function() {
		expect(output).to.have.length(1);
		expect(output[0]).to.be.equal('hello world');
	});
});


describe('exec([cmd + params])', function() {
	var output;

	beforeEach(function(done) {
		output = '';

		asyncChainable()
			.use(asyncChainableExec)
			.exec(['echo', 'green', 'eggs', 'and', 'ham'])
			.end(function(err) {
				expect(err).to.be.undefined();
				output = this.exec.output;
				done();
			});

	});

	it('should return the correct response', function() {
		expect(output).to.have.length(1);
		expect(output[0]).to.be.equal('green eggs and ham');
	});
});


describe('exec(cmdObject)', function(){
	var output;

	beforeEach(function(done) {
		output = '';

		asyncChainable()
			.use(asyncChainableExec)
			.exec({
				id: 'noises',
				cmd: 'echo',
				params: ['crash', 'bang', 'boom'],
				cwd: __dirname,
			})
			.end(function(err) {
				expect(err).to.be.undefined();
				output = this.noises;
				done();
			});

	});

	it('should return the correct response', function() {
		expect(output).to.have.length(1);
		expect(output[0]).to.be.equal('crash bang boom');
	});
});


describe('exec(name, [cmd + params], additional)', function(){
	var output;

	beforeEach(function(done) {
		output = '';

		asyncChainable()
			.use(asyncChainableExec)
			.exec('bash2', ['bash', '-c', 'echo My directory is $PWD'],  {cwd: __dirname})
			.end(function(err) {
				expect(err).to.be.undefined();
				output = this.bash2;
				done();
			});

	});

	it('should return the correct response', function() {
		expect(output).to.have.length(1);
		expect(output[0]).to.be.equal('My directory is ' + __dirname);
	});
});

describe('exec(name, cmdObject)', function(){
	var output;

	beforeEach(function(done) {
		output = '';

		asyncChainable()
			.use(asyncChainableExec)
			.exec('output', {
				cmd: 'bash',
				params: ['-c', 'echo $PWD'],
				cwd: __dirname,
			})
			.end(function(err) {
				expect(err).to.be.undefined();
				output = this.output;
				done();
			});

	});

	it('should return the correct response', function() {
		expect(output).to.have.length(1);
		expect(output[0]).to.be.equal(__dirname);
	});
});
