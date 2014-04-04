var init = require('../src/init-package-json.js')

function configFromDir(dir){
	init(dir, 'file that does not exist', function (err, data) {
	  if (!err) console.log('written successfully')
	});
}

module.exports = {};
module.exports.sprout = configFromDir;
