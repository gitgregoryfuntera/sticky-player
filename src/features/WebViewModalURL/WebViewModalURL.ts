import { createSlice } from '@reduxjs/toolkit'

export const WebViewModalURL = createSlice({
  name: 'WebViewModalURL',
  initialState: {
    value: 'https://www.youtube.com',
  },
  reducers: {
    modifyURL: (state, action) => {
      state.value = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { modifyURL } = WebViewModalURL.actions

export default WebViewModalURL.reducer