# Config tree

A reworking of [init-package-json](https://github.com/npm/init-package-json) to make reusable prompt-based CLIs for making config.json files.

## Why?

This package generalizes npm's `npm init` interface so you can require it as its own module and set your project-specific prompts in your project -- where they belong -- in a file called `default-input.js`,

## Opinions

This package assumes that in your project root folder you have a `config.sample.json` file that contains any default options or examples of what users could input.

It bakes out a `config.json` file, so your project should look to load that file by default.

## Usage

A `config.sample.json` example:

````
{
	"name": "my-project",
	"description": "",
	"awesome": true
}
````

A `default-input.js` example:

````
exports.github  = {}
exports.server  = {}
exports.archive = {}

exports.github.type           = prompt('GitHub account type', package.github.type)
exports.github.account        = prompt('Account name', package.github.account)
exports.github.access_token   = prompt('Github access token', package.github.access_token)
exports.github.private_repos  = prompt('Create private repos by default?', String(package.github.private_repos), function(repos){
  if (repos === "false") repos = false
  if (repos === "true")  repos = true
  return repos
});

exports.server.url = prompt('Snowy Owl server url:port', package.server.url)

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

````