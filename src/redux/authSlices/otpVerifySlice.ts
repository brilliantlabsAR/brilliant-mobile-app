import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import * as Const from "../../models/api";
import { apiStatus, IOtpProps, IStateProps } from "../apiDataTypes";

const initialState: IStateProps = {
  status: apiStatus.idle,
  userData: {},
};

export const FetchOtpData = createAsyncThunk(
  "otpVerifySlice/fetchOtpData",
  async (options: IOtpProps) => {
    try {
      const response = await axios.post(
        Const.API_BASE_URL + Const.API_VERIFY_OTP,
        options
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

const OtpVerifySlice = createSlice({
  name: "otpVerifySlice",
  initialState,
  reducers: {
    resetData: (state) => {
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

export const { resetData } = OtpVerifySlice.actions;
export default OtpVerifySlice.reducer;