import { createSlice } from "@reduxjs/toolkit";

const initialState = {
     name:  "",
     username: "",
     userID: "",
     followers:[],
     following:[],
     email:"",
     createdAt:"",
     updatedAt:"",
     img:""
}
const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
    getUserDetail:(state,action)=>{
   let {_id,name,profile_picture,username} = action.payload
         state.id = _id;    
         state.img = profile_picture;
         state.name = name
         state.username = username

    },
    removeUserDetails:(state)=>{
    }
  }
})
export const {getUserDetail,removeUserDetails} = userSlice.actions;
export default userSlice.reducer;