import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as Const from "../../models/api";
import { apiStatus, IUpdateProfileProps, IStateProps } from "../apiDataTypes";
import { postApi } from "../../models/apiStructure";
import { ShowToast } from "../../utils/toastUtils";
import { STRINGS } from "../../models";

const initialState: IStateProps = {
  status: apiStatus.idle,
  userData: {},
};

export const FetchUpdateProfileData = createAsyncThunk(
  "updateProfileSlice/fetchUpdateProfileData",
  async (options: IUpdateProfileProps) => {
    try {
      const response = await postApi(Const.API_UPDATE_USER, options);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

const UpdateProfileSlice = createSlice({
  name: "updateProfileSlice",
  initialState,
  reducers: {
    resetProfileData: (state) => {
      state.status = apiStatus.idle;
      state.userData = {};
    },
  },
  extraReducers(builder) {
    builder
      .addCase(FetchUpdateProfileData.pending, (state) => {
        state.status = apiStatus.loading;
      })
      .addCase(FetchUpdateProfileData.fulfilled, (state, action) => {
        if (action.payload.error === false) {
          state.status = apiStatus.success;
          state.userData = action.payload.data;
          ShowToast(STRINGS.PROFILE_UPDATE_SUCCESS);
          // ShowToast(JSON.stringify(action.payload.data.otp));
        } else {
          state.status = apiStatus.failed;
          state.userData = action.payload.message;
          ShowToast(action.payload.message);
          console.log(action.payload.message);
        }
      })
      .addCase(FetchUpdateProfileData.rejected, (state, action) => {
        state.status = apiStatus.failed;
        console.log(action.error);
      });
  },
});

export const { resetProfileData } = UpdateProfileSlice.actions;
export default UpdateProfileSlice.reducer;
