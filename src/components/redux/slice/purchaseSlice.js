import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
const initialState={
    purchases:[],
    status:'idle',
    error: null,
};

const purchaseSlice= createSlice({
    name:'purchase',
    initialState,
    reducers:{
        addPurchaseSuccess(state, action){
            state.purchases.push(action.payload)
            state.status = 'success';
        },
        addPurchaseFailure(state, action){
            state.error = action.payload;
            state.status = 'falied';
        },
        setStatusIdle(state){
            state.status ='ide';
        }
    },
});
export const {addPurchaseSuccess, addPurchaseFailure, setStatusIdle}= purchaseSlice.actions;
export const addPurchase =(purchase)=> async(dispach)=>{
    try{
        const response = await axios.post('http:localhost:8080/payments', purchase);
        dispach(addPurchaseSuccess(response.data));
    }catch(error){
        dispach(addPurchaseFailure(error.toString()));
    }
};
export default purchaseSlice.reducer;