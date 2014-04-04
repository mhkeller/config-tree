var init = require('../src/init-package-json.js')
var path = require('path')

module.exports = {
	config: function(dir){
		init(dir, 'file that does not exist', function (err, data) {
		  if (!err) console.log('written successfully')
		});
	}
} 