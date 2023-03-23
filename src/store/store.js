import { configureStore } from '@reduxjs/toolkit'
import DrawerOpenReducer from '../features/DrawerOpen/DrawerOpenSlice'
import RosConnectionReducer from '../features/RosConnection/RosConnectionSlice'
import LogoAppearReducer from '../features/LogoAppear/LogoAppearSlice'
import DepthReducer from '../features/Depth/DepthSlice'
import PIDReducer from '../features/PID/PIDSlicer'
import SpeedReducer from '../features/Speed/SpeedSlice'
import ConfigurationSlice from '../features/Configuration/ConfigurationSlice'
import PathSlice from '../features/Path/PathSlice'

export const store = configureStore({

  reducer: {
    DrawerOpen:DrawerOpenReducer,
    RosConnection: RosConnectionReducer,
    LogoAppear:LogoAppearReducer,
    Depth: DepthReducer,
    PID: PIDReducer,
    Speed: SpeedReducer,
    Configuration:ConfigurationSlice,
    Path:PathSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
})
