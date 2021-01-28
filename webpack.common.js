
module.exports = {

    entry: {
        main: __dirname + "/src/index.js"
    },

    resolve: {
        extensions: [".ts", ".tsx", ".js", '.json']
    },

    module: {

        rules: [
            {
                test: /\.html$/i,
                use: ["html-loader"]
            },

            {
                test: /\.webp$/i,
                use: [{
                    loader: "file-loader",
                    options: {
                        name: "[name].[ext]",
                        outputPath: "imgs",
                        publicPath: "./imgs/"
                    }
                }]
            },
            {
                test: /\.(tsx|ts)$/i,
                use: ["babel-loader"]
            },
            {
                test: /\.(jsx|js)$/i,
                use: ["babel-loader"]
            }
        ]
    },
}