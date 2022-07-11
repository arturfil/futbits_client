export interface Member {
    id: number;
    player_id: string;
    member_type: string;
    first_name: string;
    last_name: string;
    email: string;
    group_id: number;
    created_at?: Date;
    updated_at?: Date;
}