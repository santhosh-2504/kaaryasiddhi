import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const levelTaskSlice = createSlice({
  name: "levelTasks",
  initialState: {
    tasksByLevel: {}, // Stores tasks for each levelNumber
    loadingLevels: [], // Tracks loading states for each levelNumber
    error: null,
    message: null,
  },
  reducers: {
    // Fetch tasks
    fetchTasksRequest(state, action) {
      const levelNumber = action.payload;
      if (!state.loadingLevels.includes(levelNumber)) {
        state.loadingLevels.push(levelNumber);
      }
      state.error = null;
    },
    fetchTasksSuccess(state, action) {
      const { levelNumber, tasks } = action.payload;
      state.tasksByLevel[levelNumber] = tasks;
      state.loadingLevels = state.loadingLevels.filter(
        (lvl) => lvl !== levelNumber,
      );
    },
    fetchTasksFailed(state, action) {
      const { levelNumber, error } = action.payload;
      state.loadingLevels = state.loadingLevels.filter(
        (lvl) => lvl !== levelNumber,
      );
      state.error = error;
    },

    // Optional: For future notifications
    setMessage(state, action) {
      state.message = action.payload;
    },

    // Clear errors
    clearTaskErrors(state) {
      state.error = null;
    },
  },
});

export const {
  fetchTasksRequest,
  fetchTasksSuccess,
  fetchTasksFailed,
  setMessage,
  clearTaskErrors,
} = levelTaskSlice.actions;

export const fetchTasksByLevel = (levelNumber) => async (dispatch) => {
  dispatch(fetchTasksRequest(levelNumber));
  try {
    const response = await axios.get(`/api/task/${levelNumber}`, {
      headers: { "Content-Type": "application/json" },
    });

    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to fetch tasks");
    }

    dispatch(fetchTasksSuccess({ levelNumber, tasks: response.data.data }));
  } catch (error) {
    console.error(`Error fetching tasks for level ${levelNumber}:`, error);
    const errorMessage =
      error.response?.data?.message || error.message || "Failed to fetch tasks";
    dispatch(fetchTasksFailed({ levelNumber, error: errorMessage }));
  }
};

export default levelTaskSlice.reducer;
