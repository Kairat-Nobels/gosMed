
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  lang: 'ru',
}

const languageSlice = createSlice({
  name: 'languageSlice',
  initialState,
  reducers: {
    setLang: (state, action) => {
      state.lang = action.payload
    },
  },
})

export const { setLang } = languageSlice.actions
export default languageSlice.reducer
