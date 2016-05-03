module.exports = [
  {
    test: /\.(jpe?g|png|gif|svg)$/,
    loader: 'file?name=img/[name].[ext]'
  },
  {
    test: /\.(eot|woff|ttf)$/,
    loader: 'file?name=font/[name].[ext]'
  },
  {
    test: /\.json$/,
    loader: 'json'
  }
];
