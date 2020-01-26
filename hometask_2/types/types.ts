export type TUser = {
    id?: string;
    login: string;
    password: string;
    age: number;
    isDelete?: boolean;
}

export type TAutoSuggest = {
    login: string;
    limit: number;
}
