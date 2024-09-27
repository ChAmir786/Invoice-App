import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  senderStreet: "",
  senderCity: "",
  senderPostCode: "",
  senderCountry: "",
  clientName: "",
  clientEmail: "",
  clientStreet: "",
  clientCity: "",
  clientPostCode: "",
  clientCountry: "",
  description: "",
  items: [{ itemName: "", quantity: 1, price: 0 }],
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateForm: (state, action) => {
      return { ...state, ...action.payload }; // Merge the updated form data with the current state
    },
    addItem: (state) => {
      state.items.push({ itemName: "", quantity: 1, price: 0 }); // Add a new empty item
    },
    removeItem: (state, action) => {
      state.items.splice(action.payload, 1); // Remove the item at the specified index
    },
    updateItem: (state, action) => {
      const { index, data } = action.payload;
      state.items[index] = { ...state.items[index], ...data }; // Update a specific item by index
    },
  },
});

export const { updateForm, addItem, removeItem, updateItem } = formSlice.actions;
export default formSlice.reducer;
