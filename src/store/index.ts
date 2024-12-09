import { configureStore } from '@reduxjs/toolkit'
import themeReducer from './theme/themeSlice'
import modalReducer from './modal/modalSlice'

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    modal: modalReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
