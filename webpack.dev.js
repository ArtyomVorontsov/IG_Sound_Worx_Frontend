const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const path = require("path");
const {merge} = require("webpack-merge");
const common = require("./webpack.common");

module.exports = merge(common, {
    mode: "development",

    devServer: {
        open: false,
        port: 8080,
        contentBase: "./src",
        historyApiFallback: true,
        publicPath: "/"
    },

    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist"),
        publicPath: "/"
    },

    module: {
        rules: [
            {
                test: /\.s[ca]ss$/i, 
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            },

            {
                test: /\.css$/i, 
                use: [
                    "style-loader",
                    "css-loader",
                    //"sass-loader"
                ]
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/template.html",
            filename: "index.html"
        }),
    ]
})