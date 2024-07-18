import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    products : [],
    productTotalPrice: 0,
};

const cartReducer = createSlice({
    name:'cart',
    initialState,
    reducers:{
        addProductToCart:(state,action)=>{
            const productsIsAreadyInCart = state.products.some(
                (product) => product.id === action.payload.id
            ); 
            return {
                ...state,
                products: productsIsAreadyInCart ? state.products.map((product)=>
                product.id === action.payload.id
                ?{...product, quantity: product.quantity +1}
                : product
             )
             .filter(product => product.quantity> 0) 
             : [...state.products, {...action.payload, quantity: 1}],
            }
        },
        removeProductFormCart:(state,action)=>{
            return {
                ...state,
                products:state.products.filter((product) => 
                    product.id !== action.payload),
            } 
        },
        increaseProductQuantity:(state,action)=>{
            return{
                ...state,
                products: state.products.map(product => 
                    product.id === action.payload 
                    ? {...product, quantity: product.quantity +1}
                    :product
                ),
            };
        },
        decreaseProducQuantity:(state,action)=>{
            return{
                ...state,
                products: state.products.map((product) =>
                product.id === action.payload && product.quantity > 0
                ? { ...product, quantity: product.quantity - 1 }
                : product
                ),
            };
        },
        resetCart(state,action){
          state.products = [];
        },
        
        decreaseProducStock: (state, action) => {
            const { id } = action.payload;
            const product = state.products.find((product) => product.id === id);
            if (product && product.stock > 0) {
              product.stock--;
            }
          },
    },

});

export const addProductToCart = (item) => {
    return async (dispatch) => {
        dispatch(cartReducer.actions.addProductToCart(item))
    };
};

export const removeProductFormCart = (itemId) => {
    return async (dispatch) => {
        dispatch(cartReducer.actions.removeProductFormCart(itemId))
    };
};

export const increaseProductQuantity = (itemId) => {
    return async (dispatch) => {
        dispatch(cartReducer.actions.increaseProductQuantity(itemId))
    };
};

export const decreaseProducQuantity = (itemId) => {
    return async (dispatch) => {
        
            dispatch(cartReducer.actions.decreaseProducQuantity(itemId))
               
    };
};

export const decreaseProducStock = (itemId) => {
    return async (dispatch) => {
        dispatch(cartReducer.actions.decreaseProducStock(itemId));
    };
};

export const resetCart = (payment) => { 
    return async (dispatch)=>{
        dispatch(cartReducer.actions.resetCart(payment))
    };
};

export default cartReducer.reducer