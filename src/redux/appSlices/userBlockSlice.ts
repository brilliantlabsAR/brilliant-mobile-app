import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as Const from "../../models/api";
import { apiStatus, IUserBlockProps, IStateProps } from "../apiDataTypes";
import { postApi } from "../../models/apiStructure";

const initialState: IStateProps = {
  status: apiStatus.idle,
  userData: {},
};

export const FetchUserBlockData = createAsyncThunk(
  "userBlockSlice/fetchUserBlockData",
  async (options: IUserBlockProps) => {
    try {
      const response = await postApi(Const.API_BLOCK_USER, options);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

const UserBlockSlice = createSlice({
  name: "UserBlockSlice",
  initialState,
  reducers: {
    resetBlockData: (state) => {
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
          // console.log("Block User", action.payload);
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

export const { resetBlockData } = UserBlockSlice.actions;
export default UserBlockSlice.reducer;
