import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import postReducer from './posts';
import sessionReducer from './session'
import shopReducer from './shops'
import reviewReducer from './reviews'
import cartReducer from './cart';
const rootReducer = combineReducers({
  session:sessionReducer,
  shops:shopReducer,
  posts:postReducer,
  reviews:reviewReducer,
  cart:cartReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
