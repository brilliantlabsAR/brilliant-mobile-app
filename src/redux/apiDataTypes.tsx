export enum apiStatus {
    idle,
    loading,
    success,
    failed,
}
export interface ILoginProps {
    phone: string;
    fcmToken: string;
    deviceType: string;
}
export interface ISignupProps {
    phone: string;
    name: any;
    email: any;
}
export interface IOtpProps {
    phone: string;
    otp: any;
}
export interface IResedOtpProps {
    phone: string;
}
export interface IStateProps {
    status: apiStatus;
    userData: { [key: string]: any }
}

export interface IUpdateProfileProps {
    name: string,
    phone: string,
    email: string
}

export interface INotificationProps {
    userId: string
}

export interface IProfilePictureProps {
    profilePicture: any
}

export interface IProfileUpdateVerifyProps {
    name: string | any,
    email: string | any,
    phone: string | any,
    oldPhoneNumber: string | any,
    otp: string | any

}