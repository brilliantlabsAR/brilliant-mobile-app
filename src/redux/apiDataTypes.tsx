export enum apiStatus {
    idle,
    loading,
    success,
    failed,
}
export interface ILoginProps {
    phone: string;
    cc: string;
    fcmToken: string;
    deviceType: string;
}
export interface ISignupProps {
    phone: string;
    cc: any;
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
    cc: string,
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
    cc: string | any,
    phone: string | any,
    oldPhoneNumber: string | any,
    otp: string | any

}