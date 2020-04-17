import { createStore } from 'redux';
import endpointsReducer from './reducer';

const store = createStore(endpointsReducer);

export default store;