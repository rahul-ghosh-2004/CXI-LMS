import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: {
        user: {},
        isAuthenticated: false
    }
}

const authSlice = createSlice({
    name: "authSlice",
    initialState: initialState,
    reducers: {
        userLoggedIn: (state, action) => {
            state.data.user = action.payload.user
            state.data.isAuthenticated = true
        },
        userLoggedOut: (state, action) => {
            state.data.user = null
            state.data.isAuthenticated = false
        }
    }
})

export const { userLoggedIn, userLoggedOut } = authSlice.actions
export default authSlice.reducer