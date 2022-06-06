const path = require('path');

const srcDirPath = path.resolve(__dirname, './src');
module.exports = {
	webpack: {
		alias: {
			'@ui': path.join(srcDirPath, 'ui'),
			'@features': path.join(srcDirPath, 'features'),
			'@pages': path.join(srcDirPath, 'pages'),
			'@services': path.join(srcDirPath, 'services'),
			'@domain': path.join(srcDirPath, 'domain'),
			'@controllers': path.join(srcDirPath, 'controllers'),
			'@codecs': path.join(srcDirPath, 'codecs'),
			'@utils': path.join(srcDirPath, 'utils'),
			'@routes': path.join(srcDirPath, 'routes'),
		},
	},
};
