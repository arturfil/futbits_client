import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
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

export const getAllReportsOfUser = createAsyncThunk<Report[], string | string[]>(
    "report/getAllReportsOfUser",
    async (user_id, thunkAPI) => {
        try {
            const response = await agent.get(`/reports/user/${user_id}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue({error});
        }
    }
);

export const getAllReportsOfGame = createAsyncThunk<Report[], string | any>(
    "report/getAllReportsOfGame",
    async (game_id, thunkAPI) => {
        try {
            const response = await agent.get(`/reports/game/${game_id}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue({error});
        }
    }
)

export const getAllReportsOfGroup = createAsyncThunk<Report[], string | any>(
    "report/getAllReportsOfGroup",
    async (group_id, thunkAPI) => {
        try {
            const response = await agent.get(`/reports/group/${group_id}`);
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
            toast.success("Report was created successfully");
            const response = await agent.post("/reports/report", data);
            return response.data;
        } catch (error) {
            toast.error("Something went wrong");
            return thunkAPI.rejectWithValue({error});
        }
    }
);

export const uploadReport = createAsyncThunk<Report, Object | any>(
    "report/uploadReport",
    async (data, thunkAPI) => {
        // create form data object
        const fmData = new FormData();
        const config = {
            headers: {
                "content-type": `multipart/form-data`
            }
        }
        fmData.append(
            "reports",
            data,
        )
        console.log("dispatch", data)
        try {
            toast.success("Report was created successfully");
            const response = await agent.post("/reports/upload", fmData, config);
            return response.data
        } catch(error) {
            toast.error("Couldn't upload the file");
            return thunkAPI.rejectWithValue({error})
        }
    }
)

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
        builder.addCase(getAllReportsOfGroup.fulfilled, (state, action) => {
            state.reports = action.payload;
        })
        builder.addCase(getAllReportsOfGame.fulfilled, (state, action) => {
            state.reports = action.payload;
        })
    }
})

export const { setSingleReport } = reportSlice.actions;
export default reportSlice.reducer;
