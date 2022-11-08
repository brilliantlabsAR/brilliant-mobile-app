import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import LoginSlice from "./authSlices/loginSlice";
import UpdateProfileSlice from "./appSlices/updateProfileSlice";
import SendInviteSlice from "./appSlices/sendInviteSlice";
import StreamerAudienceSlice from "./appSlices/streamerAudienceSlice";
import AppLocationSlice from "./appSlices/appLocationSlice";
import NotificationCreateSlice from "./appSlices/notificationCreateSlice";
import UserBlockSlice from "./appSlices/userBlockSlice";
import otpVerifySlice from "./authSlices/otpVerifySlice";
import SignupSlice from "./authSlices/signupSlice";
import otpResendSlice from "./authSlices/otpResendSlice";
import HelpSlice from "./appSlices/helpSlice";
import MyAccountSlice from "./appSlices/myAccountSlice";

const store = configureStore({
  reducer: {
    login: LoginSlice,
    signup: SignupSlice,
    otp: otpVerifySlice,
    resendOtp: otpResendSlice,
    updateProfile: UpdateProfileSlice,
    sendInviteSlice: SendInviteSlice,
    streamerAudienceSlice: StreamerAudienceSlice,
    appLocationSlice: AppLocationSlice,
    notificationCreateSlice: NotificationCreateSlice,
    userBlockSlice: UserBlockSlice,
    helpSlice:HelpSlice,
    myAccountSlice:MyAccountSlice
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
