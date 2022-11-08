import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import * as Const from "../../models/api";
import { apiStatus, IUserBlockProps, IStateProps } from "../apiDataTypes";
import { headers } from "../../models/apiStructure";

const initialState: IStateProps = {
  status: apiStatus.idle,
  userData: {},
};

export const FetchUserBlockData = createAsyncThunk(
  "userBlockSlice/fetchUserBlockData",
  async (options: IUserBlockProps) => {
    try {
      const response = await axios.post(
        Const.API_BASE_URL + Const.API_BLOCK_USER,
        options,
        { headers }
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

const UserBlockSlice = createSlice({
  name: "UserBlockSlice",
  initialState,
  reducers: {
    resetData: (state) => {
      state.status = apiStatus.idle;
      state.userData = {};
    },
  },
  extraReducers(builder) {
    builder
      .addCase(FetchUserBlockData.pending, (state) => {
        state.status = apiStatus.loading;
      })
      .addCase(FetchUserBlockData.fulfilled, (state, action) => {
        if (action.payload.error === false) {
          state.status = apiStatus.success;
          console.log("User Notification", action.payload);
          state.userData = action.payload.data;
        } else {
          state.status = apiStatus.failed;
          console.log(action.payload.message);
        }
      })
      .addCase(FetchUserBlockData.rejected, (state, action) => {
        state.status = apiStatus.failed;
        console.log(action.error);
      });
  },
});

export const { resetData } = UserBlockSlice.actions;
export default UserBlockSlice.reducer;
