import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import LoginSlice from "./authSlices/loginSlice";
import UpdateProfileSlice from "./appSlices/updateProfileSlice";

const store = configureStore({
  reducer: {
    login: LoginSlice,
    updateProfile: UpdateProfileSlice,
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
