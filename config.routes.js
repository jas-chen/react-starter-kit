module.exports = {
  routes: [
    {
      path: '/',
      chunks: ['main'],
      title: 'Home - React Starter Kit'
    }

    // Add more routes if you want to switch to react-router browserHistory:

    // ,{
    //   path: '/about',
    //   chunks: ['main'],
    //   title: 'About - React Starter Kit'
    // },
    // {
    //   path: '/repos',
    //   chunks: ['main'],
    //   title: 'Repos - React Starter Kit'
    // }
  ]
};
