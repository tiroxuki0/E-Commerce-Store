import { createSlice } from "@reduxjs/toolkit";

export const commonSlice = createSlice({
  name: "commonSlice",
  initialState: {
    orderDetails: {
      id: "",
      step: 0,
      shippingAddress: {
        firstName: "",
        lastName: "",
        address1: "",
        address2: "",
        city: "",
        province: "",
        zipCode: "",
        country: "",
      },
      paymentDetails: {
        cardName: "",
        cardNumber: "",
        expDate: "",
        cvv: "",
      },
    },
    isFormOpen: false,
    isCheckOut: false,
    isUserInfo: false,
    formUserInfo: "",
    isSearchOpen: false,
    searchResults: [],
    pending: false,
  },
  reducers: {
    setOrderDetails: (state, action) => {
      /* (type, field, value) */
      if (action.payload.type === "shippingAddress") {
        switch (action.payload.field) {
          case "firstName":
            state.orderDetails.shippingAddress.firstName = action.payload.value;
            break;
          case "lastName":
            state.orderDetails.shippingAddress.lastName = action.payload.value;
            break;
          case "address1":
            state.orderDetails.shippingAddress.address1 = action.payload.value;
            break;
          case "address2":
            state.orderDetails.shippingAddress.address2 = action.payload.value;
            break;
          case "city":
            state.orderDetails.shippingAddress.city = action.payload.value;
            break;
          case "province":
            state.orderDetails.shippingAddress.province = action.payload.value;
            break;
          case "zipCode":
            state.orderDetails.shippingAddress.zipCode = action.payload.value;
            break;
          case "country":
            state.orderDetails.shippingAddress.country = action.payload.value;
            break;
          default:
            console.log("error");
        }
      } else {
        switch (action.payload.field) {
          case "cardName":
            state.orderDetails.paymentDetails.cardName = action.payload.value;
            break;
          case "cardNumber":
            state.orderDetails.paymentDetails.cardNumber = action.payload.value;
            break;
          case "expDate":
            state.orderDetails.paymentDetails.expDate = action.payload.value;
            break;
          case "cvv":
            state.orderDetails.paymentDetails.cvv = action.payload.value;
            break;
          default:
            console.log("error");
        }
      }
    },
    clearOrderDetails: (state) => {
      state.orderDetails = {
        id: "",
        step: 0,
        shippingAddress: {
          firstName: "",
          lastName: "",
          address1: "",
          address2: "",
          city: "",
          province: "",
          zipCode: "",
          country: "",
        },
        paymentDetails: {
          cardName: "",
          cardNumber: "",
          expDate: "",
          cvv: "",
        },
      };
    },
    setIdOrder: (state, action) => {
      state.orderDetails = { ...state.orderDetails, id: action.payload };
    },
    setActiveStep: (state, action) => {
      state.orderDetails = { ...state.orderDetails, step: action.payload };
    },
    signUpStart: (state) => {
      state.pending = true;
    },
    signUpEnd: (state) => {
      state.pending = false;
    },
    toggleForm: (state, action) => {
      state.isFormOpen = action.payload;
    },
    toggleCheckOut: (state, action) => {
      state.isCheckOut = action.payload;
    },
    toggleUserInfo: (state, action) => {
      state.isUserInfo = action.payload;
    },
    setFormUserInfo: (state, action) => {
      state.formUserInfo = action.payload;
    },
    toggleSearch: (state, action) => {
      state.isSearchOpen = action.payload;
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
    setUserAvatar: (state, action) => {
      state.formUserInfo.photoURL = action.payload;
    },
    setUsername: (state, action) => {
      state.formUserInfo.username = action.payload;
    },
    setEmail: (state, action) => {
      state.formUserInfo.email = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  clearOrderDetails,
  setIdOrder,
  setOrderDetails,
  setActiveStep,
  toggleForm,
  setFormUserInfo,
  toggleSearch,
  toggleCheckOut,
  toggleUserInfo,
  setUserAvatar,
  setUsername,
  setEmail,
  setSearchResults,
  signUpStart,
  signUpEnd,
} = commonSlice.actions;

export default commonSlice.reducer;
