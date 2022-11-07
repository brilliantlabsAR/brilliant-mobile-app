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
export interface IStateProps {
    status: apiStatus;
    userData: { [key: string]: string | number }
}

export interface IUpdateProfileProps {
    cc: string,
    name: string,
    phone: string,
    email: string
}