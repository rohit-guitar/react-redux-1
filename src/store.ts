import { configureStore } from '@reduxjs/toolkit'
import analyticsReducer from './reducers/analyticsReducer'
import { useDispatch } from 'react-redux'

export const store = configureStore({
    reducer: {
        analytics: analyticsReducer
    }
})
  
// Get the type of our store variable
export type AppStore = typeof store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
