import { combineReducers, configureStore } from '@reduxjs/toolkit';
import cartReducer from '../redux/slice/cartSlice';
import purchaseReducer from './slice/purchaseSlice';
import productsSlice from './slice/productsSlice'
import userSlice from './slice/userSlice';



const rootReducer = combineReducers({
    cart: cartReducer,
     purchases:purchaseReducer,
     products: productsSlice,
     user:userSlice
});
const store = configureStore({
    reducer:
        rootReducer,  
     
    
});

export default store;
