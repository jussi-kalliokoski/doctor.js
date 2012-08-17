var map = require('./map')
var parseProperty = require('./parse-property')

module.exports = {
	'name': function (args) {
		this.name = args
	},

	'class': function (args) {
		this.type = 'class'

		if (args) this.name = args
	},

	'method': function (args) {
		this.type = 'method'

		this.methodOf = args
	},

	'static': function (args) {
		this.staticOf = args
	},

	'prop': function (args) {
		var prop = parseProperty(args)

		if (!map.has(prop.descriptors, 'visibility')) {
			map.set(prop.descriptors, {
				name: 'visibility',
				value: 'public'
			})
		}

		map.set(this.properties, prop)
	},

	'arg': function (args) {
		var prop = parseProperty(args)

		prop.optional = prop.name[0] === '!'

		if (prop.optional) prop.name = prop.name.substr(1)

		this.arguments.push(prop)
	},

	'private': function (args) {
		this.visibility = 'private'
	},

	'public': function (args) {
		this.visibility = 'public'
	},

	'protected': function (args) {
		this.visibility = 'protected'
	},

	'inherits': function (args) {
		this.inherits.push(args)
	},

	'extends': function (args) {
		this.extends.push(args)
	},

	'implements': function (args) {
		this.implements.push(args)
	},

	'return': function (args) {
		var prop = parseProperty(args)

		prop.description = prop.name + prop.description

		delete prop.name

		this.returns.push(prop)
	},

	'throws': function (args) {
		var prop = parseProperty(args)

		prop.description = prop.name + prop.description

		delete prop.name

		this.throws.push(prop)
	}
}
