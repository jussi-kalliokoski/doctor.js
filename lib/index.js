var Parser = require('./parser')
var Builder = require('./builder')

module.exports = {
    Parser: Parser,
    Builder: Builder
}

module.exports.parse = function (source, filename) {
    var parser = new Parser({
        filename: filename
    })

    parser.parse(source)

    var builder = new Builder()

    return builder.build(parser.data)
}
