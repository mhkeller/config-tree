var init = require('../src/init-package-json.js')
var chalk = require('chalk')

function configFromDir(dir, name_prefix){
	init(dir, name_prefix, 'file that does not exist', function (err, data) {
	  if (!err) {
      console.log(chalk.green('Config written successfully!'))
    } else {
      throw err
    }
	});
}

module.exports = {};
module.exports.sprout = configFromDir;
