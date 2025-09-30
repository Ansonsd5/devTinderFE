import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOtpModalOpen: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    openOtpModal: (state) => {
      state.isOtpModalOpen = true;
    },
    closeOtpModal: (state) => {
      state.isOtpModalOpen = false;
    },
    toggleOtpModal: (state) => {
      state.isOtpModalOpen = !state.isOtpModalOpen;
    },
  },
});

export const { openOtpModal, closeOtpModal, toggleOtpModal } = appSlice.actions;
export default appSlice.reducer;
