import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch pending payments
export const fetchPendingPayments = createAsyncThunk(
  "payment/fetchPending",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/payments/pending");
      return data.payments;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch payments",
      );
    }
  },
);

// Approve payment
export const approvePayment = createAsyncThunk(
  "payment/approve",
  async (paymentId, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/payments/approve", { paymentId });
      return { paymentId, message: data.message };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to approve payment",
      );
    }
  },
);

// Reject payment
export const rejectPayment = createAsyncThunk(
  "payment/reject",
  async (paymentId, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete("/api/payments/reject", {
        data: { paymentId },
      });
      return { paymentId, message: data.message };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to reject payment",
      );
    }
  },
);

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    payments: [],
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearPaymentErrors: (state) => {
      state.error = null;
    },
    clearPaymentSuccess: (state) => {
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPendingPayments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPendingPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.payments = action.payload;
      })
      .addCase(fetchPendingPayments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(approvePayment.fulfilled, (state, action) => {
        state.payments = state.payments.filter(
          (p) => p._id !== action.payload.paymentId,
        );
        state.successMessage = action.payload.message;
      })
      .addCase(approvePayment.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(rejectPayment.fulfilled, (state, action) => {
        state.payments = state.payments.filter(
          (p) => p._id !== action.payload.paymentId,
        );
        state.successMessage = action.payload.message;
      })
      .addCase(rejectPayment.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearPaymentErrors, clearPaymentSuccess } = paymentSlice.actions;

export default paymentSlice.reducer;
