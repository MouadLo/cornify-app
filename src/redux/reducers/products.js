import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {API} from "aws-amplify";
import {useDispatch} from "react-redux";

const initialState = {
  products: [],
  loading: false,
  status: null,
  error: null,
  loadingDelete: false,
  statusDelete: null,
  errorDelete: null,
  loadingCreate: false,
  statusCreate: null,
  errorCreate: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getProductsStart(state) {
      state.products = [];
      state.loading = true;
      state.error = null;
    },
    getProductsSuccess(state, action) {
      state.loading = false;
      state.products = action.payload;
      state.error = null;
    },
    getProductsFailure(state, action) {
      state.loading = false;
      state.products = [];
      state.error = action.payload;
    },
    createProductStart: (state) => {
      state.statusCreate = "loading";
      state.loadingCreate = true;
      state.errorCreate = null;
    },
    createProductSuccess: (state) => {
      state.loadingCreate = false;
      state.statusCreate = "succeeded";
    },
    createProductFailure: (state, action) => {
      state.loadingCreate = false;
      console.log(action.payload);
      state.errorCreate = action.payload;
      state.statusCreate = "failed";
    },
    deleteProductStart: (state) => {
      state.loadingDelete = true;
      state.statusDelete = "loading";
      state.errorDelete = null;
    },
    deleteProductSuccess: (state) => {
      state.statusDelete = "succeeded";
      state.loadingDelete = false;
      state.errorDelete = null;
    },
    deleteProductFailure: (state, action) => {
      state.statusDelete = "failed";
      state.loadingDelete = false;
      state.errorDelete = action.error;
    },
  },
});

/* export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (product) => {
    try {
      // const dispatch = useDispatch();
      console.log("start delete product" + product.id + product.category);
      const response = await API.delete(
        "products",
        `/products/${product.id}/${product.category}`,
        {
          headers: {}, // OPTIONAL
        }
      );
      //  dispatch(fetchProducts());
      console.log("delete product successfuly", response);
      return response;
    } catch (error) {
      return error;
    }
  }
); */
export const deleteProduct = (product) => async (dispatch) => {
  try {
    dispatch(deleteProductStart());
    console.log("start delete product" + product.id + product.category);
    const response = await API.del(
      "products",
      `/products/${product.id}/${product.category}`,
      {
        headers: {}, // OPTIONAL
      }
    );

    console.log("delete product successfuly", response);
    dispatch(deleteProductSuccess());
    dispatch(fetchProducts());
    return response;
  } catch (error) {
    console.log("delete product failed " + JSON.stringify(error.response.data));
    dispatch(deleteProductFailure(error.message));
    return error;
  }
};
export const createProduct = (product, navigation) => async (dispatch) => {
  try {
    dispatch(createProductStart());
    const newProduct = await API.post("products", "/products", {body: product});
    dispatch(createProductSuccess());
    navigation.navigate("ProductList");
    return newProduct;
  } catch (error) {
    console.log(error.response.data.error);
    dispatch(createProductFailure(error.response.data.error));
    throw error;
  }
};

export const fetchProducts = () => async (dispatch) => {
  dispatch(getProductsStart());
  try {
    console.log("fetch products actions");
    const products = await API.get("products", "/products", {
      responseType: "json",
    });
    //console.log(products);
    dispatch(getProductsSuccess(products));
    console.log("fetch products actions end");
  } catch (error) {
    console.log("fetch products actions error");
    console.log(error);
    dispatch(getProductsFailure(error));
  }
};

export const {
  getProductsStart,
  getProductsSuccess,
  getProductsFailure,
  createProductStart,
  createProductSuccess,
  createProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure,
} = productsSlice.actions;

export default productsSlice.reducer;
