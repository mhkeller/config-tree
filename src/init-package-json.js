module.exports = init
var PZ = require('promzard').PromZard;
var path = require('path');
var fs = require('fs');
var read = require('read');
var extend = require('./extend.js')
var chalk = require('chalk');
var _ = require('underscore');
var io = require('indian-ocean');

function dirExists(path){
  return io.existsSync(path);
}

function init (dir, name_prefix, input, config, cb) {
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

  // Find and set `.conf` dir
  var home_dir = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE,
  		conf_dir_path = home_dir + '/.conf'
  		conf_dir_exists = dirExists( conf_dir_path );

  // If it doesn't exist, create the `.conf` folder
  if (!conf_dir_exists)	{
  	fs.mkdirSync( conf_dir_path );
  }

  var package,
      pkg,
      package_out,
      config_path = conf_dir_path + '/' + name_prefix + '-config.json',
      config_sample_path = path.resolve(dir, 'config.sample.json'),
      config_exists = dirExists( config_path );

  if (config_exists){
    package = config_path;
    pkg = extend(true, require(config_sample_path), require(config_path)); // extend the sample config so it will grab any new keys if you made additions the sample schema
  } else {
    package = config_sample_path;
    pkg = require(config_sample_path);
  }

  package_out = config_path;

  input = path.resolve(input);
  var ctx = {};
  ctx.package = pkg;

  // make sure that the input is valid.
  // if not, use the default
  var pz = new PZ(input, ctx);

  var def = require.resolve(dir + '/default-input.js');
  pz.backupFile = def;
  pz.on('error', cb);
  pz.on('data', function (data) {

    Object.keys(data).forEach(function (k) {
      if (data[k] !== undefined && data[k] !== null) pkg[k] = data[k];
    })

    var d = JSON.stringify(pkg, null, 2) + '\n';
    console.log('About to write to %s:\n\n%s\n', package_out, d);
    read({prompt: chalk.cyan('Is this ok? '), default: 'yes'}, function (er, ok) {
      if (!ok || ok.toLowerCase().charAt(0) !== 'y') {
        console.log('Aborted.');
      } else {
        fs.writeFile(package_out, d, 'utf8', function (er) {
          return cb(er, pkg);
        })
      }
    })
  })

}
