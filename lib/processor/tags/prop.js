"use strict";

var parseProperty = require('./parse-property')
var map = require('./map')

module.exports = function (args) {
    var prop = parseProperty(args)

    if ( !map.has(prop.descriptors, 'visibility') ) {
        map.set(prop.descriptors, {
            name: 'visibility',
            value: 'public'
        })
    }

    map.set(this.properties, prop)
}
