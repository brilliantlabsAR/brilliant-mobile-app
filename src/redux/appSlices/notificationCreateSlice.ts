import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import * as Const from "../../models/api";
import { apiStatus, INotificationProps, IStateProps } from "../apiDataTypes";
import { headers } from "../../models/apiStructure";

const initialState: IStateProps = {
  status: apiStatus.idle,
  userData: {},
};

export const FetchNotificationData = createAsyncThunk(
  "notificationCreateSlice/fetchNotificationData",
  async (options: INotificationProps) => {
    try {
      const response = await axios.post(
        Const.API_BASE_URL + Const.API_SEND_NOTIFICATION,
        options,
        { headers }
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

const NotificationCreateSlice = createSlice({
  name: "NotificationCreateSlice",
  initialState,
  reducers: {
    resetData: (state) => {
      state.status = apiStatus.idle;
      state.userData = {};
    },
  },
  extraReducers(builder) {
    builder
      .addCase(FetchNotificationData.pending, (state) => {
        state.status = apiStatus.loading;
      })
      .addCase(FetchNotificationData.fulfilled, (state, action) => {
        if (action.payload.error === false) {
          state.status = apiStatus.success;
          // console.log("User Notification", action.payload);
          state.userData = action.payload.data;
        } else {
          state.status = apiStatus.failed;
          console.log(action.payload.message);
        }
      })
      .addCase(FetchNotificationData.rejected, (state, action) => {
        state.status = apiStatus.failed;
        console.log(action.error);
      });
  },
});

export const { resetData } = NotificationCreateSlice.actions;
export default NotificationCreateSlice.reducer;
