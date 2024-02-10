import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auth: null,
  cart_id: null,
};
const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    Login: (state, action) => {
      state.auth = action.payload;
    },
    Logout: (state, action) => {
      state.auth = null;
      state.cart_id = null;
    },
    AddCart: (state, action) => {
      state.cart_id = action.payload;
    },
  },
});

export const { Login, Logout, AddCart } = counterSlice.actions;
export default counterSlice.reducer;
