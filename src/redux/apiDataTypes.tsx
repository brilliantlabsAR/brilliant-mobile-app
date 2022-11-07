export enum apiStatus {
    idle,
    loading,
    success,
    failed,
}
export interface ILoginProps {
    phone: string;
    cc: any;
    fcmToken: any;
    deviceType: any;
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
    userData: { [key: string]: string | number }
}