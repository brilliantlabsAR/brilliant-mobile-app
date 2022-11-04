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
export interface ILoginState {
    status: apiStatus;
    loginData: { [key: string]: string | number }
}