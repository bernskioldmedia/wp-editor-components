const path = require("path")

module.exports = {
    mode: 'production',
    entry: path.resolve(__dirname, "src/index.js"),
    output: {
        path: path.resolve(__dirname, "build"),
        library: 'wp-editor-components',
        libraryTarget: "commonjs-module",
    },
    optimization: {
        concatenateModules: true,
        runtimeChunk: true
    },
    externals: {
		lodash: 'lodash',
		jquery: 'jQuery',
		react: 'React',
		'react-dom': 'ReactDOM',
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