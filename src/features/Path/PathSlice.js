import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value:"square"
  }

export const PathSlice = createSlice({
  name: 'path',
  initialState,
  reducers: {
    setPath: (state,action) => {
      state.value = action.payload
    }
  },
})

export const { setPath } = PathSlice.actions
export default PathSlice.reducer
