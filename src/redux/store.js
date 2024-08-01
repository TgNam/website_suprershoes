import { createStore, applyMiddleware} from 'redux';
import rootRenducer from './reducer/rootReducer';
import thunk from 'redux-thunk';

const store = createStore(rootRenducer, applyMiddleware(thunk));
export default store