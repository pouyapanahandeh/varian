module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  configureWebpack: {
    module: {
      rules: [{
        test: require.resolve('jquery'),
        use: [{
          loader: 'expose-loader',
          options: 'jQuery'
        }, {
          loader: 'expose-loader',
          options: '$'
        }]
      }]
    }
  }
};
