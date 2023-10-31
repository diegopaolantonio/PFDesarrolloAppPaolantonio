import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    user: null,
    uid: null,
    idToken: null,
    userData: null,
  },

  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setIdToken: (state, action) => {
      state.idToken = action.payload;
    },
    setUid: (state, action) => {
      state.uid = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    clearUser: (state, action) => {
      (state.user = null),
        (state.uid = null),
        (state.idToken = null),
        (state.userData = null);
    },
  },
});

export const { setUser, setIdToken, setUid, setUserData, clearUser } =
  authSlice.actions;

export default authSlice.reducer;
