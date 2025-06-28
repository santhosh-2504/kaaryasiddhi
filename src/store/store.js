import { configureStore } from "@reduxjs/toolkit";

import userReducer from "@/store/slices/userSlice";
import updateProfileReducer from "@/store/slices/updateProfileSlice";
import resourceReducer from "@/store/slices/resourceSlice";
import levelTaskReducer from "@/store/slices/levelTaskSlice";
import submissionReducer from "@/store/slices/submissionSlice";
import dashboardReducer from "@/store/slices/dashboardSlice";
import chatReducer from "@/store/slices/chatSlice";
import practiceReducer from "@/store/slices/practiceSlice";
import paymentReducer from "@/store/slices/paymentSlice";


export const store = configureStore({
  reducer: {
    user: userReducer,
    updateProfile: updateProfileReducer,
    resources: resourceReducer,
    levelTasks: levelTaskReducer,
    submissions: submissionReducer,
    dashboard: dashboardReducer,
    chat: chatReducer,
    practice: practiceReducer,
    payment: paymentReducer,

  },
});

export default store;