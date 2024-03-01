import { createSlice } from '@reduxjs/toolkit';


export const sideBarSlice = createSlice({
  name: 'sidebar',
  initialState: {
    sidebarOpen: false,
  },
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
  }
})

export const { reducer } = sideBarSlice;
export const { toggleSidebar} = sideBarSlice.actions
