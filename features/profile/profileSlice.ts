import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../api/agent";
import { Profile } from "../../interfaces/Profile";


interface ProfileState {
    profile: Profile | null;
    loaded: boolean;
    errors: Error[] | any;
}

const initialState: ProfileState = {
    loaded: false,
    profile: null,
    errors: []
}

export const getProfileFromUserId = createAsyncThunk<Profile, string | string[]>(
    "profile/getProfileFromUserId",
    async (user_id, thunkAPI) => {
        try {
            const response = await agent.get(`/profile/${user_id}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue({error});
        }
    }
);

export const createProfile = createAsyncThunk<Profile, Profile>(
    "profile/createProfile",
    async (data, thunkAPI) => {
        try {
            const response = await agent.post("/profile/create", data);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue({error});
        }
    }
)

export const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setProfile: (state, action) => {
            state.profile = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getProfileFromUserId.fulfilled, (state, action) => {
            state.profile = action.payload;
            state.loaded = true;
        });
    }
});

export const { setProfile } = profileSlice.actions;
export default profileSlice.reducer;
