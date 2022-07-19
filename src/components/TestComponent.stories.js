import React from 'react';
import {storiesOf} from '@storybook/react-native';

import TestComponent from './TestComponent';

storiesOf('Test Component', module).add('example', () => <TestComponent />);
