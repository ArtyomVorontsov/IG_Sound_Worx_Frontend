const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const {merge} = require("webpack-merge");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const common = require("./webpack.common");
const TerserPlugin = require("terser-webpack-plugin");


module.exports = merge(common, {
    mode: "production",
    output: {
        filename: "[name].[contenthash].js",
        path: __dirname + "/dist",
        publicPath: "/"
    },

    module: {
        rules: [
            
            {
                test: /\.scss$/i, 
                use: [
                    MiniCssExtractPlugin.loader,
                    //"style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            },

            {
                test: /\.css$/i, 
                use: [
                    MiniCssExtractPlugin.loader,
                    //"style-loader",
                    "css-loader",
                    // "sass-loader"
                ]
            },
        ]
    },

    optimization:{
        minimize: true,
        minimizer: [
            new CssMinimizerWebpackPlugin(),
            new TerserPlugin()
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/template.html",
            filename: "index.[contenthash].html"
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css"
        })
    ]
})