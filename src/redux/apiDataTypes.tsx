export enum apiStatus {
    idle,
    loading,
    success,
    failed,
}
export interface IStateProps {
    status: apiStatus;
    userData: { [key: string]: any }
}
