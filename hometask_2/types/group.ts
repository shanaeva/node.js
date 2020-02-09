export type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES'

export type TGroup = {
    id?: number;
    name: string;
    permission: Permission[];
}

export type TAutoSuggestGroups = {
    name: string;
    limit: number;
}