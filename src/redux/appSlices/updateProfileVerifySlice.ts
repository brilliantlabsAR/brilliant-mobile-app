import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as Const from "../../models/api";
import {
  apiStatus,
  IProfileUpdateVerifyProps,
  IStateProps,
} from "../apiDataTypes";
import { postApi } from "../../models/apiStructure";

const initialState: IStateProps = {
  status: apiStatus.idle,
  userData: {},
};

export const FetchProfileVerifyData = createAsyncThunk(
  "updateProfileVerifySlice/fetchProfileVerifyData",
  async (options: IProfileUpdateVerifyProps) => {
    try {
      const response = await postApi(Const.API_PROFILE_UPDATE, options);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

const UpdateProfileVerifySlice = createSlice({
  name: "updateProfileVerifySlice",
  initialState,
  reducers: {
    resetProfileOtpData: (state) => {
      state.status = apiStatus.idle;
      state.userData = {};
    },
  },
  extraReducers(builder) {
    builder
      .addCase(FetchProfileVerifyData.pending, (state) => {
        state.status = apiStatus.loading;
      })
      .addCase(FetchProfileVerifyData.fulfilled, (state, action) => {
        if (action.payload.error == false) {
          state.status = apiStatus.success;
          state.userData = action.payload.data;
        } else {
          state.status = apiStatus.failed;
          state.userData = action.payload.message;
          console.log(action.payload.message);
        }
      })
      .addCase(FetchProfileVerifyData.rejected, (state, action) => {
        state.status = apiStatus.failed;
        console.log(action.error);
      });
  },
});

export const { resetProfileOtpData } = UpdateProfileVerifySlice.actions;
export default UpdateProfileVerifySlice.reducer;
