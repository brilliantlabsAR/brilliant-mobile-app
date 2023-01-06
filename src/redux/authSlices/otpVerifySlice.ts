import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import * as Const from "../../models/api";
import { apiStatus, IOtpProps, IStateProps } from "../apiDataTypes";
import { REACT_APP_API_BASE_URL } from "@env";

const initialState: IStateProps = {
  status: apiStatus.idle,
  userData: {},
};

export const FetchOtpData = createAsyncThunk(
  "otpVerifySlice/fetchOtpData",
  async (options: IOtpProps) => {
    try {
      const response = await axios.post(
        REACT_APP_API_BASE_URL + Const.API_VERIFY_OTP,
        options
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const OtpVerifySlice = createSlice({
  name: "otpVerifySlice",
  initialState,
  reducers: {
    resetOTPData: (state) => {
      state.status = apiStatus.idle;
      state.userData = {};
    },
  },
  extraReducers(builder) {
    builder
      .addCase(FetchOtpData.pending, (state) => {
        state.status = apiStatus.loading;
      })
      .addCase(FetchOtpData.fulfilled, (state, action) => {
        if (action.payload.error === false) {
          state.status = apiStatus.success;
          console.log("Payload Data", action.payload);
          state.userData = action.payload.data;
        } else {
          state.status = apiStatus.failed;
          console.log(action.payload.message);
          state.userData = action.payload.message;
        }
      })
      .addCase(FetchOtpData.rejected, (state, action) => {
        state.status = apiStatus.failed;
        console.log(action.error);
      });
  },
});

export const { resetOTPData } = OtpVerifySlice.actions;
export default OtpVerifySlice.reducer;
