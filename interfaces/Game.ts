export interface Game {
    id?: string;
    field_id: string;
    field_name?: string;
    // start_time: string;
    game_date: string | Date;
    max_players: number;
    created_at?: Date | string;
    updated_at?: Date | string;
}
