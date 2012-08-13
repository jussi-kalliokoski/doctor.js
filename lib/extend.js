module.exports = function (obj) {
	var i, k

	for (i=1; i<arguments.length; i++) {
		if (!arguments[i]) continue

		for (k in arguments[i]) {
			if (!arguments[i].hasOwnProperty(k)) continue

			obj[k] = arguments[i][k]
		}
	}

	return obj
}
