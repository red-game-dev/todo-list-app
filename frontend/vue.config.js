const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: process.env.NODE_ENV === 'production',
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@use "@/styles/_variables" as *;`,
      },
    },
  },
  chainWebpack: config => {
    const sassRule = config.module.rule('scss');

    const sassModulesRule = sassRule.oneOf('modules').test(/\.module\.(scss|sass)$/);

    config.plugin('html').tap(args => {
      args[0].title = 'My Todo List - Task Management App';
      args[0].meta = {
        description: 'A simple and efficient todo list application to manage your daily tasks',
        keywords: 'todo list, task management, productivity, tasks, todo',
        robots: 'index,follow',
      };
      return args;
    });
    sassModulesRule
      .use('vue-style-loader')
      .loader('vue-style-loader')
      .end()
      .use('css-loader')
      .loader('css-loader')
      .options({
        modules: {
          localIdentName: '[name]_[local]_[hash:base64:5]',
        },
        sourceMap: true,
      })
      .end()
      .use('sass-loader')
      .loader('sass-loader')
      .options({
        sourceMap: true,
      });
  },
  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: 'all',
        minSize: 20000,
        maxSize: 250000,
      },
    },
  },
});
