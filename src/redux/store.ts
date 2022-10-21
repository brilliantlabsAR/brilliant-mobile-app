import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import tutorialSlice from "./slice/tutorialSlice";
import bluetoothPairingSlice from "./slice/bluetoothPairingSlice";
import dashboardDataSlice from "./slice/dashboardDataSlice";

const store = configureStore({
  reducer: {
    tutorial: tutorialSlice,
    pairing: bluetoothPairingSlice,
    dashboardData: dashboardDataSlice,
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
