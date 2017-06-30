var webpack = require("webpack");
var path = require("path");

module.exports = {
    entry: {
        vendor: ["react", "react-dom"]
    },
    output: {
        filename: "vendor.dll.js",
        path: path.resolve(__dirname, "dist"),
        library: "vendor_lib"
    },
    plugins: [
        new webpack.DllPlugin({
            name: "vendor_lib",
            path: "dist/vendor-manifest.json"
        })
    ]
};