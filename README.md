# Config Tree

A reworking of [init-package-json](https://github.com/npm/init-package-json) to make reusable prompt-based CLIs for making config.json files.

## Why?

This package generalizes npm's `npm init` interface so you can require it as its own module and set your project-specific prompts in your project -- where they belong -- in a file called `default-input.js`,

## Opinions

This package assumes that in your project root folder you have `config.sample.json` and `default-input.js` files that contain any default options or examples of what users could input.

It bakes out a `config.json` file, so your project should look to load that file by default.

## Setup

A `config.sample.json` example with example or default values:

````
{
	"name": "my-project",
	"description": "A default value",
	"awesome": false
}
````

A `default-input.js` example:

````
exports.name        = prompt('Name', package.name)
exports.description = prompt('Description', package.description)
exports.awesome     = prompt('Is it awesome?', package.awesome.toString(), function(response){
	return JSON.parse(response)
})

````

*Note: Cast booleans to string so they show up in the interface as text and parse them with JSON so they don't end up as strings. See [Promzard](https://github.com/isaacs/promzard) for more info about `prompt`*

## Usage

Make a file somewhere in your package that is called whenever you run your command line statement to configure that looks like this. Pass the directory containing `config.sample.json` and `default-input.js` to the `config_tree.sprout()`. In this example, this file is in the same directory.

````
var config_tree = require('config-tree');

config_tree.sprout(__dirname);
````

That's it.

###### Package named by [Brian Abelson](https://github.com/abelsonlive)
