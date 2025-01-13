import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
  isLoading: true,
  bank: null
}


export const depositMoney = createAsyncThunk(
  "/bank/deposit",
  async (info) => {
    console.log(info, "deposit")
    const response = await axios.post(
      "http://localhost:5000/api/bank/activity/deposit", info
    )
    return response.data;
  }
)
export const fetchBalance = createAsyncThunk(
  "/bank/balance",
  async () => {
    //console.log(info, "deposit")
    const response = await axios.get(
      "http://localhost:5000/api/bank/activity/balance", {withCredentials:true}
    )
    return response.data;
  }
)
export const withdrawBalance = createAsyncThunk(
  "/bank/withdraw",
  async (info) => {
    //console.log(info, "deposit")
    const response = await axios.post(
      "http://localhost:5000/api/bank/activity/withdraw", info, {withCredentials:true}
    )
    return response.data;
  }
)
const bankSlice = createSlice({
  name: 'bank',
  initialState,
  reducers: {
  
  },
  extraReducers: (builder) => {
    builder
    .addCase(depositMoney.pending, (state) => {
      state.isLoading = true
    })
    .addCase(depositMoney.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log(action.payload.balance, "Payload");
      state.bank = !action.payload.success? null: action.payload.balance;
    })
    .addCase(depositMoney.rejected, (state) => {
      state.isLoading = false;
      state.bank = null;
    })
    .addCase(withdrawBalance.pending, (state) => {
      state.isLoading = true
    })
    .addCase(withdrawBalance.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log(action.payload.balance, "Payload");
      state.bank = !action.payload.success? null: action.payload.balance;
    })
    .addCase(withdrawBalance.rejected, (state) => {
      state.isLoading = false;
      state.bank = null;
    })
    .addCase(fetchBalance.pending, (state) => {
      state.isLoading = true
    })
    .addCase(fetchBalance.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log(action.payload.balance, "Payload");
      state.bank = !action.payload.success? null: action.payload.balance;
    })
    .addCase(fetchBalance.rejected, (state) => {
      state.isLoading = false;
      state.bank = null;
    })
  }
})


export default bankSlice.reducer;