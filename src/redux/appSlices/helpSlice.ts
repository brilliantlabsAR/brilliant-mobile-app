import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as Const from "../../models/api";
import { apiStatus, IStateProps } from "../apiDataTypes";
import { getApi } from "../../models/apiStructure";

const initialState: IStateProps = {
  status: apiStatus.idle,
  userData: {},
};

export const FetchHelpData = createAsyncThunk(
  "helpSlice/fetchHelpData",
  async () => {
    try {
      const response = await getApi(Const.API_SLUG_CONTENT);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

const HelpSlice = createSlice({
  name: "helpSlice",
  initialState,
  reducers: {
    resetHelpData: (state) => {
      state.status = apiStatus.idle;
      state.userData = {};
    },
  },
  extraReducers(builder) {
    builder
      .addCase(FetchHelpData.pending, (state) => {
        state.status = apiStatus.loading;
      })
      .addCase(FetchHelpData.fulfilled, (state, action) => {
        if (action.payload.status === "success") {
          state.status = apiStatus.success;
          state.userData = action.payload.data;
        } else {
          state.status = apiStatus.failed;
          console.log(action.payload.message);
        }
      })
      .addCase(FetchHelpData.rejected, (state, action) => {
        state.status = apiStatus.failed;
        console.log(action.error);
      });
  },
});

export const { resetHelpData } = HelpSlice.actions;
export default HelpSlice.reducer;
