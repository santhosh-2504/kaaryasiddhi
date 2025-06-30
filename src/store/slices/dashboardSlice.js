import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk to fetch admin dashboard data with filters
export const fetchDashboardData = createAsyncThunk(
  "dashboard/fetchData",
  async (filters = {}, thunkAPI) => {
    try {
      const { days = 7, search = "", level = null } = filters;

      // Build query parameters
      const params = new URLSearchParams();
      params.append("days", days.toString());

      if (search && search.trim()) {
        params.append("search", search.trim());
      }

      if (level !== null && level !== undefined && level !== "") {
        params.append("level", level.toString());
      }

      const response = await axios.get(
        `/api/auth/dashboard?${params.toString()}`,
      );
      return {
        data: response.data.data,
        metadata: response.data.metadata,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Something went wrong",
      );
    }
  },
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    data: [],
    metadata: null,
    loading: false,
    error: null,
    // Store current filter state
    filters: {
      days: 7,
      search: "",
      level: null,
    },
  },
  reducers: {
    clearDashboard: (state) => {
      state.data = [];
      state.metadata = null;
      state.loading = false;
      state.error = null;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        days: 7,
        search: "",
        level: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.metadata = action.payload.metadata;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load dashboard data";
      });
  },
});

export const { clearDashboard, setFilters, clearFilters } =
  dashboardSlice.actions;
export default dashboardSlice.reducer;
