import { combineReducers } from 'redux';
import cartReducer from '../card/reducer';
import purchaseSlice from './slice/purchaseSlice';


const rootReducer = combineReducers({
  cart: cartReducer,
  purchases:purchaseSlice

});

export default rootReducer;