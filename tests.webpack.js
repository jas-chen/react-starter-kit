[
  // Add test context.
  require.context('./test', true, /.spec\.js$/),

  // Add source context.
  // This will list every source on the coverage report
  // even they don't have corresponding test specs,
  // to remind you to add test specs for them.
  require.context('./src/actions/', true, /\.js$/),
  require.context('./src/components/', true, /\.js$/),
  require.context('./src/constants/', true, /\.js$/),
  require.context('./src/reducers/', true, /\.js$/),
  require.context('./src/store/', true, /\.js$/)
].forEach(context => context.keys().forEach(context));

//# sourceMappingURL=tests.webpack.js.map
