import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoggedIn: false
}

const authslice = createSlice({
  name: "auth",
  initialState,
  reducers: {}
});

export const {} = authslice.actions;
export default authslice.reducer;