var Interface = require('./interface')
var tags = require('./tags')
var Processor = require('../')
var map = require('./map')

function DefaultProcessor () {
	this.interfaces = []
}

DefaultProcessor.prototype = Processor.inherit({
	interfaces: null,

	tags: tags,

	preprocessToken: function (data, token) {
		token.interface = new Interface(token)
		this.interfaces.push(token.interface)
	},

	postprocessToken: function (data, token) {
		var ifc = token.interface

		if (ifc.type === 'function' && ifc.staticOf) {
			ifc.type = 'method'
			ifc.methodOf = ifc.staticOf
		}
	},

	processTag: function (data, token, tag) {
		if (!this.tags.hasOwnProperty(tag.name)) return

		this.tags[tag.name].call(token.interface, tag.value)
	},

	generate: function (data) {
		var classMap = []
		var interfaces = this.interfaces

		interfaces.forEach(function (ifc) {
			if (
				ifc.type === 'class' &&
				!ifc.staticOf
			) map.set(classMap, ifc)
		})

		interfaces.forEach(function (ifc) {
			var owner, methods

			switch (ifc.type) {
			case 'class':
				if (!ifc.staticOf) return
				owner = map.get(classMap, ifc.staticOf)
				if (!owner) return

				map.set(owner.staticClasses, ifc)

				delete ifc.staticOf

				break
			case 'method':
				if (!ifc.methodOf) return
				owner = map.get(classMap, ifc.methodOf)
				if (!owner) return

				methods = ifc.staticOf ? owner.staticMethods :
					owner.methods

				map.set(methods, ifc)

				delete ifc.staticOf
				delete ifc.methodOf

				break
			case 'event':
				if (!ifc.eventOf) return
				owner = map.get(classMap, ifc.eventOf)
				if (!owner) return

				methods = 'staticOf' in ifc ? owner.staticEvents :
					owner.events

				map.set(methods, ifc)

				delete ifc.staticOf
				delete ifc.eventOf

				break
			}
		})

		return classMap
	}
})

module.exports = DefaultProcessor
