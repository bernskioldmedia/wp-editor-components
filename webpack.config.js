const path = require("path")

module.exports = {
    target: 'web',
    entry: path.resolve(__dirname, "src/index.js"),
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "index.js",
        library: ['bernskioldmedia', 'wp-editor-components'],
        libraryTarget: "umd",
        globalObject: 'this',
        umdNamedDefine: true,
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