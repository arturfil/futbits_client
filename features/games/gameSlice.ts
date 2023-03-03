import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import agent from "../../api/agent";
import { Game } from "../../interfaces/Game";

interface GameState {
    games: Game[] | null;
    singleGame: Game | null;
    errors: Error[] | any;
}

const initialState: GameState = {
    games: null,
    singleGame: null,
    errors: []
}

export const getAllGames = createAsyncThunk<Game[]>(
    "game/getAllGames",
    async (_, thunkAPI) => {
        try {
            const response = await agent.get("/games");
            return response.data.games;
        } catch (error) {
            return thunkAPI.rejectWithValue({error})
        }
    }
)

export const createGame = createAsyncThunk<Game, Game>(
    "game/createGame",
    async (data, thunkAPI) => {
        try {
            toast.success("Successfully created game!")
            const response = await agent.post("/games/game", data);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue({error});
        }
    }
)

export const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        setSingleGame: (state, action) => {
            state.singleGame = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllGames.fulfilled, (state, action) => {
            state.games = action.payload;
        });
    }
});

export const { setSingleGame } = gameSlice.actions;
export default gameSlice.reducer;