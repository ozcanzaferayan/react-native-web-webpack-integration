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
