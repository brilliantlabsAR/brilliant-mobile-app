import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import * as Const from "../../models/api";
import { apiStatus, IStreamAudienceProps, IStateProps } from "../apiDataTypes";
import { headers } from "../../models/apiStructure";

const initialState: IStateProps = {
  status: apiStatus.idle,
  userData: {},
};

export const FetchStreamerAudienceData = createAsyncThunk(
  "streamerAudienceSlice/FetchStreamerAudienceData",
  async (options: IStreamAudienceProps) => {
    try {
      const response = await axios.post(
        Const.API_BASE_URL + Const.API_STREAMER_AUDIENCE,
        options,
        { headers }
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

const StreamerAudienceSlice = createSlice({
  name: "StreamerAudienceSlice",
  initialState,
  reducers: {
    resetData: (state) => {
      state.status = apiStatus.idle;
      state.userData = {};
    },
  },
  extraReducers(builder) {
    builder
      .addCase(FetchStreamerAudienceData.pending, (state) => {
        state.status = apiStatus.loading;
      })
      .addCase(FetchStreamerAudienceData.fulfilled, (state, action) => {
        if (action.payload.error === false) {
          state.status = apiStatus.success;
          console.log("Streamer List-->", action.payload.data);
          state.userData = action.payload.data;
        } else {
          state.status = apiStatus.failed;
          console.log(action.payload.message);
        }
      })
      .addCase(FetchStreamerAudienceData.rejected, (state, action) => {
        state.status = apiStatus.failed;
        console.log(action.error);
      });
  },
});

export const { resetData } = StreamerAudienceSlice.actions;
export default StreamerAudienceSlice.reducer;
