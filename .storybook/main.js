const custom = require('../webpack.config');

module.exports = {
  stories: ['../src/components/**/*.stories.[tj]s'],
  webpackFinal: config => {
    return {
      ...config,
      resolve: {alias: {...config.resolve.alias, ...custom.resolve.alias}},
      module: {...config.module, rules: custom.module.rules},
    };
  },
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5',
  },
};
