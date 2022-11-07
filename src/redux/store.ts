import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import LoginSlice from "./authSlices/loginSlice";
import otpVerifySlice from "./authSlices/otpVerifySlice";
import SignupSlice from "./authSlices/signupSlice";
import otpResendSlice from "./authSlices/otpResendSlice";

const store = configureStore({
  reducer: {
    login: LoginSlice,
    signup: SignupSlice,
    otp: otpVerifySlice,
    resendOtp: otpResendSlice,
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
