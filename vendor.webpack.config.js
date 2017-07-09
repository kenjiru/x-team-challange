var webpack = require("webpack");
var path = require("path");

module.exports = {
    entry: {
        vendor: ["react", "react-dom", "mobx-react", "mobx-utils", "lodash", "numeral", "classnames",
            "superagent", "superagent-promise", "superagent-prefix",
            "moment", "moment-range", "moment-duration-format"]
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