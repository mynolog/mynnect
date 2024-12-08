import { configureStore } from '@reduxjs/toolkit'
import themeReducer from './theme/themeSlice'
import authReducer from './auth/authSlice'
import modalReducer from './modal/modalSlice'

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    modal: modalReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
