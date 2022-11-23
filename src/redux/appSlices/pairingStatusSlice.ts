import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DevicePairingStatus } from "../../models";
import { RootState } from "../store";
export interface DevicePairingState {
  status: DevicePairingStatus;
  error?: string;
}

const initialState: DevicePairingState = {
  status: DevicePairingStatus.Unpaired,
};

// Slice
const devicePairingSlice = createSlice({
  initialState: initialState,
  name: "devicePairing",
  reducers: {
    setDevicePairingStatus: (
      state: DevicePairingState,
      action: PayloadAction<DevicePairingStatus>
    ) => {
      state.status = action.payload;
    },
    setDevicePairingError: (
      state: DevicePairingState,
      action: PayloadAction<string | undefined>
    ) => {
      state.error = action.payload;
    },
  },
});

export const { setDevicePairingStatus } = devicePairingSlice.actions;

export default devicePairingSlice.reducer;
