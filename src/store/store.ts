import { useSelector, useDispatch as useDispatchRedux } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import type { TypedUseSelectorHook } from 'react-redux';
import { sideBarSlice } from './sideBarSlice';
import { markdownSlice } from './markdownSlice';

export const store = configureStore({
  reducer: {
    [sideBarSlice.name]: sideBarSlice.reducer,
    [markdownSlice.name]: markdownSlice.reducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: { sidebar: sidebarReducer }
export type ApplicationDispatch = typeof store.dispatch;
export const useDispatch: () => ApplicationDispatch = useDispatchRedux;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
