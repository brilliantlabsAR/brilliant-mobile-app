/*
 *Common Tasks carried all over the project
 */
import React from "react";
import { AsyncStorage } from "react-native";
import * as CONST from "../models";
import { ShowToast } from "../utils/toastUtils";

export const Validations = {
  verifyEmail(email) {
    if (email) {
      var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (email.match(mailformat)) {
        return true;
      } else {
        ShowToast(CONST.EMAIL_ERROR);
        return false;
      }
    } else {
      ShowToast(CONST.EMPTY_EMAIL_ERROR);
      return false;
    }
  },
  verifyPhone(phoneNo) {
    if (phoneNo) {
      var phoneNoFormat = /^\d{10}$/;
      if (phoneNo.match(phoneNoFormat)) {
        return true;
      } else {
        ShowToast(CONST.PHONE_ERROR);
        return false;
      }
    } else {
      ShowToast(CONST.EMPTY_PHONE_ERROR);
      return false;
    }
  },

  verifyPass(text) {
    // if (text && text.length > 0) {
    //     var passFormat = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');
    //     if (passFormat.test(text)) {
    //         return true;
    //     }else {
    //         showErrorAlert(Strings.errPassChecking)
    //     }
    // } else {
    //     showErrorAlert(Strings.errEmptyPass)
    //     return false
    // }
    if (text && text.length > 0) {
      return true;
    } else {
      ShowToast(CONST.PASSWORD_ERROR);
      return false;
    }
  },

  verifyRequired(text) {
    if (text && text.trim().length > 0) {
      return true;
    } else {
      ShowToast(CONST.VERIFY_REQUIRE);
      return false;
    }
  },

  VerifySignup1(fName, lName, email, contactNo, pass, location) {
    if (
      this.verifyRequired(fName) &&
      this.verifyRequired(lName) &&
      this.verifyEmail(email) &&
      this.verifyPhone(contactNo) &&
      this.verifyPass(pass) &&
      this.verifyRequired(location)
    ) {
      return true;
    } else {
      return false;
    }
  },
  VerifyLogin(email, pswrd) {
    if (this.verifyEmail(email) && this.verifyPass(pswrd)) {
      return true;
    } else {
      return false;
    }
  },
  verifyChangePass(oldPass, newPass, confPass) {
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
  verifyOtp(otp) {
    if (otp && otp.length == 4) {
      return true;
    } else {
      false;
    }
  },
  verifyOptionalMail(text) {
    if (text) {
      if (this.verifyEmail(text)) {
        return true; //valid email
      } else {
        return false;
      }
    } else {
      return true; //no mail
    }
  },
  verifyOptionalPhone(text) {
    if (text) {
      if (this.verifyPhone(text)) {
        return true; //valid phone
      } else {
        return false;
      }
    } else {
      return true; //no phone
    }
  },
};
