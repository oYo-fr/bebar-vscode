const webpack = require('webpack');

module.exports = {
  resolve: {
    alias: {
        process: "process/browser"
    },
    extensions: [ '.ts', '.js' ],
    fallback: {
      "path": require.resolve("path-browserify"),
      "node-eval": false,
      "vm": false,
      "fs": false,
      "module": false,
      "assert": false,
      "util": require.resolve("util.promisify/"),
      "glob": false,
      "csv-parser": false,
      "node-eval": false,
      "child_process": false,
      "stream": require.resolve("stream-browserify"),
      "buffer": require.resolve("buffer")
    }
  },
  plugins: [
    // Work around for Buffer is undefined:
    // https://github.com/webpack/changelog-v5/issues/10
    new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
    }),
    new webpack.ProvidePlugin({
        process: 'process/browser',
    }),
],
};
