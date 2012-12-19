function Interface (token) {
	var ifc = {
		name: token.name,

		description: token.freeform,

		type: 'function',
		visibility: 'public',

		arguments: [],
		returns: [],
		throws: [],

		implements: [],
		inherits: [],
		extends: [],

		properties: [],
		staticProperties: [],

		methods: [],
		staticMethods: [],

		events: [],
		staticEvents: [],

		staticClasses: []
	}

	if (token.owner) {
		var owner = token.owner.split('.')

		switch (owner.length) {
		case 2:
			if (owner[1] !== 'prototype') break
			ifc.type = 'method'
			ifc.methodOf = owner[0]
			break
		case 1:
			ifc.methodOf = owner[0]
			ifc.staticOf = owner[0]
			break
		}
	}

	return ifc
}

module.exports = Interface
