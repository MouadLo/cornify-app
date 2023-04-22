import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {API} from "aws-amplify";

const initialState = {
  categories: [],
  loading: false,
  status: "idle",
  error: null,
};

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    console.log("Start categories/fetchCategories");
    try {
      const response = await API.get("products", "/category");
      return response;
    } catch (error) {
      console.log("Failed categories/fetchCategories");
      console.log(error);
    }
  }
);

export const createCategory = createAsyncThunk(
  "categories/createCategory",

  async (categoryName, {dispatch}) => {
    try {
      const response = await API.post("products", "/category", {
        body: {name: categoryName},
      });
      dispatch(fetchCategories());
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.status = "loading";
        state.categories = [];
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.categories = [];
        state.error = action.error.message;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        // state.categories.push(action.payload);
      })
      .addCase(createCategory.pending, (state, action) => {
        state.status = "loading";
        state.categories = state.categories;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.status = "failed";
        state.categories = state.categories;
        state.error = action.error.message;
      });
  },
});

export default categoriesSlice.reducer;
