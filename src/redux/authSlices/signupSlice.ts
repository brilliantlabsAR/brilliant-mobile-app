import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import * as Const from "../../models/api";
import { ShowToast } from "../../utils/toastUtils";
import { apiStatus, ISignupProps, IStateProps } from "../apiDataTypes";

const initialState: IStateProps = {
  status: apiStatus.idle,
  userData: {},
};

export const FetchSignupData = createAsyncThunk(
  "signupSlice/fetchLoginData",
  async (options: ISignupProps) => {
    try {
      const response = await axios.post(
        Const.API_BASE_URL + Const.API_SIGNUP,
        options
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const SignupSlice = createSlice({
  name: "signupSlice",
  initialState,
  reducers: {
    resetData: (state) => {
      state.status = apiStatus.idle;
      state.userData = {};
    },
  },
  extraReducers(builder) {
    builder
      .addCase(FetchSignupData.pending, (state) => {
        state.status = apiStatus.loading;
      })
      .addCase(FetchSignupData.fulfilled, (state, action) => {
        if (action.payload.error === false) {
          state.status = apiStatus.success;
          // console.log("Payload Data", action.payload.data);
          state.userData = action.payload.data;
          ShowToast(JSON.stringify(action.payload.data.otp));
        } else {
          state.status = apiStatus.failed;
          state.userData = action.payload.message;
          console.log(action.payload.message);
        }
      })
      .addCase(FetchSignupData.rejected, (state, action) => {
        state.status = apiStatus.failed;
        console.log(action.error);
      });
  },
});

export const { resetData } = SignupSlice.actions;
export default SignupSlice.reducer;
