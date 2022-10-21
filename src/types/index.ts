export interface ILoginVerification {
  route: {
    [key: string]: string | number | any;
  };
}

export interface IOtpContainer {
  codeCount:number;
  containerStyle:any;
  otpStyles:() => void;
  onFinish:() => void;
}