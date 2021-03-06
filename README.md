Config Tree
===

A reworking of [init-package-json](https://github.com/npm/init-package-json) to make reusable prompt-based CLIs for making config.json files.

![](https://raw.githubusercontent.com/mhkeller/config-tree/master/assets/config-tree-example.gif)

## Why?
This package generalizes npm's `npm init` interface so you can require it as its own module and set your project-specific prompts in your project -- where they belong -- in a file called `default-input.js`,

## Opinions

This package assumes that in your project root folder you have `config.sample.json` and `default-input.js` files that contain any default options or examples of what users could input.

It bakes out a `config.json` file in `~/.conf/`, so your project should look to load that file by default.

## Setup

A `config.sample.json` example with example or default values:

````json
{
	"name": "my-project",
	"description": "A default value",
	"awesome": false
}
````

A `default-input.js` example:

````js
exports.name        = prompt('Name', package.name)
exports.description = prompt('Description', package.description)
exports.awesome     = prompt('Is it awesome?', package.awesome.toString(), function(response){
	return JSON.parse(response)
})

````

*Note: Cast booleans to string so they show up in the interface as text and parse them with JSON so they don't end up as strings. See [Promzard](https://github.com/isaacs/promzard) for more info about `prompt`.*

## Calling it from your project

Once you have those two files set up, point your command-line script to a javascript file that looks like this. 

In the gif above, this is what `main.js` looks like.

````js
var config_tree = require('config-tree');

config_tree.sprout(__dirname, 'name-prefix');
````

`.sprout` takes two arguments:

1. The directory that contains your `default-input.js` and `config.sample.json` file. 
2. A name prefix so that multple config files in `~/.conf/` don't conflict.


That's it!

<p align="center">
 <img src="https://raw.githubusercontent.com/mhkeller/config-tree/master/assets/config-tree.png"/>
</p>

###### Logo by [Clarisa Diaz](https://twitter.com/Clarii_D)
###### Name by [Brian Abelson](https://github.com/abelsonlive)
