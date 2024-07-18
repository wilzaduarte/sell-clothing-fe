import axios from "axios";
import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    products : [],
    status:'idle',
    error: null,
};
const productsSlice = createSlice({
    name:'products',
    initialState,
    reducers:{
        getAllProducts:(state,action)=>{
            state.products = action.payload;

        },
        addNewProduct:(state,action)=>{
            state.products = [...state.products,action.payload];
        },
    },
});
export const fetClothingProducts = (accessToken,page, pageSize, searchTerm='')=>{
    return async (dispatch)=>{
        try{
            const response = await axios.get(`http://localhost:8080/clothing`,{
                params:{page, perPage:pageSize, name:searchTerm},headers:{Authorization:`Bearer ${accessToken}`}
            });
          const data =  response.data;
          dispatch(productsSlice.actions.getAllProducts(data))
        }catch(error){
          console.error('Error fetching clothing products: ', error);
        }
    }
  };
  export const addNewProduct = (newProduct,accessToken) => {

    return async (dispatch)=> {
        try {
          const response = await axios.post('http://localhost:8080/clothing', newProduct, {
            headers:{Authorization:`Bearer ${accessToken}`
            }
          });
          const product = response.data.cloth
          dispatch(productsSlice.actions.addNewProduct(product))
         return true
        } catch (error) {
          if(error.response){
            const{message}= error.response.data
            console.log(message)
            alert(message);
          }
          return false
        }
    }
  };

  export default productsSlice.reducer