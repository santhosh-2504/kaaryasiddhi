import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch all pending submissions
export const fetchPendingSubmissions = createAsyncThunk(
  "submission/fetchPending",
  async (_, { rejectWithValue, getState }) => {
    try {
      // Check if user is admin before making API call
      const { user } = getState().user;
      if (!user || user.role !== "admin") {
        throw new Error("Access denied: Admins only");
      }

      const response = await fetch("/api/submission/pending", {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Failed to fetch submissions");
      }

      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to update submission status
export const updateSubmissionStatus = createAsyncThunk(
  "submission/updateStatus",
  async (submissionData, { rejectWithValue, getState }) => {
    try {
      // Check if user is admin before making API call
      const { user } = getState().user;
      if (!user || user.role !== "admin") {
        throw new Error("Access denied: Admins only");
      }

      const { submissionId, status, score, remarks } = submissionData;

      const response = await fetch("/api/submission/update-status", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          submissionId,
          status,
          score,
          remarks,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Failed to update submission");
      }

      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const submissionSlice = createSlice({
  name: "submission",
  initialState: {
    submissions: [],
    loading: false,
    error: null,
    updateLoading: {},
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setUpdateLoading: (state, action) => {
      const { submissionId, loading } = action.payload;
      state.updateLoading[submissionId] = loading;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch pending submissions
      .addCase(fetchPendingSubmissions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPendingSubmissions.fulfilled, (state, action) => {
        state.loading = false;
        state.submissions = action.payload;
      })
      .addCase(fetchPendingSubmissions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update submission status
      .addCase(updateSubmissionStatus.pending, (state, action) => {
        const submissionId = action.meta.arg.submissionId;
        state.updateLoading[submissionId] = true;
        state.error = null;
      })
      .addCase(updateSubmissionStatus.fulfilled, (state, action) => {
        const updatedSubmission = action.payload;
        state.updateLoading[updatedSubmission._id] = false;
        
        // Remove the updated submission from the list since it's no longer pending
        state.submissions = state.submissions.filter(
          (submission) => submission._id !== updatedSubmission._id
        );
      })
      .addCase(updateSubmissionStatus.rejected, (state, action) => {
        const submissionId = action.meta.arg?.submissionId;
        if (submissionId) {
          state.updateLoading[submissionId] = false;
        }
        state.error = action.payload;
      });
  },
});

export const { clearError, setUpdateLoading } = submissionSlice.actions;
export default submissionSlice.reducer;