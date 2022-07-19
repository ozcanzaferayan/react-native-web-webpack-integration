# Steps

1. Create project and add dependencies

```bash
# Creating project
npx react-native init ReactNativeWebIntegration
# Dependencies
yarn add react-native-web react-dom
# Dev dependencies
yarn add -D @babel/preset-env @babel/preset-react babel-loader html-webpack-plugin url-loader webpack webpack-cli webpack-dev-server
```

2. Add webpack.config.js

```js
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: path.resolve(__dirname, './public/index.html'),
  filename: 'index.html',
  inject: 'body',
});

module.exports = {
  entry: path.join(__dirname, 'index.web.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/build'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules\/(?!()\/).*/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'],
          },
        },
      },
    ],
  },
  plugins: [HTMLWebpackPluginConfig],
  resolve: {
    alias: {
      'react-native$': 'react-native-web',
    },
  },
};
```

3. Add public/index.html

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>RN Web</title>
    <style>
      #app-root {
        display: flex;
        flex: 1 1 100%;
        height: 100vh;
      }
    </style>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

4. Add index.web.js

```js
import {AppRegistry} from 'react-native';
import App from './App';
if (module.hot) {
  module.hot.accept();
}
AppRegistry.registerComponent('App', () => App);
AppRegistry.runApplication('App', {
  initialProps: {},
  rootTag: document.getElementById('root'),
});
```

5. Change App.js correctly

```js
import React from 'react';
import {SafeAreaView, StatusBar, Text, View} from 'react-native';
const App = () => {
  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />
      <View style={{alignItems: 'center'}}>
        <Text style={{fontSize: 64}}>React Native Web App Example</Text>
      </View>
    </SafeAreaView>
  );
};
export default App;
```

6. Add web script to package.json:

```json
{
  "web": "webpack-dev-server --config ./webpack.config.js --mode development"
}
```

# For Storybook

1. Add storybook to project

```bash
npx sb init --type react -f
```

2. Add components into src/components
3. Inject webpack into .storybook/main.js

```js
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
```

4. Add alias to webpack.config

```js
module.exports = {
  resolve: {
    alias: {
      'react-native$': 'react-native-web',
      '@storybook/react-native': '@storybook/react', //<-here
    },
  },
};
```

5. Run storybook

```bash
yarn storybook
```
