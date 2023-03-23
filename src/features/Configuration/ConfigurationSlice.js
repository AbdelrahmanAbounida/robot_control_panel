import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cameraOffset:{
    x:0,
    y:0.2,
    z:0
  },
  tagPosition:{
    x:0.5,
    y:3.35,
    z:-0.5
  }
}

export const ConfigurationSlice = createSlice({
  name: 'configuration',
  initialState,
  reducers: {
    setTagPosition: (state,action) => {
      state.tagPosition = action.payload
    },
    setCameraOffset: (state,action) => {
        state.cameraOffset = action.payload
      },
  },
})

export const { setTagPosition, setCameraOffset} = ConfigurationSlice.actions
export default ConfigurationSlice.reducer
