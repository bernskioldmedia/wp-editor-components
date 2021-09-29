const path = require("path")

module.exports = {
    mode: 'production',
    entry: path.resolve(__dirname, "src/index.js"),
    output: {
        path: path.resolve(__dirname, "build"),
        filename: 'index.js',
        libraryTarget: 'commonjs2'
    },
    externals: {
		lodash: 'lodash',
		jquery: 'jquery',
		react: 'react',
        'classnames': 'classnames',
		'react-dom': 'react-dom',
		'@wordpress/api-fetch': '@wordpress/api-fetch',
		'@wordpress/block-editor': '@wordpress/block-editor',
		'@wordpress/blocks': '@wordpress/blocks',
		'@wordpress/components': '@wordpress/components',
		'@wordpress/compose': '@wordpress/compose',
        '@wordpress/core-data': '@wordpress/core-data',
		'@wordpress/data': '@wordpress/data',
		'@wordpress/element': '@wordpress/element',
		'@wordpress/hooks': '@wordpress/hooks',
		'@wordpress/i18n': '@wordpress/i18n',
	},
    module: {
        rules: [
          {
            test: /\.(js)$/,
            exclude: /node_modules/,
            use: "babel-loader",
          },
        ],
    },
}
