var init = require('../src/init-package-json.js')

function configFromDir(dir, name_prefix){
	init(dir, name_prefix, 'file that does not exist', function (err, data) {
	  if (!err) console.log('written successfully')
	});
}

module.exports = {};
module.exports.sprout = configFromDir;
