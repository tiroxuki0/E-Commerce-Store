import { createSlice } from "@reduxjs/toolkit";
import { checkCartUser } from "../firebase/service";

export const cartSlice = createSlice({
  name: "cartSlice",
  initialState: {
    cartItems: [],
    pendingCart: true,
    totalAmount: null,
    originalPrice: null,
    discount: null,
    delivery: "free",
  },
  reducers: {
    setTotalAmount: (state, action) => {
      state.totalAmount = action.payload;
    },
    setOriginalPrice: (state, action) => {
      state.originalPrice = action.payload;
    },
    setDiscount: (state, action) => {
      state.discount = action.payload;
    },
    setDelivery: (state, action) => {
      state.delivery = action.payload.trim();
    },
    clearAll: (state) => {
      state.cartItems = [];
      state.totalAmount = null;
      state.originalPrice = null;
      state.discount = null;
      state.delivery = "free";
    },
    getCartItemsStart: (state) => {
      state.pendingCart = true;
    },
    getCartItemsEnd: (state) => {
      state.pendingCart = false;
    },
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
    },
    addItem: (state, action) => {
      const newItemId = action.payload.product.id;
      const itemExist = state.cartItems.some((item) => item.id === newItemId);

      let updatedCartItems = null;

      if (itemExist) {
        updatedCartItems = state.cartItems.map((item) => {
          if (item.id === newItemId) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }
          return item;
        });
      } else {
        updatedCartItems = [...state.cartItems, action.payload.product];
      }

      state.cartItems = updatedCartItems;
      checkCartUser(action.payload.uid, updatedCartItems);
    },
    removeItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },
    incrementItem: (state, action) => {
      state.cartItems = state.cartItems.map((item) => {
        if (item.id === action.payload) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });
    },
    decrementItem: (state, action) => {
      state.cartItems = state.cartItems
        .map((item) => {
          if (item.id === action.payload) {
            return {
              ...item,
              quantity: item.quantity - 1,
            };
          }
          return item;
        })
        .filter((item) => item.quantity !== 0);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  clearAll,
  addItem,
  removeItem,
  incrementItem,
  decrementItem,
  getCartItemsStart,
  getCartItemsEnd,
  setCartItems,
  setTotalAmount,
  setOriginalPrice,
  setDiscount,
  setDelivery,
} = cartSlice.actions;

export default cartSlice.reducer;
