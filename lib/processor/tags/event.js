"use strict";

module.exports = function (args) {
    this.type = 'event'

    args = args.split(' ')

    if (args.length === 1) {
        this.eventOf = args[0]

        return
    }

    this.eventOf = args.pop()
    this.name = args.join(' ')
}
