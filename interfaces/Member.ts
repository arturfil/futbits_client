export interface Member {
    id?: string;
    user_id: string;
    member_type: string;
    group_id: string | string[] | undefined;
    first_name?: string;
    last_name?: string;
    email?: string;
    created_at?: Date;
    updated_at?: Date;
}