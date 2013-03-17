"use strict";

var parseProperty = require('./parse-property')

module.exports = function (args) {
    var prop = parseProperty(args)

    prop.optional = prop.name[0] === '!'

    if ( prop.optional ) prop.name = prop.name.substr(1)

    this.arguments.push(prop)
}
