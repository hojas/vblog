const path = require("path");
const webpack = require("webpack");

module.exports = {
  target: "node",
  node: {
    __dirname: false
  },
  entry: {
    app: "./src/server/app.js"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          fix: true
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            babelrc: false,
            presets: [
              [
                "env",
                {
                  targets: {
                    node: "current"
                  }
                }
              ],
              "stage-3"
            ]
          }
        }
      }
    ]
  }
};
