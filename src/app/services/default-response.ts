export interface DefaultResponse<T = any> {
    status: number;
    data: T | null;
    message?: string;
}