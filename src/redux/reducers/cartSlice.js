import {createSlice} from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
  },
  reducers: {
    addItem: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex !== -1) {
        state.cartItems[itemIndex].quantity += action.payload.quantity;
      } else {
        state.cartItems.push(action.payload);
      }
    },
    updateItemQuantity: (state, action) => {
      const {id, quantity} = action.payload;
      if (typeof Number(quantity) == "number" && !isNaN(Number(quantity))) {
        const itemIndex = state.cartItems.findIndex((item) => item.id === id);
        console.log(`updateItemQuantity ${id}  +  ${quantity}`);
        if (itemIndex !== -1) {
          state.cartItems[itemIndex].quantity = Number(quantity);
        }
      } else {
        const itemIndex = state.cartItems.findIndex((item) => item.id === id);
        console.log("updateItemQuantity" + id + quantity);
        if (itemIndex !== -1) {
          state.cartItems[itemIndex].quantity = 0;
        }
      }
    },
    removeItem: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex !== -1) {
        state.cartItems.splice(itemIndex, 1);
      }
    },
    clearCart: () => (state.cartItems = []),
  },
});

export const {addItem, removeItem, clearCart, updateItemQuantity} =
  cartSlice.actions;

export default cartSlice.reducer;
