import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type AuthState = {
  isAuthenticated: boolean
  token: string | null
  authLoading: boolean
  redirectUrl: string
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  authLoading: false,
  redirectUrl: '/',
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    socialLogin(state, action: PayloadAction<string>) {
      state.token = action.payload
      state.isAuthenticated = true
    },
    setLogout(state) {
      state.token = null
      state.isAuthenticated = false
    },
    setAuthenticated(state, action: PayloadAction<boolean>) {
      state.authLoading = action.payload
    },
    setRedirectUrl(state, action: PayloadAction<string>) {
      state.redirectUrl = action.payload
    },
  },
})

export const { socialLogin, setLogout, setAuthenticated, setRedirectUrl } = authSlice.actions
export default authSlice.reducer
