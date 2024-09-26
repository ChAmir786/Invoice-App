import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  friends: [
    {
      name: '',
      email: '',
    },
  ],
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateForm: (state, action) => {
      return action.payload; // Replace state with the new form data
    },
  },
});

export const { updateForm } = formSlice.actions;
export default formSlice.reducer;
