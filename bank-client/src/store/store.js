import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth-slice/index.js'
import bankReducer from './bank-slice/index.js'


const store = configureStore({
  reducer: {
    auth: authReducer,
    bank: bankReducer
  }
})

export default store;