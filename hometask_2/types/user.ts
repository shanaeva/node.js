export type TUser = {
    id?: number;
    login: string;
    password: string;
    age: number;
    isDelete?: boolean;
}

export type TAutoSuggestUsers = {
    login: string;
    limit: number;
}
