import { createSlice } from "@reduxjs/toolkit";

const initialState = {
     tweets:[]
}
const tweetSlice = createSlice({
    name:"tweets",
    initialState,
    reducers:{
    getTweetDetail:(state,action)=>{
       state.tweets = action.payload
    },
    removeTweetDetails:(state)=>{
    }
  }
})
export const {getTweetDetail,removeTweetDetails} = tweetSlice.actions;
export default tweetSlice.reducer;