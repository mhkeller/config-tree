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
exports.github  = {}
exports.server  = {}
exports.archive = {}

exports.github.type         = prompt('GitHub account type', package.github.type)
exports.github.account      = prompt('Account name')
exports.github.access_token = prompt('Github access token')
exports.github.private      = prompt('Create private repos by default?', package.github.private)

exports.server.url = prompt('Strangelove server url', package.server.url)

var archive_enabled;
exports.archive.enabled = prompt('Enable archiving', String(package.archive.enabled), function(enabled){
  if (enabled === "false") enabled = false
  if (enabled === "true")  enabled = true
  archive_enabled = enabled
  return enabled
})

exports.archive.type = function(cb){
  response = null
  if (archive_enabled) response = prompt('Account type', package.archive.type)
  cb(null, response)
}
exports.archive.account_name = function(cb){
  response = null
  if (archive_enabled) response = prompt('Account name')
  cb(null, response)
}
exports.archive.access_token = function(cb){
  response = null
  if (archive_enabled) response = prompt('Access token')
  cb(null, response)
}
