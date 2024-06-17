import axios from "axios";
import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"

const initialState = {
    products : [],
    status:'idle',
    error: null,
};

export const addNewProduct = createAsyncThunk(
    'products/addNewProduct',
    async (newProduct, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:8080/clothing', newProduct);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const productsSlice = createSlice({
    name:'products',
    initialState,
    reducers:{
        getAllProducts:(state,action)=>{
            state.products = action.payload;

        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addNewProduct.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addNewProduct.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products.push(action.payload);
            })
            .addCase(addNewProduct.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }

});


export const fetClothingProducts = (page, pageSize, searchTerm='')=>{
    return async (dispatch)=>{
        try{
            const response = await axios.get(`http://localhost:8080/clothing`,{
                params:{page, perPage:pageSize, name:searchTerm}
            });
          const data =  response.data;
          dispatch(productsSlice.actions.getAllProducts(data))
        }catch(error){
          console.error('Error fetching clothing products: ', error);
        }
    }
  };


  export default productsSlice.reducer