function JSONFormatter () {}

JSONFormatter.prototype = {
	format: function (data) {
		return JSON.stringify(data)
	}
}

module.exports = JSONFormatter
