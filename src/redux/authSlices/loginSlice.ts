import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import * as Const from "../../models/api";
import { ShowToast } from "../../utils/toastUtils";
import { apiStatus, ILoginProps, IStateProps } from "../apiDataTypes";
import { REACT_APP_API_BASE_URL } from "@env";

const initialState: IStateProps = {
  status: apiStatus.idle,
  userData: {},
};

export const FetchLoginData = createAsyncThunk(
  "loginSlice/fetchLoginData",
  async (options: ILoginProps) => {
    try {
      const response = await axios.post(
        REACT_APP_API_BASE_URL + Const.API_LOGIN,
        options
      );
      return response.data;
    } catch (error) {
      throw error;
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
          //  console.log("LOGINLOGIN", action.payload.data);
          state.userData = action.payload.data;
          // ShowToast(JSON.stringify(action.payload.data.otp));
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
