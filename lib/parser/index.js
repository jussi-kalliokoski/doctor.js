function Parser (options) {
	require('../extend')(this, options)

	this.reset()
}

Parser.prototype = {
	data: null,

	filename: '',

	commentToken: /(\/\*\*([^*]|[\r\n]|(\*+([^*\/]|[\r\n])))*\*+\/)/,
	tagToken: /^@([^\s]+)(.*)$/,
	functionToken: /^function ([$_\dA-Za-z]+)\s*\(/,
	propertyToken: /^([$_\dA-Za-z]+)\s*:\s*function\s*\(/,
	variableToken: /^((var|let)\s+)?(([$_\dA-Za-z]+\.)*)([$_\dA-Za-z]+)\s*=\s*function\s*\(/,

	parse: function (source) {
		var self = this

		self.gather(source, function (str, token, left) {
			self.getContext(token, left)

			str = str.substr(3, str.length - 5)
			str.replace(/^.*$/gm, function (l) {
				l = self.trimLine(l)

				var cmd = self.tagToken.exec(l)

				if (cmd) {
					token.tags.push({
						name: cmd[1],
						value: cmd[2].trim()
					})

					return
				}

				token.freeform += '\n' + l
			})

			token.freeform = token.freeform.trim()

			self.data.push(token)
		})
	},

	getContext: function (token, str) {
		str = str.trim()

		var m

		m = this.functionToken.exec(str)
		if (m) {
			token.name = m[1]
			return
		}

		m = this.propertyToken.exec(str)
		if (m) {
			token.name = m[1]
			return
		}

		m = this.variableToken.exec(str)
		if (m) {
			token.name = m[5]

			if (m[3]) {
				token.owner = m[3].substr(0, m[3].length - 1)
			}

			return
		}
	},

	gather: function (source, callback) {
		var s = source
		var i = s.search(this.commentToken)

		while (i !== -1) {
			var str = this.commentToken.exec(s.substr(i))[0]

			var t = {
				str: str,
				freeform: '',
				tags: []
			}

			s = s.substr(i + str.length)

			callback(str, t, s)

			i = s.search(this.commentToken)
		}
	},

	trimLine: function (str) {
		str = str.trim()

		if (str[0] === '*') {
			str = str.substr(1).trim()
		}

		return str
	},

	reset: function () {
		this.data = []
	}
}

module.exports = Parser
