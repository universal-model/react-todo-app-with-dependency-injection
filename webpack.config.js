const path = require("path");

module.exports = (env = {}) => ({
  entry: path.resolve(__dirname, "./src/main.tsx"),
  output: {
    path: path.resolve(__dirname, "./dist"),
    publicPath: "/dist/",
    filename: "build.js"
  },
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', 'jsx'],
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "babel-loader"
      }
    ]
  },
  devServer: {
    inline: true,
    hot: true,
    stats: "minimal",
    contentBase: __dirname
  }
});
