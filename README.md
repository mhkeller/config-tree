# Strangelove config

A node module to set configs to get your [strangelove-cli](https://github.com/mhkeller/strangelove-cli) started.

## Usage

````
boom config
````

## Options

````
{
	"github": {
		"type": "Either `org` or `individual`",
		"account_name": "The GitHub org or individual account name",
		"access_token": "Your GitHub access token",
		"private_repos": false
	},
	"server": {
		"url": "The url and port of your server"
	},
	"archive": {
		"enabled": false,
		"type": "Either `bitbucket` or `github`",
		"account_name": "Your GitHub or Bitbucket account name",
		"access_token": "Account access token"
	}
}
````

See [strangelove-cli](https://github.com/mhkeller/strangelove-cli) for the full documentation.