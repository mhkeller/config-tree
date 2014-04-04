
module.exports = init
var PZ = require('promzard').PromZard
var path = require('path')

var fs = require('fs')
var read = require('read')

function checkConfig(path){
  return fs.existsSync(path)
}

function init (dir, input, config, cb) {
  if (typeof config === 'function')
    cb = config, config = {}

  // with a "get" method.
  if (typeof config.get !== 'function') {
    var data = config
    config = {
      get: function (k) {
        return data[k]
      },
      toJSON: function () {
        return data
      }
    }
  }

  var package,
      pkg,
      package_out,
      config_path = path.resolve(dir, 'config.json'),
      config_sample_path = path.resolve(dir, 'config.sample.json'),
      config_exists = checkConfig( config_path );

  if (config_exists){
    package = config_path
    pkg = require(config_path)
  } else {
    package = config_sample_path
    pkg = require(config_sample_path)
  }

  package_out = config_path

  input = path.resolve(input)
  var ctx = {}
  ctx.package = pkg

  // make sure that the input is valid.
  // if not, use the default
  var pz = new PZ(input, ctx)

  var def = require.resolve(dir + '/default-input.js')
  pz.backupFile = def
  pz.on('error', cb)
  pz.on('data', function (data) {

    Object.keys(data).forEach(function (k) {
      if (data[k] !== undefined && data[k] !== null) pkg[k] = data[k]
    })

    var d = JSON.stringify(pkg, null, 2) + '\n'
    console.log('About to write to %s:\n\n%s\n', package_out, d)
    read({prompt:'Is this ok? ', default: 'yes'}, function (er, ok) {
      if (!ok || ok.toLowerCase().charAt(0) !== 'y') {
        console.log('Aborted.')
      } else {
        fs.writeFile(package_out, d, 'utf8', function (er) {
          return cb(er, pkg)
        })
      }
    })
  })

}
