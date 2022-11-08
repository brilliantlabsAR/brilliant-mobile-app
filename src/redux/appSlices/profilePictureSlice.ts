import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import * as Const from "../../models/api";
import { imageHeaders } from "../../models/apiStructure";
import { ShowToastLong } from "../../utils/toastUtils";
import { PROFILE_IMAGE_ERROR, PROFILE_IMAGE_SUCCESS } from "../../models";

export const FetchProfilePictureData = createAsyncThunk(
  "profilePictureSlice/fetchProfilePictureData",
  async (options: any) => {
    console.log("check image path", options);
    let data = new FormData();
    data.append("profilePicture", options);
    await axios
      .post(Const.API_BASE_URL + Const.API_UPDATE_IMAGE, data, {
        headers: imageHeaders,
      })
      .then((res) => {
        console.log("image data", res.data);
        let status = res.data.status;
        if (status == "success") {
          console.log("---->", PROFILE_IMAGE_SUCCESS);
          ShowToastLong(PROFILE_IMAGE_SUCCESS);
        } else {
          ShowToastLong(PROFILE_IMAGE_ERROR);
        }
      })
      .catch((e) => {
        console.log(e);
        return e;
      });
  }
);
