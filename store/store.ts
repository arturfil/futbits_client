import { configureStore } from "@reduxjs/toolkit";

import accountReducer from '../features/account/accountSlice';
import fieldReducer from '../features/fields/fieldSlice';
import gameReducer from '../features/games/gameSlice';
import groupReducer from '../features/groups/groupSlice';
import memberReducer from '../features/members/memberSlice';
import profileReducer from '../features/profile/profileSlice';

export const store = configureStore({
    reducer: {
        account: accountReducer,
        field: fieldReducer,
        games: gameReducer,
        groups: groupReducer,
        members: memberReducer,
        profile: profileReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;