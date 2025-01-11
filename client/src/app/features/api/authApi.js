import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { USER_BASE_API } from "../../../../env.js"
import { userLoggedIn } from "../authSlice"

const baseUrl = USER_BASE_API

const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl,
        credentials: "include"
    }),
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (inputData) => ({
                url: "register",
                method: "POST",
                body: inputData
            })
        }),
        loginUser: builder.mutation ({
            query: (inputData) => ({
                url: "login",
                method: "POST",
                body: inputData
            }),
            async onQueryStarted(args, { quaryFulfilled, dispatch }) {
                try {
                    const result = await quaryFulfilled
                    dispatch(userLoggedIn({ user: result.data.data }))
                } catch (error) {
                    console.log(error)
                }
            }
        })
    })
})

export const {
    useRegisterUserMutation,
    useLoginUserMutation
} = authApi