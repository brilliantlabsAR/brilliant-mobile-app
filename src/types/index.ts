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
  blankCheck: boolean;
}
export interface IFooter {
  selectedTab: string;
}

export interface ITopBar {
  title?: string;
  isTextVisible?: boolean;
}

export interface CommonButtonProps {
  buttonLabel: string;
  handlePress: () => void;
}

export interface UpdateFirmwareFileComponentProps {
  textLabel: string;
  fileNameLabel: string;
}

export interface CustomModalProps {
  modalVisible: boolean;
  modalVisibleOff: () => void;
  pairNow: () => void;
  title: string;
}
