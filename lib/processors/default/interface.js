function Interface (token) {
	return {
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
}

module.exports = Interface
