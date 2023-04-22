import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {API} from "aws-amplify";

export const fetchCustomers = createAsyncThunk(
  "customers/fetchCustomers",
  async () => {
    try {
      console.log("start fetchCustomers");
      const response = await API.get("products", "/customers");
      console.log("end fetchCustomers");
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const addCustomer = createAsyncThunk(
  "customers/addCustomer",
  async (customer) => {
    try {
      console.log("start addCustomer");
      const response = await API.post("products", "/customers", {
        body: customer,
      });
      console.log("end addCustomer");
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const deleteCustomer = createAsyncThunk(
  "customers/deleteCustomer",
  async (customer) => {
    try {
      console.log("start deleteCustomerr");
      console.log(customer.id);
      const response = await API.del("products", `/customers/${customer.id}`);
      console.log(customer.id);
      console.log("end deleteCustomer");
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);
const customersSlice = createSlice({
  name: "customers",
  initialState: {
    customersList: [],
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.customersList = action.payload;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addCustomer.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addCustomer.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.customersList.push(action.payload);
      })
      .addCase(addCustomer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteCustomer.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.customersList = state.customersList.filter(
          (customer) => customer.id !== action.payload
        );
      })
      .addCase(deleteCustomer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default customersSlice.reducer;
