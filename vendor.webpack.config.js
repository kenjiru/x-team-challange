var webpack = require("webpack");
var path = require("path");

var BUILD_FOLDER = "static";

module.exports = {
    entry: {
        vendor: ["react", "react-dom", "mobx-react", "mobx-utils", "lodash", "numeral", "classnames",
            "superagent", "superagent-promise", "superagent-prefix",
            "moment", "moment-range", "moment-duration-format"]
    },
    output: {
        filename: "vendor.dll.js",
        path: path.resolve(__dirname, BUILD_FOLDER),
        library: "vendor_lib"
    },
    plugins: [
        new webpack.DllPlugin({
            name: "vendor_lib",
            path: BUILD_FOLDER + "/vendor-manifest.json"
        })
    ]
};