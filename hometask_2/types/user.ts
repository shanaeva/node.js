export type TUser = {
    id?: number;
    login: string;
    password: string;
    age: number;
    isDelete?: boolean;
}

export type TAutoSuggest = {
    login: string;
    limit: number;
}
