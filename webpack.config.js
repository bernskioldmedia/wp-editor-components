const path = require("path")

module.exports = {
    entry: path.resolve(__dirname, "src/index.js"),
    output: {
        path: path.resolve(__dirname, "build"),
        filename: 'main.js'
    },
    externals: {
		lodash: 'lodash',
		jquery: 'jquery',
		react: 'react',
		'react-dom': 'react-dom',
		'@wordpress/api-fetch': [ 'wp', 'apiFetch' ],
		'@wordpress/block-editor': [ 'wp', 'blockEditor' ],
		'@wordpress/blocks': [ 'wp', 'blocks' ],
		'@wordpress/components': [ 'wp', 'components' ],
		'@wordpress/compose': [ 'wp', 'compose' ],
		'@wordpress/data': [ 'wp', 'data' ],
		'@wordpress/element': [ 'wp', 'element' ],
		'@wordpress/hooks': [ 'wp', 'hooks' ],
		'@wordpress/i18n': [ 'wp', 'i18n' ],
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