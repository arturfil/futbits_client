import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import agent from "../../api/agent";
import { Group } from "../../interfaces/Group";

interface GroupState {
    groups: Group[] | null;
    singleGroup: Group | null;
    errors: Error[] | any;
}

const initialState: GroupState = {
    groups: null,
    singleGroup: null,
    errors: []
}

export const getAllGroups = createAsyncThunk<Group[]>(
    "group/getAllGroups",
    async (_, thunkAPI) => {
        try {
            const response = await agent.get("/groups")
            return response.data.groups;
        } catch (error) {
            return thunkAPI.rejectWithValue({error})
        }
    }
)

export const createNewGroup = createAsyncThunk<Group, Object>(
    "group/createGroup",
    async (data, thunkAPI) => {
        try {
            toast.success("Created Group successfully");
            const response = await agent.post("/groups/create", data);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue({error});
        }
    }
)

export const getSingleGroup = createAsyncThunk<Group, string | any>(
    "group/getSingleGroup",
    async (id, thunkAPI) => {
        try {
            const response:any = await agent.get(`/groups/group/${id}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue({error});
        }
    }
)

export const groupSlice = createSlice({
    name: "group",
    initialState,
    reducers: {
        setSingleGroup: (state, action) => {
            state.singleGroup = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllGroups.fulfilled, (state, action) => {
            state.groups = action.payload;
        });
        builder.addCase(getSingleGroup.fulfilled, (state, action) => {
            state.singleGroup = action.payload;
        })
    }
});

export const { setSingleGroup } = groupSlice.actions;
export default groupSlice.reducer;