export interface Report {
    id?: string;
    team_side: string;
    game_id: string;
    user_id: UserId;
    player_name: string
    goals: number;
    assists: number;
    won: boolean | number;
    man_of_the_match: boolean | number;
    created_at?: Date;
    updated_at?: Date;
}

export interface UserId {
    String: string;
    Valid: boolean;
}
