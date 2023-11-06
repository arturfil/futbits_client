import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import agent from "../../api/agent";
import { Game } from "../../interfaces/Game";

interface GameState {
    games: Game[] | null;
    singleGame: Game | null;
    errors: Error[] | any;
    loading: Boolean;
}

const initialState: GameState = {
    games: null,
    singleGame: null,
    errors: [],
    loading: false
}

export const getAllGames = createAsyncThunk<Game[], string>(
    "game/getAllGames",
    async (id, thunkAPI) => {
        try {
            const response = await agent.get(`/games/${id}`);
            return response.data.games;
        } catch (error) {
            return thunkAPI.rejectWithValue({error})
        }
    }
)

export const getSingleGame = createAsyncThunk<Game, string | string[]>(
    "game/getSingleGame",
    async (id, thunkAPI) => {
        try {
            const response = await agent.get(`/games/game/${id}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue({error});
        }
    }
)

export const createGame = createAsyncThunk<Game, Game>(
    "game/createGame",
    async (data, thunkAPI) => {
        try {
            toast.success("Successfully created game!")
            const response = await agent.post("/games/game", data);
            // thunkAPI.dispatch(getAllGames());
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
        builder.addCase(getSingleGame.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(getSingleGame.fulfilled, (state, action) => {
            state.loading = false;
            state.singleGame = action.payload;
        })
    }
});

export const { setSingleGame } = gameSlice.actions;
export default gameSlice.reducer;
