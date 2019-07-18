module.exports = {
  chainWebpack: config => {
    config.module
      .rule("svg")
      .use("file-loader")
      .options({
        name: "[name].[ext]",
        outputPath: ""
      });
  },
  configureWebpack: {
    optimization: {
      splitChunks: false
    }
  },
  css: {
    extract: false
  }
};
