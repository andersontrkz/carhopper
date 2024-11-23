export interface ICustomError {
    error_code: number;
    error_description: string;
}

export enum EErrorCode {
    INVALID_DATA = 'INVALID_DATA',
    INTERNAL_ERROR = 'INTERNAL_ERROR',
    RETRIEVING_DATA_ERROR = 'RETRIEVING_DATA_ERROR',
};
