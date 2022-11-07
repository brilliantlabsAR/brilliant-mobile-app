import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import * as Const from "../../models/api";
import { apiStatus, IUpdateProfileProps, IStateProps } from "../apiDataTypes";
import { headers } from "../../models/apiStructure";

const initialState: IStateProps = {
  status: apiStatus.idle,
  userData: {},
};

export const FetchUpdateProfileData = createAsyncThunk(
  "updateProfileSlice/fetchUpdateProfileData",
  async (options: IUpdateProfileProps) => {
    try {
      const response = await axios.post(
        Const.API_BASE_URL + Const.API_UPDATE_USER,
        options,
        { headers }
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

const UpdateProfileSlice = createSlice({
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
      .addCase(FetchUpdateProfileData.pending, (state) => {
        state.status = apiStatus.loading;
      })
      .addCase(FetchUpdateProfileData.fulfilled, (state, action) => {
        if (action.payload.error === false) {
          state.status = apiStatus.success;
          console.log("UserData", action.payload.data);
          state.userData = action.payload.data;
        } else {
          state.status = apiStatus.failed;
          console.log(action.payload.message);
        }
      })
      .addCase(FetchUpdateProfileData.rejected, (state, action) => {
        state.status = apiStatus.failed;
        console.log(action.error);
      });
  },
});

export const { resetLogin } = UpdateProfileSlice.actions;
export default UpdateProfileSlice.reducer;
