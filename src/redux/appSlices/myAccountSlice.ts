import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as Const from "../../models/api";
import { apiStatus, IStateProps } from "../apiDataTypes";
import { getApi } from "../../models/apiStructure";

const initialState: IStateProps = {
  status: apiStatus.idle,
  userData: {},
};

export const FetchMyAccountData = createAsyncThunk(
  "myAccountSlice/fetchMyAccountData",
  async () => {
    try {
      const response = await getApi(Const.API_DASHBOARD);
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
