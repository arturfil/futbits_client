import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../api/agent";
import { Member } from "../../interfaces/Member";

interface MemberState {
    members: Member[] | null;
    singleMember: Member | null;
    errors: Error[] | any;
}

const initialState: MemberState = {
    members: null,
    singleMember: null,
    errors: []
}

export const getAllMembers = createAsyncThunk<Member[]>(
    "memeber/getAllMember",
    async (_, thunkAPI) => {
        try {
            const response = await agent.get("/members");
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue({error});
        }
    }
)

export const createMember = createAsyncThunk<Member, Object>(
    "member/createMember",
    async (data, thunkAPI) => {
        try {
            const response = await agent.post("/members/create", data);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue({error});
        }
    }
)

export const memberSlice = createSlice({
    name: "member",
    initialState,
    reducers: {
        setSingleMember: (state, action) => {
            state.singleMember = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllMembers.fulfilled, (state, action) => {
            state.members = action.payload;
        });
    }
});


export const { setSingleMember } = memberSlice.actions;
export default memberSlice.reducer;