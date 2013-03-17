var extend = require('util')._extend
var Processor = require('../processor')

function Builder (options) {
    extend(this, options || {})

    this._processor = new Processor()
}

Builder.prototype.build = function (data) {
    var processor = this._processor

    processor.preprocess(data)

    for ( var i = 0; i < data.length; i++ ) {
        processor.preprocessToken(data, data[i])

        for ( var n = 0; n < data[i].tags.length; n++ ) {
            processor.processTag(data, data[i],
                data[i].tags[n])
        }

        processor.postprocessToken(data, data[i])
    }

    return processor.generate(data)
}

module.exports = Builder
