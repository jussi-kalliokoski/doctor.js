#!/usr/bin/env node

"use strict";

var handleError = function (e) {
    console.error(e.toString())
    process.exit(1)
}

var finish = function () {
    var data = builder.build(parser.data)

    write(JSON.stringify(data))
}

var write = function () {
    var data = [].join.call(arguments, ' ')

    if ( outputFile === '-' ) {
        process.stdout.write(data)
    } else {
        fs.writeFile(outputFile, data, 'utf8', function (e) {
            if (e) throw e
        })
    }
}

var read = function (file) {
    if ( file === '-' ) {
        process.stdin.on('data', function (data) {
            data = String(data)

            parse(data)
        })

        process.stdin.resume()
    } else {
        fs.readFile(file, 'utf8', function (e, data) {
            if (e) throw e

            parse(data)
        })
    }
}

var parse = function (data) {
    parser.parse(data)

    if ( !--filesToRead ) finish()
}


var DoctorJS = require('../lib')
var fs = require('fs')
var paramon = require('paramon')

var args = paramon.readFormat(process.argv, require('./args.json'))

if ( !args.debug ) process.on('uncaughtException', handleError)

var parser = new DoctorJS.Parser()
var builder = new DoctorJS.Builder()

var outputFile = args.outfile || '-'
var inFiles = args['$!stray']

if ( !inFiles.length ) inFiles.push('-')

var filesToRead = inFiles.length

inFiles.forEach(read)
