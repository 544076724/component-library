const path = require('path');
module.exports = {
  "stories": [
    "../stories/**/*.stories.mdx",
    "../packages/**/*.stories.mdx",
    "../packages/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', {
        loader:'sass-loader',  //这种是指定dart-sass  替代node-sass  不然一些数学函数 用不了  math函数只有dart-sass可以用  
        options:{
          implementation:require("sass")
        }
      }],
      include: path.resolve(__dirname, '../'),
    });

    // Return the altered config
    return config;
  },
}