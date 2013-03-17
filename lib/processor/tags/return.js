"use strict";

var parseProperty = require('./parse-property')

module.exports = function (args) {
    var prop = parseProperty(args)

    prop.description = prop.name + prop.description

    delete prop.name

    this.returns.push(prop)
}
