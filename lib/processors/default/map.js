module.exports = {
	set: function (map, prop) {
		if (!prop || !prop.name) return false

		for (var i=0; i<map.length; i++) {
			if (map[i].name !== prop.name) continue

			map.splice(i--, 1)
			break
		}

		map.push(prop)

		return true
	},

	get: function (map, name) {
		for (var i=0; i<map.length; i++) {
			if (map[i].name === name) return map[i]
		}

		return null
	},

	has: function (map, name) {
		for (var i=0; i<map.length; i++) {
			if (map[i].name === name) return true
		}

		return false
	},

	remove: function (map, name) {
		for (var i=0; i<map.length; i++) {
			if (map[i].name !== name) continue

			map.splice(i--, 1)
			return
		}
	}
}
