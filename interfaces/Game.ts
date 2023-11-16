export interface Game {
    id?: string;
    field_id: string;
    field_name?: string;
    group_id: string; 
    group_name: string;
    game_date: string | Date;
    score: string;
    created_at?: Date | string;
    updated_at?: Date | string;
}
