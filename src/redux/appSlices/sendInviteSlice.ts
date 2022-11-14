import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as Const from "../../models/api";
import { apiStatus, ISendInviteProps, IStateProps } from "../apiDataTypes";
import { postApi } from "../../models/apiStructure";

const initialState: IStateProps = {
  status: apiStatus.idle,
  userData: {},
};

export const FetchSendInviteData = createAsyncThunk(
  "sendInviteSlice/FetchSendInviteData",
  async (options: ISendInviteProps) => {
    try {
      const response = await postApi(Const.API_SEND_INVITE, options);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

const SendInviteSlice = createSlice({
  name: "SendInviteSlice",
  initialState,
  reducers: {
    resetInviteData: (state) => {
      state.status = apiStatus.idle;
      state.userData = {};
    },
  },
  extraReducers(builder) {
    builder
      .addCase(FetchSendInviteData.pending, (state) => {
        state.status = apiStatus.loading;
      })
      .addCase(FetchSendInviteData.fulfilled, (state, action) => {
        if (action.payload.error === false) {
          state.status = apiStatus.success;
          // console.log("Invitation Sent-->", action.payload);
          state.userData = action.payload;
        } else {
          state.status = apiStatus.failed;
          console.log(action.payload.message);
        }
      })
      .addCase(FetchSendInviteData.rejected, (state, action) => {
        state.status = apiStatus.failed;
        console.log(action.error);
      });
  },
});

export const { resetInviteData } = SendInviteSlice.actions;
export default SendInviteSlice.reducer;
