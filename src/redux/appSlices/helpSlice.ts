import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import * as Const from "../../models/api";
import { apiStatus, IStreamAudienceProps, IStateProps } from "../apiDataTypes";
import { headers } from "../../models/apiStructure";

const initialState: IStateProps = {
  status: apiStatus.idle,
  userData: {},
};

export const FetchHelpData = createAsyncThunk(
  "helpSlice/fetchHelpData",
  async (options: IStreamAudienceProps) => {
    try {
      const response = await axios.get(
        Const.API_BASE_URL + Const.API_SLUG_CONTENT
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

const HelpSlice = createSlice({
  name: "helpSlice",
  initialState,
  reducers: {
    resetData: (state) => {
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
        if (action.payload.status === 'success') {
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

export const { resetData } = HelpSlice.actions;
export default HelpSlice.reducer;
