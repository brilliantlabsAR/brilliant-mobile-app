import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import * as Const from "../../models/api";
import { apiStatus, ILoginProps, ILoginState } from "../apiDataTypes";

const initialState: ILoginState = {
  status: apiStatus.idle,
  loginData: {},
};

export const FetchLoginData = createAsyncThunk(
  "loginSlice/fetchLoginData",
  async (options: ILoginProps) => {
    try {
      const response = await axios.post(
        Const.API_BASE_URL + Const.API_LOGIN,
        options
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

const LoginSlice = createSlice({
  name: "loginSlice",
  initialState,
  reducers: {
    resetLogin: (state) => {
      state.status = apiStatus.idle;
      state.loginData = {};
    },
  },
  extraReducers(builder) {
    builder
      .addCase(FetchLoginData.pending, (state) => {
        state.status = apiStatus.loading;
      })
      .addCase(FetchLoginData.fulfilled, (state, action) => {
        state.status = apiStatus.success;
        console.log("ydg8ysdgvuyyu", action.payload.data);

        state.loginData = action.payload.data;
      })
      .addCase(FetchLoginData.rejected, (state, action) => {
        state.status = apiStatus.failed;
        console.log(action);
      });
  },
});

export const { resetLogin } = LoginSlice.actions;
export default LoginSlice.reducer;
