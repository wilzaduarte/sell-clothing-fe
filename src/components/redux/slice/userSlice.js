import axios from "axios";
import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    myInfo : {},
};

const userSlice= createSlice({
    name:'products',
    initialState,
    reducers:{
        getMyinfo:(state,action)=>{
            state.myInfo = action.payload;

        }
    }
})

export default userSlice.reducer;

export const fetchMyInfo = (token)=>{
    return async (dispatch)=>{
        try{
            const response = await axios.get(`http://localhost:8080/auth/me`,{
               headers: {Authorization : `Bearer ${token}`}
            });
          const data =  response.data;
          dispatch(userSlice.actions.getMyinfo(data))
        }catch(error){
          console.error('Error fetching myInfo: ', error);
        }
    }
  };



