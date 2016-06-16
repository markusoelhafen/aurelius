var asyncChainable = require('async-chainable');
var spawnArgs = require('spawn-args');
var spawn = require('child_process').spawn;

module.exports = function() {
	// .exec() {{{
	this._plugins['exec'] = function(params) {
		var self = this;
		var stdboth = [];

		// Read in params from _execDefaults + params {{
		var options = JSON.parse(JSON.stringify(this._execDefaults));
		if (params)
			for (var k in params)
				options[k] = params[k];
		// }}}

		var spawner = spawn(params.cmd, params.params, options);

		var dataListener = function(data) {
			var out = data.toString();
			stdboth.push(out.substr(0, out.length -1));
		};
		if (spawner.stdout) spawner.stdout.on('data', dataListener);
		if (spawner.stderr) spawner.stderr.on('data', dataListener);

		spawner.on('close', function(code) {
			self._context.exec = { // Save details about the last exec in case any future chain wants them
				code: code,
				output: stdboth,
			};
			if (params.id) // Stash output in variable
				self._context[params.id] = stdboth;
			self._execute(); // Move onto next chain item
		});
	};

	this.exec = function() {
		var calledAs = this._getOverload(arguments);
		switch(calledAs) {
			case '':
				// Pass
				break;
			case 'string,array': // Form: exec(name, cmd + params)
				this._struct.push({
					type: 'exec',
					id: arguments[0],
					cmd: arguments[1][0],
					params: arguments[1].slice(1),
				});
				break;
			case 'string': // Form: exec(cmd + params)
				this._struct.push({
					type: 'exec',
					cmd: arguments[0].substr(0, arguments[0].indexOf(' ')),
					params: spawnArgs(arguments[0].substr(arguments[0].indexOf(' ') + 1)),
				});
				break;
			case 'string,string': // Form: exec(name, cmd + params)
				this._struct.push({
					type: 'exec',
					id: arguments[0],
					cmd: arguments[1].substr(0, arguments[1].indexOf(' ')),
					params: spawnArgs(arguments[1].substr(arguments[1].indexOf(' ') + 1)),
				});
				break;
			case 'array': // Form: exec(array <cmd + params>)
				this._struct.push({
					type: 'exec',
					cmd: arguments[0][0],
					params: arguments[0].slice(1),
				});
				break;
			case 'array,object': // Form: exec(array <cmd + params>, object)
				var payload = {
					type: 'exec',
					id: arguments[0],
					cmd: arguments[0][0],
					params: arguments[0].slice(1),
				};
				for (var key in arguments[1])
					payload[key] = arguments[1][key];
				this._struct.push(payload);
				break;
			case 'object': // Form exec(object) - expected to contain at least 'cmd', if it contains 'id' that will be saved
				var payload = arguments[0];
				if (!payload.cmd) throw new Error('No "cmd" key in passed object to async-chainable-exec');
				if (!payload.params) payload.params = [];
				payload.type = 'exec';
				this._struct.push(payload);
				break;
			case 'string,array,object': // Form: exec(name, array <cmd + params>, object <additional spawn args>)
				var payload = {
					type: 'exec',
					id: arguments[0],
					cmd: arguments[1][0],
					params: arguments[1].slice(1),
				};
				for (var key in arguments[2])
					payload[key] = arguments[2][key];
				this._struct.push(payload);
				break;
			case 'string,object': // Form: exec(string <name>, object <additional spawn args>)
				if (!arguments[1].cmd) throw new Error('No "cmd" key in passed object to async-chainable-exec');
				var payload = {
					type: 'exec',
					id: arguments[0],
				};
				for (var key in arguments[1])
					payload[key] = arguments[1][key];
				this._struct.push(payload);
				break;
			default:
				throw new Error('Unsupported call type for async-chainable-exec: ' + calledAs);
		}

		return this;
	};
	// }}}

	// .execDefaults {{{
	this._execDefaults = {};

	this._plugins['execDefaults'] = function(params) {
		this._execDefaults = params.payload;
		this._execute(); // Move onto next chain item
	};

	this.execDefaults = function() {
		var calledAs = this._getOverload(arguments);
		switch(calledAs) {
			case '':
				// Pass
				break;
			case 'object':
				this._struct.push({
					type: 'execDefaults',
					payload:  arguments[0],
				});
				break;
			default:
				throw new Error('Unsupported call type for async-chainable-exec/execDefaults: ' + calledAs);
		}

		return this;
	};
	// }}}
};
