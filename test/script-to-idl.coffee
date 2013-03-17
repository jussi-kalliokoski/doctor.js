should = require('should')
fs = require('fs')
DoctorJS = require('../lib')

describe 'DoctorJS', ->
  parser = null
  builder = null

  beforeEach ->
    parser = new DoctorJS.Parser()
    builder = new DoctorJS.Builder()

  test = (filename) ->
    it 'should give correct results for ' + filename + '.js', ->
      source = fs.readFileSync(__dirname + '/sources/' + filename + '.js', 'utf8')
      parser.parse(source)
      tree = builder.build(parser.data)
      expected = JSON.stringify(tree)
      result = fs.readFileSync(__dirname + '/results/' + filename + '.json', 'utf8')
      result.should.equal(expected)

  test('context-detection')
