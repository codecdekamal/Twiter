import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    token:localStorage.getItem("accesstoken")|| "",
    loggIn:localStorage.getItem("accesstoken")?true:false,
    userId:localStorage.getItem("id") || ""
}
const AuthSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        loggIn:(state,action,userId)=>{
            const {token,loggIn} = action.payload
            state.token = token
            state.loggIn = loggIn
            state.userId = userId
        },
        logOut:(state) => {
            state.token = ""
            state.loggIn = ""
        }
    }
})
export const {loggIn,logOut,userId} = AuthSlice.actions
export default AuthSlice.reducer;