import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type Theme = 'light' | 'dark'

type ThemeState = {
  theme: Theme
}

const initialState: ThemeState = {
  theme: 'light',
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === 'light' ? 'dark' : 'light'
    },
    setTheme(state, action: PayloadAction<Theme>) {
      state.theme = action.payload
    },
  },
})

export const { toggleTheme, setTheme } = themeSlice.actions
export default themeSlice.reducer
