function Processor () {}

Processor.prototype = {
	preprocess: function (data) {
	},

	preprocessToken: function (data, token) {
	},

	postprocessToken: function (data, token) {
	},

	processTag: function (data, token, tag) {
	},

	generate: function (data) {
		return data
	}
}

Processor.inherit = function (proto) {
	return require('../extend')(new Processor(), proto)
}

module.exports = Processor
