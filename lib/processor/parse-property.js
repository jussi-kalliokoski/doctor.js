"use strict";

var map = require('./map')

function parseProperty (str) {
    var prop = {
        name: '',
        descriptors: []
    }

    var list = str.split(' ')

    var m, d

    while (list.length) {
        d = list.shift()

        if ( !d ) continue

        m = parseProperty.propertyDescriptor.exec(d)
        if (m) {
            map.set(prop.descriptors, {
                name: m[1],
                value: m[2]
            })

            continue
        }

        m = parseProperty.typeDescriptor.exec(d)
        if (m) {
            map.set(prop.descriptors, {
                name: 'type',
                value: m[1]
            })

            continue
        }

        prop.name = d

        break
    }

    prop.description = list.join(' ')

    return prop
}

parseProperty.propertyDescriptor = /^(.+):(.+)$/
parseProperty.typeDescriptor = /^\{(.+)\}$/

module.exports = parseProperty
