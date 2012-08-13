var Parser = require('./parser')
var Builder = require('./builder')
var formatters = require('./formatters')

module.exports = {
	Parser: Parser,
	Builder: Builder,

	formatters: formatters,

	parse: function (source, filename) {
		var parser = new Parser({
			filename: filename
		})

		parser.parse(source)

		var builder = new Builder()

		return builder.build(parser.data)
	}
}
