"use strict";

module.exports = function (args) {
    void [].push.apply(this.aliases, args.split(/\s+/g))
}
