import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./feature/loginContext"
import userContext from "./feature/userContext";
import tweetReducer from "./feature/tweet";
import ProfileReducer from "./feature/ProfileReloading"
 const store = configureStore({
    reducer:{
        auth:AuthReducer,
        user:userContext,
        tweet:tweetReducer,
        profile:ProfileReducer
    }
})
export default store;