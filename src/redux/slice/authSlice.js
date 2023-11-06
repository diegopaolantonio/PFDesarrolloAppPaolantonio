import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    user: null,
    uid: null,
    idToken: null,
    userData: null,
    userClients: null,
    client: null,
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
    setUserClients: (state, action) => {
      state.userClients = action.payload;
    },
    setClient: (state, action) => {
      state.client = action.payload;
    },
    setProject: (state, action) => {
      state.project = action.payload;
    },
    clearUser: (state, action) => {
      (state.user = null),
        (state.uid = null),
        (state.idToken = null),
        (state.userData = null),
        (state.userClients = null),
        (state.client = null),
        (state.paoject = null);
    },
  },
});

export const {
  setUser,
  setIdToken,
  setUid,
  setUserData,
  setUserClients,
  setClient,
  setProject,
  clearUser,
} = authSlice.actions;

export default authSlice.reducer;
