import { useParams } from "react-router-dom";
import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
    tweets:[],
    status:"idle",
    error:null,
}
export const fetchTweets = createAsyncThunk("tweets/fetchTweets",async(userId)=>{
    const response = await axios.get(`http://localhost:5000/api/user/${userId}/tweet`);
    return response;
})
const tweetDetailsPage = createSlice({
  name:"tweetDetails",
  initialState,
  reducers:{
    
  },
  extraReducers:(builder)=>{
    builder.addCase(fetchTweets.pending,(state)=>{
        state.status = "loading"
    })
    .addCase(fetchTweets.fulfilled,(state,action)=>{
        state.status = 'succeeded';
        state.tweets = action.payload;
    })
    .addCase(fetchTweets.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
})
export default tweetDetailsPage.reducer;