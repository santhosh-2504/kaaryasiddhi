import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    isAuthenticated: false,
    user: {
      name: "",
      email: "",
      phone: "",
      currentLevel: 0,
      streak: 0,
      isStreakFrozen: false,
      parentPhone: "",
      createdAt: null,
    },
    error: null,
    message: null,
    downloadMessage: null,
    // Add OTP-related states
    otpLoading: false,
    otpSent: false,
    passwordResetLoading: false,
    // Add submission-related states
    submissionLoading: {},
    submissions: {},
    submissionError: null,
  },
  reducers: {
    // Registration reducers
    registerRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    registerSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.error = null;
      state.message = action.payload.message;
    },
    registerFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {
        name: "",
        email: "",
        phone: "",
        currentLevel: 0,
        streak: 0,
        isStreakFrozen: false,
        parentPhone: "",
        createdAt: null,
      };
      state.error = action.payload;
      state.message = null;
    },

    // Login reducers
    loginRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.error = null;
      state.message = action.payload.message;
    },
    loginFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    // Fetch user reducers
    fetchUserRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchUserSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    fetchUserFailed(state, action) {
      state.loading = false;
      // Only update these states if not on login/register pages
      if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
        state.isAuthenticated = false;
        state.user = {
          name: "",
          email: "",
          phone: "",
          currentLevel: 0,
          streak: 0,
          isStreakFrozen: false,
          parentPhone: "",
          createdAt: null,
        };
        state.error = action.payload;
      }
    },

    // Logout reducers
    logoutSuccess(state) {
      state.isAuthenticated = false;
      state.user = {
        name: "",
        email: "",
        phone: "",
        currentLevel: 0,
        streak: 0,
        isStreakFrozen: false,
        parentPhone: "",
        createdAt: null,
      };
      state.error = null;
      state.message = null;
    },
    logoutFailed(state, action) {
      state.error = action.payload;
    },
    // Streak freeze reducers
    freezeStreakRequest(state) {
      state.loading = true;
      state.error = null;
    },
    freezeStreakSuccess(state, action) {
      state.loading = false;
      state.user.isStreakFrozen = action.payload.isStreakFrozen;
      state.message = action.payload.message;
      state.error = null;
    },
    freezeStreakFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // Password reset OTP reducers
    sendOTPRequest(state) {
      state.otpLoading = true;
      state.error = null;
      state.otpSent = false;
    },
    sendOTPSuccess(state, action) {
      state.otpLoading = false;
      state.otpSent = true;
      state.message = action.payload.message;
      state.error = null;
    },
    sendOTPFailed(state, action) {
      state.otpLoading = false;
      state.otpSent = false;
      state.error = action.payload;
    },

    // Reset password reducers
    resetPasswordRequest(state) {
      state.passwordResetLoading = true;
      state.error = null;
    },
    resetPasswordSuccess(state, action) {
      state.passwordResetLoading = false;
      state.message = action.payload.message;
      state.error = null;
      state.otpSent = false;
    },
    resetPasswordFailed(state, action) {
      state.passwordResetLoading = false;
      state.error = action.payload;
    },

    // Task submission reducers
    submitTaskRequest(state, action) {
      const taskId = action.payload;
      state.submissionLoading[taskId] = true;
      state.submissionError = null;
    },
    submitTaskSuccess(state, action) {
      const { taskId, submission } = action.payload;
      state.submissionLoading[taskId] = false;
      state.submissions[taskId] = submission;
      state.submissionError = null;
      state.message = "Task submitted successfully!";
    },
    submitTaskFailed(state, action) {
      const { taskId, error } = action.payload;
      state.submissionLoading[taskId] = false;
      state.submissionError = error;
    },

    // Fetch submissions reducers
    fetchSubmissionsRequest(state) {
      state.loading = true;
    },
    fetchSubmissionsSuccess(state, action) {
      state.loading = false;
      // Convert array to object with taskId as key
      const submissionsObj = {};
      action.payload.forEach(submission => {
        // Use submission.taskId._id if populated, else submission.taskId
        const taskId = submission.taskId?._id || submission.taskId;
        submissionsObj[taskId] = submission;
      });
      state.submissions = { ...state.submissions, ...submissionsObj };
    },
    fetchSubmissionsFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // Utility reducers
    resetAuthErrors(state) {
      state.error = null;
      state.message = null;
    },
    clearAllErrors(state) {
      state.error = null;
      state.message = null;
    },
    resetOTPState(state) {
      state.otpSent = false;
      state.otpLoading = false;
    },
    clearSubmissionError(state) {
      state.submissionError = null;
    },
  },
});

