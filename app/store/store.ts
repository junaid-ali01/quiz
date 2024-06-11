import { configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import counterReducer from "./counterSlice"
import authReducer from "./authSlice"

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,

    // add other state here
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Use throughout app instead of plain `useDispatch` and `useSelector` for type safety
type DispatchFunc = () => AppDispatch
export const useAppDispatch: DispatchFunc = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
