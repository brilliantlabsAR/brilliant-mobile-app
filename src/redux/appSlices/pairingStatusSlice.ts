import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DevicePairingStatus } from "../../models";
import { RootState } from "../store";
export interface DevicePairingState {
  status: DevicePairingStatus;
  peripheralId?: string;
  error?: string;
}

const initialState: DevicePairingState = {
  status: DevicePairingStatus.Unpaired,
  peripheralId: undefined,
};

// Slice
const devicePairingSlice = createSlice({
  initialState: initialState,
  name: "devicePairing",
  reducers: {
    setDevicePairingStatus: (
      state: DevicePairingState,
      action: PayloadAction<{
        status: DevicePairingStatus;
        id?: string;
      }>
    ) => {
      state.status = action.payload.status;
      state.peripheralId = action.payload.id;
    },
    setDevicePairingError: (
      state: DevicePairingState,
      action: PayloadAction<string | undefined>
    ) => {
      state.error = action.payload;
    },
  },
});

export const { setDevicePairingStatus, setDevicePairingError } =
  devicePairingSlice.actions;

export default devicePairingSlice.reducer;
