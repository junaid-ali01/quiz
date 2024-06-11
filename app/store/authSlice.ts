import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface AuthState {
  name: string
  email: string
  password: string
  registered: boolean
  isLoggedIn: boolean
}
const initialState: AuthState = {
  name: "",
  email: "",
  password: "",
  registered: false,
  isLoggedIn: false,
}
export const authSlice = createSlice({
  name: "auth",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ email: string; password: string }>) => {
      state.email = action.payload.email
      state.password = action.payload.password
      state.isLoggedIn = true
    },
    registerSuccess: (
      state,
      action: PayloadAction<{ name: string; email: string; password: string }>,
    ) => {
      state.name = action.payload.name
      state.email = action.payload.email
      state.password = action.payload.password
      state.isLoggedIn = true
    },
    logoutSuccess: (state) => {
      state.name = ""
      state.email = ""
      state.password = ""
      state.isLoggedIn = false
    },
  },
})

export const { registerSuccess, loginSuccess, logoutSuccess } = authSlice.actions
export default authSlice.reducer
