export interface Report {
    id?: string
    user_id: string
    game_id: string
    assists: number
    goals: number
    attendance: number
    man_of_the_match: number
    involvement: string
    attitude: string
    created_at?: Date
    updated_at?: Date
}