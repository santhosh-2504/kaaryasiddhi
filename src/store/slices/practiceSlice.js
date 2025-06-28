// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// export const fetchPotd = createAsyncThunk(
//   "practice/fetchPotd",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get("/api/practice/potd");
//       return response.data.potd;
//     } catch (error) {
//       return rejectWithValue(error.response.data.message || "Failed to fetch POTD");
//     }
//   }
// );

// const practiceSlice = createSlice({
//   name: "practice",
//   initialState: {
//     potd: null,
//     loading: false,
//     error: null,
//     aiHint: "",
//     aiLoading: false,
//   },
//   reducers: {
//     clearHint: (state) => {
//       state.aiHint = "";
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchPotd.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.potd = null;
//       })
//       .addCase(fetchPotd.fulfilled, (state, action) => {
//         state.loading = false;
//         state.potd = action.payload;
//       })
//       .addCase(fetchPotd.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || "Failed to fetch POTD";
//       });
//   },
// });

// export const { clearHint } = practiceSlice.actions;
// export default practiceSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPotd = createAsyncThunk(
  "practice/fetchPotd",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/practice/potd");
      // Fix: API returns { success: true, data: potd }
      return response.data.data; // Changed from response.data.potd
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch POTD");
    }
  }
);

const practiceSlice = createSlice({
  name: "practice",
  initialState: {
    potd: null,
    loading: false,
    error: null,
    aiHint: "",
    aiLoading: false,
  },
  reducers: {
    clearHint: (state) => {
      state.aiHint = "";
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPotd.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPotd.fulfilled, (state, action) => {
        state.loading = false;
        state.potd = action.payload;
        state.error = null;
      })
      .addCase(fetchPotd.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch POTD";
      });
  },
});

export const { clearHint, clearError } = practiceSlice.actions;
export default practiceSlice.reducer;