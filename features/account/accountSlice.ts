import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import agent from "../../api/agent";
import { User } from "../../interfaces/User";

interface AccountState {
    user: User | null;
    users: User[] | null;
    loggedIn: boolean;
    errors: Error[] | any;
}

const initialState: AccountState = {
    user: null,
    users: null,
    loggedIn: false,
    errors: []
}

export const getUserByToken = createAsyncThunk<User>(
    "account/getUserByToken",
    async (_, thunkAPI) => {
        try {
            const response = await agent.get("/users/bytoken");
            return response.data;
        } catch (error) {
            thunkAPI.dispatch(setLogOut())
            return thunkAPI.rejectWithValue({error});
        }
    }
)

export const searchUser = createAsyncThunk<User[], string>(
    "account/searchUser",
    async (word, thunkAPI) => {
        try {
            const response = await agent.get(`/users/search?keyword=${word}`);
            return response.data.users;
        } catch (error) {
            return thunkAPI.rejectWithValue({error});
        }
    }
)
export const loginUser = createAsyncThunk<User, any>( 
    "account/loginUser",
    async (data, thunkAPI) => {
        try {
            const response = await agent.post("/users/login", data);
            const { token } = response.data
            localStorage.setItem("jwt_gochi", JSON.stringify({token}))
            toast.success("Successfully Logged In")
            return response.data.user;
        } catch (error:any) {
            toast.error("Wrong credentials");
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
);

export const signupUser = createAsyncThunk<User, User>(
    "account/signupUser",
    async (data, thunkAPI) => {
        try {
            const response = await agent.post("/users/signup", data);
            toast.success("Successfully Signed Up")
            return response.data;
        } catch (error:any) {
            toast.error("Couldn't Signup, please try again");
            return thunkAPI.rejectWithValue({error: error.data});
        }
    }
)

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
            state.user = action.payload
            state.loggedIn = true;
        });
        builder.addCase(getUserByToken.fulfilled, (state, action) => {
            state.user = action.payload;
        });
        builder.addCase(searchUser.fulfilled, (state, action) => {
            state.users = action.payload;
        });
    }
});

export const { setLoggedIn, setUser, setLogOut } = accountSlice.actions;
export default accountSlice.reducer;