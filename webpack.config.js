var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

var src_dir = path.join(__dirname, "/src");
const nodeEnv = process.env.NODE_ENV || "development";

var config = {
    cache: true,
    devtool: "cheap-module-eval-source-map",
    context: __dirname,
    entry: {
        app: src_dir + "/App.tsx",
        vendor: ["react", "react-dom"]
    },
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "[name].js?[hash]"
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        modules: [
            path.resolve("./src"),
            "node_modules"
        ]
    },
    module: {
        loaders: [
            {
                enforce: "pre",
                test: /\.(tsx|ts)$/,
                loader: "tslint-loader",
                exclude: /(node_modules)/,
                options: {
                    typeCheck: true
                }
            }, {
                test: /\.(tsx|ts)$/,
                loader: "ts-loader",
                exclude: /node_modules/
            }, {
                test: /\.less$/,
                loaders: ["style-loader", "css-loader", "less-loader"],
                exclude: /node_modules/
            }, {
                test: /\.css/,
                loaders: ["style-loader", "css-loader"]
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
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "React TypeScript demo",
            template: require("html-webpack-template"),
            appMountId: "app"
        }),
        new ExtractTextPlugin("[name].css?[hash]"),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ["app", "vendor"],
            filename: "[name].[hash].js"
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            },
            sourceMap: false,
            mangle: false
        }),
        new webpack.SourceMapDevToolPlugin({
            test: /\.js/,
            exclude: [
                /vendor\.js/
            ],
            filename: "[file].map[hash]",
            columns: false
        }),
        new webpack.DefinePlugin({
            "process.env": {NODE_ENV: JSON.stringify(nodeEnv)}
        }),
        new BundleAnalyzerPlugin({
            openAnalyzer: false
        })
    ],
    devServer: {
        contentBase: "./src",
        hot: true,
        stats: "minimal"
    }
};

module.exports = config;