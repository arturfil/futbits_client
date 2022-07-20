export interface Member {
    id?: number;
    player_id: string;
    member_type: string;
    group_id: number;
    first_name?: string;
    last_name?: string;
    email?: string;
    created_at?: Date;
    updated_at?: Date;
}