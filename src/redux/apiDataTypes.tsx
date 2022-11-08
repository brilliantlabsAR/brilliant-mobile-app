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
export interface ISendInviteProps {
    cc: string,
    receiver: string
}
export interface IStreamAudienceProps {
}

export interface ILocationStoreProps {
    latitude: string,
    longitude: string,
    time: string
}
export interface INotificationProps {
    userId: string
}
export interface IUserBlockProps {
    blockedUser: string,
    type: string
}

export interface IProfilePictureProps {
    profilePicture: any
}