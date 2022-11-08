import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import * as Const from "../../models/api";
import { apiStatus, ILoginProps, IStateProps } from "../apiDataTypes";

const initialState: IStateProps = {
  status: apiStatus.idle,
  userData: {},
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
      state.userData = {};
    },
  },
  extraReducers(builder) {
    builder
      .addCase(FetchLoginData.pending, (state) => {
        state.status = apiStatus.loading;
      })
      .addCase(FetchLoginData.fulfilled, (state, action) => {
        if (action.payload.error === false) {
          state.status = apiStatus.success;
          // console.log("ydg8ysdgvuyyu", action.payload.data);
          state.userData = action.payload.data;
        } else {
          state.status = apiStatus.failed;
          state.userData = action.payload.message;
          console.log(action.payload.message);
        }
      })
      .addCase(FetchLoginData.rejected, (state, action) => {
        state.status = apiStatus.failed;
        console.log(action.error);
      });
  },
});

export const { resetLogin } = LoginSlice.actions;
export default LoginSlice.reducer;