// Action creators
export const register = (data) => async (dispatch) => {
  dispatch(userSlice.actions.registerRequest());
  try {
    const response = await axios.post(
      "/api/auth/register",
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(userSlice.actions.registerSuccess(response.data));
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Registration Failed";
    dispatch(userSlice.actions.registerFailed(errorMessage));
  }
};

export const login = (data) => async (dispatch) => {
  dispatch(userSlice.actions.loginRequest());
  try {
    const response = await axios.post(
      "/api/auth/login",
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(userSlice.actions.loginSuccess(response.data));
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Login failed";
    dispatch(userSlice.actions.loginFailed(errorMessage));
  }
};

export const getUser = () => async (dispatch) => {
  dispatch(userSlice.actions.fetchUserRequest());
  try {
    const response = await axios.get(
      "/api/auth/me",
      {
        withCredentials: true,
      }
    );
    dispatch(userSlice.actions.fetchUserSuccess(response.data.user));
  } catch (error) {
    dispatch(userSlice.actions.fetchUserFailed(error.response?.data?.message));
  }
};

export const logout = () => async (dispatch) => {
  try {
    await axios.get(
      "/api/auth/logout",
      {
        withCredentials: true,
      }
    );
    dispatch(userSlice.actions.logoutSuccess());
  } catch (error) {
    dispatch(userSlice.actions.logoutFailed(error.response?.data?.message));
  }
};

export const freezeStreak = () => async (dispatch) => {
  dispatch(userSlice.actions.freezeStreakRequest());
  try {
    const response = await axios.put(
      "/api/user/freeze-streak",
      {},
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(userSlice.actions.freezeStreakSuccess(response.data));
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Failed to freeze streak";
    dispatch(userSlice.actions.freezeStreakFailed(errorMessage));
  }
};

// Password reset action creators
export const sendPasswordResetOTP = (email) => async (dispatch) => {
  dispatch(userSlice.actions.sendOTPRequest());
  try {
    const response = await axios.post(
      "/api/auth/send-reset-otp",
      { email },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(userSlice.actions.sendOTPSuccess(response.data));
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Failed to send OTP";
    dispatch(userSlice.actions.sendOTPFailed(errorMessage));
  }
};

export const resetPassword = (resetData) => async (dispatch) => {
  dispatch(userSlice.actions.resetPasswordRequest());
  try {
    const response = await axios.post(
      "/api/auth/reset-password",
      resetData,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(userSlice.actions.resetPasswordSuccess(response.data));
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Failed to reset password";
    dispatch(userSlice.actions.resetPasswordFailed(errorMessage));
  }
};

// Task submission action creators
export const submitTask = (taskId, levelNumber, submissionLink) => async (dispatch) => {
  dispatch(userSlice.actions.submitTaskRequest(taskId));
  try {
    const response = await axios.post(
      "/api/auth/submit",
      {
        taskId,
        levelNumber,
        submissionLink,
      },
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(userSlice.actions.submitTaskSuccess({
      taskId,
      submission: response.data.data,
    }));
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Failed to submit task";
    dispatch(userSlice.actions.submitTaskFailed({
      taskId,
      error: errorMessage,
    }));
  }
};

export const fetchSubmissions = () => async (dispatch) => {
  dispatch(userSlice.actions.fetchSubmissionsRequest());
  try {
    const response = await axios.get(
      "/api/auth/submissions",
      {
        withCredentials: true,
      }
    );
    dispatch(userSlice.actions.fetchSubmissionsSuccess(response.data.data));
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Failed to fetch submissions";
    dispatch(userSlice.actions.fetchSubmissionsFailed(errorMessage));
  }
};

// Export all action creators and reducers
export const {
  resetAuthErrors,
  clearAllErrors: clearAllUserErrors,
  resetOTPState,
  clearSubmissionError,
} = userSlice.actions;

export { userSlice };
export default userSlice.reducer;