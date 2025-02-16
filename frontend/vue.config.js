const { defineConfig } = require('@vue/cli-service');
const CompressionPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

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
    if (process.env.NODE_ENV === 'production') {
      config.plugin('compression').use(CompressionPlugin, [
        {
          algorithm: 'gzip',
          test: /\.(js|css|html|svg)$/,
          threshold: 10240,
          minRatio: 0.8,
        },
      ]);
    }

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

    config.optimization.moduleIds = 'deterministic';
  },
  configureWebpack: {
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true,
              drop_debugger: true,
              pure_funcs: ['console.log', 'console.info'],
            },
            format: {
              comments: false,
            },
          },
          extractComments: false,
        }),
      ],
      splitChunks: {
        chunks: 'all',
        minSize: 20000,
        maxSize: 250000,
        cacheGroups: {
          vendor: {
            name: 'vendors',
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            chunks: 'initial',
          },
          common: {
            name: 'common',
            minChunks: 2,
            priority: -20,
            chunks: 'initial',
            reuseExistingChunk: true,
          },
        },
      },
    },
    performance: {
      hints: 'warning',
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    },
  },
});
