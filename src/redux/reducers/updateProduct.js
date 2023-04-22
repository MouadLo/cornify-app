import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {API} from "aws-amplify";

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({productID, updatedProduct}, {getState, rejectWithValue}) => {
    // const {auth} = getState();
    // const {idToken} = auth.tokens;

    console.log("Update product");
    console.log(productID, updatedProduct);
    try {
      const response = await API.put("products", `/products/${productID}`, {
        body: updatedProduct,
      });

      return response;
    } catch (error) {
      console.error(error.message);
      return rejectWithValue(error.response.data);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const updatedProduct = action.payload;
        const index = state.products.findIndex(
          (product) => product.id === updatedProduct.id
        );

        state.products[index] = updatedProduct;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      });
  },
});

export default productSlice.reducer;
