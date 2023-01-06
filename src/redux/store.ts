import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import LoginSlice from "./authSlices/loginSlice";
import UpdateProfileSlice from "./appSlices/updateProfileSlice";
import NotificationCreateSlice from "./appSlices/notificationCreateSlice";
import otpVerifySlice from "./authSlices/otpVerifySlice";
import SignupSlice from "./authSlices/signupSlice";
import otpResendSlice from "./authSlices/otpResendSlice";
import MyAccountSlice from "./appSlices/myAccountSlice";
import UpdateProfileVerifySlice from "./appSlices/updateProfileVerifySlice";
import BluetoothPairingSlice from "./appSlices/pairingStatusSlice";

const store = configureStore({
  reducer: {
    login: LoginSlice,
    signup: SignupSlice,
    otp: otpVerifySlice,
    resendOtp: otpResendSlice,
    updateProfile: UpdateProfileSlice,
    notificationCreateSlice: NotificationCreateSlice,
    myAccountSlice: MyAccountSlice,
    updateProfileVerifySlice: UpdateProfileVerifySlice,
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
