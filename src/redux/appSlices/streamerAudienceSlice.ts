import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as Const from "../../models/api";
import { apiStatus, IStreamAudienceProps, IStateProps } from "../apiDataTypes";
import { postApi } from "../../models/apiStructure";

const initialState: IStateProps = {
  status: apiStatus.idle,
  userData: {},
};

export const FetchStreamerAudienceData = createAsyncThunk(
  "streamerAudienceSlice/FetchStreamerAudienceData",
  async (options: IStreamAudienceProps) => {
    try {
      const response = await postApi(Const.API_STREAMER_AUDIENCE, options);
      return response;
    } catch (error) {
      throw error;
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
          // console.log("Streamer List-->", action.payload.data);
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
