module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Ignore source map warnings for specific packages
      webpackConfig.ignoreWarnings = [
        {
          module: /node_modules\/@mediapipe\/tasks-vision/,
          message: /Failed to parse source map/,
        },
      ];
      return webpackConfig;
    },
  },
};
