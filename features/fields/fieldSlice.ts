import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../api/agent";
import { Field } from "../../interfaces/Field";

interface FieldState {
    fields: Field[] | null;
    singleField: Field | null;
    errors: Error[] | any;
}

const initialState: FieldState = {
    fields: null,
    singleField: null,
    errors: []
}

export const getAllFields = createAsyncThunk<Field[]>(
    "field/getAllFields",
    async (_, thunkAPI) => {
        try {
            const response = await agent.get("/fields");
            return response.data.fields;
        } catch (error) {
            return thunkAPI.rejectWithValue({error})
        }
    }
) 

export const fieldSlice = createSlice({
    name: "field",
    initialState,
    reducers: {
        setSingleField: (state, action) => {
            state.singleField = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllFields.fulfilled, (state, action) => {
            state.fields = action.payload;
        })
    }
});

export const { setSingleField } = fieldSlice.actions;
export default fieldSlice.reducer;