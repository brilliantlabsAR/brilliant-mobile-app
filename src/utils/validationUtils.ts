/*
 *Common Tasks carried all over the project
 */
import React from "react";
import { AsyncStorage } from "react-native";
import { STRINGS } from "../models";
import { ShowToast } from "../utils/toastUtils";

export const Validations = {
  /**
   * desc: Method of all validation
   * @returns boolean
   */

  verifyRequired(text: any) {
    if (text && text.trim().length > 0) {
      return true;
    } else {
      ShowToast(STRINGS.VERIFY_REQUIRE);
      return false;
    }
  },

  verifyEmail(email: string): boolean {
    if (email) {
      var mailformat =
        /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
      if (email.match(mailformat)) {
        return true;
      } else {
        ShowToast(STRINGS.EMAIL_ERROR);
        return false;
      }
    } else {
      ShowToast(STRINGS.EMPTY_EMAIL_ERROR);
      return false;
    }
  },

  verifyPhone(phoneNo: string): boolean {
    if (phoneNo !== "") {
      // var phoneNoFormat = /^\d{10}$/;
      // if (phoneNo.match(phoneNoFormat)) {
      return true;
      // } else {
      //   ShowToast(STRINGS.PHONE_ERROR);
      //   return false;
      // }
    } else {
      ShowToast(STRINGS.EMPTY_PHONE_ERROR);
      return false;
    }
  },

  verifyPass(text: string) {
    // if (text && text.length > 0) {
    //     var passFormat = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');
    //     if (passFormat.test(text)) {
    //         return true;
    //     }else {
    //         showErrorAlert(STRINGS.errPassChecking)
    //     }
    // } else {
    //     showErrorAlert(STRINGS.errEmptyPass)
    //     return false
    // }
    if (text && text.length > 0) {
      return true;
    } else {
      ShowToast(STRINGS.PASSWORD_ERROR);
      return false;
    }
  },

  VerifySignup(phnNo: string, name: string, email: string) {
    if (
      this.verifyPhone(phnNo) &&
      this.verifyRequired(name) &&
      this.verifyEmail(email)
    ) {
      return true;
    } else {
      return false;
    }
  },

  /**
   * desc: Method of login validation
   * @returns boolean
   */
  VerifyLogin(phone: string) {
    if (this.verifyPhone(phone)) {
      return true;
    } else {
      return false;
    }
  },

  verifyChangePass(oldPass: string, newPass: string, confPass: string) {
    if (
      this.verifyPass(oldPass) &&
      this.verifyPass(newPass) &&
      newPass === confPass
    ) {
      return true;
    } else {
      return false;
    }
  },

  verifyOtp(otp: string) {
    if (otp && otp.length == 4) {
      return true;
    } else {
      ShowToast(STRINGS.OTP_VERIFY);
      return false;
    }
  },
};
