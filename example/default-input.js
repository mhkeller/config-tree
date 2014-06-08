exports.name        = prompt('Name', package.name)
exports.description = prompt('Description', package.description)
exports.awesome     = prompt('Is it awesome?', package.awesome.toString(), function(response){
	return JSON.parse(response)
})