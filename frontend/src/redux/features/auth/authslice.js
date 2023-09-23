import { createSlice } from '@reduxjs/toolkit'
const name = JSON.parse(localStorage.getItem("name"));

const initialState = {
    isLoggedIn: false,
    name: name ? name : "",
    user: {
      name: "",
      email: "",
      phone: "",
      bio: "",
      photo: "",
    },
}

const authslice = createSlice({
  name: "auth",
  initialState,
  reducers: {}
});

export const {} = authslice.actions;
export default authslice.reducer;