"use strict";

module.exports.set = function (map, prop) {
    if ( !prop || !prop.name ) return false

    for ( var i = 0; i < map.length; i++ ) {
        if ( map[i].name !== prop.name ) continue

        map.splice(i--, 1)
        break
    }

    map.push(prop)

    return true
}

module.exports.get = function (map, name) {
    for ( var i = 0; i < map.length; i++ ) {
        if ( map[i].name === name ) return map[i]

        for ( var n = 0; n < map[i].aliases.length; i++ ) {
            if ( map[i].aliases[n] === name ) return map[i]
        }
    }

    return null
}

module.exports.has = function (map, name) {
    for ( var i = 0; i < map.length; i++ ) {
        if ( map[i].name === name ) return true
        if ( !map[i].aliases ) continue

        for ( var n = 0; n < map[i].aliases.length; i++ ) {
            if ( map[i].aliases[n] === name ) return true
        }
    }

    return false
}

module.exports.remove = function (map, name) {
    for ( var i = 0; i < map.length; i++ ) {
        if ( map[i].name !== name ) continue

        map.splice(i--, 1)
        return
    }
}
