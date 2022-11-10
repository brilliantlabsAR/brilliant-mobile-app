import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import * as Const from "../../models/api";
import { apiStatus, IStreamAudienceProps, IStateProps } from "../apiDataTypes";
import { getApi, headers } from "../../models/apiStructure";
import { ASYNC_CONST } from "../../models";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState: IStateProps = {
  status: apiStatus.idle,
  userData: {},
};

export const FetchMyAccountData = createAsyncThunk(
  "myAccountSlice/fetchMyAccountData",
  async () => {
    try {
      const response = getApi(Const.API_DASHBOARD);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

const MyAccountSlice = createSlice({
  name: "myAccountSlice",
  initialState,
  reducers: {
    resetData: (state) => {
      state.status = apiStatus.idle;
      state.userData = {};
    },
  },
  extraReducers(builder) {
    builder
      .addCase(FetchMyAccountData.pending, (state) => {
        state.status = apiStatus.loading;
      })
      .addCase(FetchMyAccountData.fulfilled, (state, action) => {
        if (action.payload.error == false) {
          state.status = apiStatus.success;
          state.userData = action.payload.data;
        } else {
          state.status = apiStatus.failed;
          console.log(action.payload.message);
        }
      })
      .addCase(FetchMyAccountData.rejected, (state, action) => {
        state.status = apiStatus.failed;
        console.log(action.error);
      });
  },
});

export const { resetData } = MyAccountSlice.actions;
export default MyAccountSlice.reducer;
