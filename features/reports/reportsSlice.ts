import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../api/agent";
import { Report } from "../../interfaces/Report";

interface ReportState {
    reports: Report[] | null;
    singleReport: Report | null;
    errors: Error[] | any;
}

const initialState: ReportState = {
    reports: null,
    singleReport: null,
    errors: []
}

export const getAllReportsOfUser = createAsyncThunk<Report[], string>(
    "report/getAllReportsOfUser",
    async (user_id, thunkAPI) => {
        try {
            const response = await agent.get(`reports/${user_id}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue({error});
        }
    }
);

export const createReport = createAsyncThunk<Report, Object>(
    "report/createReport",
    async (data, thunkAPI) => {
        try {
            const response = await agent.post("/reports/report", data);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue({error});
        }
    }
);

export const reportSlice = createSlice({
    name: "report",
    initialState,
    reducers: {
        setSingleReport: (state, action) => {
            state.singleReport = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllReportsOfUser.fulfilled, (state, action) => {
            state.reports = action.payload;
        });
    }
})

export const { setSingleReport } = reportSlice.actions;
export default reportSlice.reducer;