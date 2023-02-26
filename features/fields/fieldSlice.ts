import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
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
);

export const getFieldById = createAsyncThunk<Field, string>(
    "field/getFieldById",
    async (id, thunkAPI) => {
        try {
            const response = await agent.get(`/fields/field/${id}`)
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue({error});
        }
    }
)

export const createField = createAsyncThunk<Field, Field>(
    "field/createField",
    async (data, thunkAPI) => {
        try {
            const response = await agent.post("/fields/field", data);
            toast.success("Successfuly Created Field");
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue({error});
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
        });
        builder.addCase(getFieldById.fulfilled, (state, action) => {
            state.singleField = action.payload;
        });
    }
});

export const { setSingleField } = fieldSlice.actions;
export default fieldSlice.reducer;