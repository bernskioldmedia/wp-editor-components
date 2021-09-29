const path = require("path")

module.exports = {
    mode: 'production',
    entry: path.resolve(__dirname, "src/index.js"),
    output: {
        path: path.resolve(__dirname, "build"),
        filename: 'index.js',
        library: ['bm', 'wpEditorComponents']
    },
    externals: {
        'lodash': 'lodash',
		'@wordpress/api-fetch': ['wp', 'apiFetch'],
		'@wordpress/block-editor': ['wp', 'blockEditor'],
		'@wordpress/blocks': ['wp', 'blocks'],
		'@wordpress/components': ['wp', 'components'],
		'@wordpress/compose': ['wp', 'compose'],
        '@wordpress/core-data': ['wp', 'coreData'],
		'@wordpress/data': ['wp', 'data'],
		'@wordpress/element': ['wp','element'],
		'@wordpress/hooks': ['wp','hooks'],
		'@wordpress/i18n': ['wp','i18n'],
	},
    externalsType: 'window',
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
