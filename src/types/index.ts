export interface ILoginVerification {
  route: {
    [key: string]: string | number | any;
  };
}

export interface IOtpContainer {
  codeCount: number;
  containerStyle: any;
  onFinish: (code: string) => void;
  onTyping?: (code: string) => void;
}
export interface IFooter {
  selectedTab: string;
}
