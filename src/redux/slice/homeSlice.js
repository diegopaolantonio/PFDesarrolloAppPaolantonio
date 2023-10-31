import { createSlice } from "@reduxjs/toolkit";

export const homeSlice = createSlice({
  name: "home",
  initialState: {
    allCategories: "",
    allProducts: "",
    categorySelected: "",
    productSelected: [],
  },
  reducers: {
    setAllCategories: (state, action) => {
      state.allCategories = action.payload;
    },
    setAllProducts: (state, action) => {
      state.allProducts = action.payload;
    },
    setCategorySelected: (state, action) => {
      state.categorySelected = action.payload;

      if (state.categorySelected != "" && state.categorySelected != "all") {
        state.productsFilter = state.allProducts.filter(
          (element) => element.category === state.categorySelected
        );
      } else {
        state.productsFilter = state.allProducts;
      }
    },
    setProductSelected: (state, action) => {
      state.productSelected = action.payload;
    },
  },
});

export const {
  setAllCategories,
  setAllProducts,
  setCategorySelected,
  setProductSelected,
} = homeSlice.actions;

export default homeSlice.reducer;
