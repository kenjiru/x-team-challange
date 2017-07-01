var path = require("path");
var nodeExternals = require("webpack-node-externals");

module.exports = {
    target: "node",
    externals: [nodeExternals()],
    devtool: "inline-cheap-module-source-map",
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        modules: [
            path.resolve("./src")
        ]
    },
    module: {
        loaders: [
            {
                test: /\.(tsx|ts)$/,
                loader: "ts-loader",
                exclude: /node_modules/
            }, {
                test: /\.less$/,
                loaders: ["style-loader", "css-loader", "less-loader"],
                exclude: /node_modules/
            }, {
                test: /\.(png|jpg|gif|eot|ttf|woff|woff2|svg)$/,
                exclude: /public/,
                loader: "url-loader",
                query: {
                    limit: 500,
                    name: "[path][name].[ext]",
                    hash: "[hash]"
                }
            }
        ]
    }
};
