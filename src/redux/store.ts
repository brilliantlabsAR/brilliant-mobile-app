import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import BluetoothPairingSlice from "./appSlices/pairingStatusSlice";

const store = configureStore({
  reducer: {
    pairing: BluetoothPairingSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
