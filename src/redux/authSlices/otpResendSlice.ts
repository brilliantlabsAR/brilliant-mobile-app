import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import * as Const from "../../models/api";
import { apiStatus, IResedOtpProps, IStateProps } from "../apiDataTypes";

const initialState: IStateProps = {
  status: apiStatus.idle,
  userData: {},
};

export const FetchResendOtpData = createAsyncThunk(
  "otpResendSlice/fetchResendOtpData",
  async (options: IResedOtpProps) => {
    try {
      const response = await axios.post(
        Const.API_BASE_URL + Const.API_RESEND_OTP,
        options
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

const OtpResendSlice = createSlice({
  name: "otpResendSlice",
  initialState,
  reducers: {
    resetData: (state) => {
      state.status = apiStatus.idle;
      state.userData = {};
    },
  },
  extraReducers(builder) {
    builder
      .addCase(FetchResendOtpData.pending, (state) => {
        state.status = apiStatus.loading;
      })
      .addCase(FetchResendOtpData.fulfilled, (state, action) => {
        if (action.payload.error === false) {
          state.status = apiStatus.success;
          console.log("Resend otp Payload Data", action.payload);
          state.userData = action.payload.data;
        } else {
          state.status = apiStatus.failed;
          console.log(action.payload.message);
        }
      })
      .addCase(FetchResendOtpData.rejected, (state, action) => {
        state.status = apiStatus.failed;
        console.log(action.error);
      });
  },
});

export const { resetData } = OtpResendSlice.actions;
export default OtpResendSlice.reducer;
