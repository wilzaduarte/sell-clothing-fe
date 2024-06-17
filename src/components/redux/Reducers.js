import { combineReducers } from 'redux';
import cartReducer from '../card/reducer';

const rootReducer = combineReducers({
  cart: cartReducer,

});

export default rootReducer;