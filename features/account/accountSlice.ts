import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import agent from "../../api/agent";
import { User } from "../../interfaces/User";

interface AccountState {
    user: User | null;
    loggedIn: boolean;
    errors: Error[] | any;
}

const initialState: AccountState = {
    user: null,
    loggedIn: false,
    errors: []
}

export const loginUser = createAsyncThunk<User, any>( 
    "account/loginUser",
    async (data, thunkAPI) => {
        try {
            toast.success("Successfully Logged In")
            const response = await agent.post("/users/login", data);
            const { token } = response.data
            localStorage.setItem("jwt_gochi", JSON.stringify({token}))
            return response.data;
        } catch (error:any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
);

export const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.loggedIn = true;
            state.user = {...action.payload}
        },
        setLoggedIn: (state) => {
            state.loggedIn = true;
        },
        setLogOut: (state) => {
            state.loggedIn = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.errors = action.payload;
            state.loggedIn = true;
        });
    }
});

export const { setLoggedIn, setUser, setLogOut } = accountSlice.actions;
export default accountSlice.reducer;