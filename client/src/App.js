import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './store';

import Endpoint from './Endpoint';

export default function App() {
  return (
    <Provider store={store}>
      <Endpoint/>
    </Provider>
  );
}
