import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchResources = createAsyncThunk("resources/fetchAll", async () => {
  const res = await axios.get("/api/resource/all");
  return res.data.data;
});

const resourceSlice = createSlice({
  name: "resources",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    searchQuery: "",
    filterType: "",
    filterLevel: ""
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setFilterType: (state, action) => {
      state.filterType = action.payload;
    },
    setFilterLevel: (state, action) => {
      state.filterLevel = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchResources.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchResources.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchResources.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  }
});

export const { setSearchQuery, setFilterType, setFilterLevel } = resourceSlice.actions;
export default resourceSlice.reducer;
