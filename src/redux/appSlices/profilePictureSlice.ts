import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import * as Const from "../../models/api";
import { REACT_APP_API_BASE_URL } from "@env";
import { imageHeaders } from "../../models/apiStructure";
import { ShowToastLong } from "../../utils/toastUtils";
import { ASYNC_CONST, STRINGS } from "../../models/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const FetchProfilePictureData = createAsyncThunk(
  "profilePictureSlice/fetchProfilePictureData",
  async (options: any) => {
    const userToken = await AsyncStorage.getItem(ASYNC_CONST.accessToken);
    console.log("token here", userToken);

    // console.log("check image path", options);
    let data = new FormData();
    data.append("profilePicture", options);
    await axios
      .post(REACT_APP_API_BASE_URL + Const.API_UPDATE_IMAGE, data, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          "x-access-token": userToken,
        },
      })
      .then((res) => {
        console.log("image data", res.data);
        let status = res.data.status;
        if (status == "success") {
          console.log("---->", STRINGS.PROFILE_IMAGE_SUCCESS);
          ShowToastLong(STRINGS.PROFILE_IMAGE_SUCCESS);
        } else {
          ShowToastLong(STRINGS.PROFILE_IMAGE_ERROR);
        }
      })
      .catch((e) => {
        console.log(e);
        throw e;
      });
  }
);
