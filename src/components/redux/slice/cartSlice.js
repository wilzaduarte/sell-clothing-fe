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
             .filter(product => product.quantity> 0) : [...state.products, {...action.payload, quantity: 1}],
            }
        },
        removeProductFromCart:(state,action)=>{
            return {
                ...state,
                products:state.products.filter((product) => product.id !== action.payload),
            } 
        },
        increseProductQuantity:(state,action)=>{
            return{
                ...state,
                products: state.products.map(product => product.id === action.payload 
                    ? {...product, quantity: product.quantity +1}
                    :product
                ),
            };
        },
        descreaseProducQuantity:(state,action)=>{
            return{
                ...state,
                products: state.products.map((product) =>
            product.id === action.payload && product.quantity > 0
                ? { ...product, quantity: product.quantity - 1 }
                : product
                ),
            };
        }
    }
})

export const addProductToCart = (item) => {
    return async (dispatch) => {
        dispatch(cartReducer.actions.addProductToCart(item))
    }
}

export const removeProductFromCart = (itemId) => {
    return async (dispatch) => {
        dispatch(cartReducer.actions.removeProductFromCart(itemId))
    }
}

export const increseProductQuantity = (itemId) => {
    return async (dispatch) => {
        dispatch(cartReducer.actions.increseProductQuantity(itemId))
    }
}

export const descreaseProducQuantity = (itemId) => {
    return async (dispatch) => {
        dispatch(cartReducer.actions.descreaseProducQuantity(itemId))
    }
}

export default cartReducer.reducer