var fs = require('fs')
var path = require('path')
var glob = require('glob')

// more popular packages should go here, maybe?
function isTestPkg (p) {
  return !!p.match(/^(expresso|mocha|tap|coffee-script|coco|streamline)$/)
}

function niceName (n) {
  return n.replace(/^node-|[.-]js$/g, '')
}

exports.name = prompt('name', package.name || basename)
exports.version = prompt('version', package.version || '0.0.0')
if (!package.description) {
  exports.description = prompt('description')
}

exports.dir = function(cb){
  var n = package.name || basename;
  return cb(null, prompt('directory', new Date().getFullYear() + '/' + n))
  
}

if (!package.repository) {
  exports.repository = function (cb) {
    fs.readFile('.git/config', 'utf8', function (er, gconf) {
      if (er || !gconf) return cb(null, prompt('git repository'))

      gconf = gconf.split(/\r?\n/)
      var i = gconf.indexOf('[remote "origin"]')
      if (i !== -1) {
        var u = gconf[i + 1]
        if (!u.match(/^\s*url =/)) u = gconf[i + 2]
        if (!u.match(/^\s*url =/)) u = null
        else u = u.replace(/^\s*url = /, '')
      }
      if (u && u.match(/^git@github.com:/))
        u = u.replace(/^git@github.com:/, 'git://github.com/')

      return cb(null, prompt('git repository', u))
    })
  }
}

if (!package.archive) {
  exports.archive = function (cb) {
    fs.readFile('.git/config', 'utf8', function (er, gconf) {
      if (er || !gconf) return cb(null, prompt('git repository'))

      gconf = gconf.split(/\r?\n/)
      var i = gconf.indexOf('[remote "origin"]')
      if (i !== -1) {
        var u = gconf[i + 1]
        if (!u.match(/^\s*url =/)) u = gconf[i + 2]
        if (!u.match(/^\s*url =/)) u = null
        else u = u.replace(/^\s*url = /, '')
      }
      if (u && (u.match(/^git@github.com:/) || u.match(/https:\/\/github.com\//) ) )
        u = u.replace(/^git@github.com:/, 'https://bitbucket.org/')
             .replace(/https:\/\/github.com\//, 'https://bitbucket.org/')
             .replace('ajam','ajam-archive')

      return cb(null, prompt('archive repository', u))
    })
  }
}

if (!package.archived) {
  exports.archived = false
}

if (!package.author) {
  exports.author = config.get('init.author.name')
  ? {
      "name" : config.get('init.author.name'),
      "email" : config.get('init.author.email'),
      "url" : config.get('init.author.url')
    }
  : prompt('author')
}

/*
exports.license = prompt('license', package.license ||
                         config.get('init.license') ||
                         'MIT')
*/
