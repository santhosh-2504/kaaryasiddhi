import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async (userMessage, { dispatch, getState }) => {
    dispatch(addUserMessage(userMessage));

    const { messages } = getState().chat;

    const res = await fetch("/api/ai/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages }),
    });

    const data = await res.json();
    return {
      aiReply: data.reply,
    };
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [], // Array of { role: "user"/"assistant", content: "..." }
    loading: false,
  },
  reducers: {
    addUserMessage: (state, action) => {
      state.messages.push({ role: "user", content: action.payload });
    },
    resetChat: (state) => {
      state.messages = [];
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messages.push({ role: "assistant", content: action.payload.aiReply });
        state.loading = false;
      })
      .addCase(sendMessage.rejected, (state) => {
        state.messages.push({ role: "assistant", content: "Sorry, something went wrong. Please try again." });
        state.loading = false;
      });
  },
});

export const { addUserMessage, resetChat } = chatSlice.actions;
export default chatSlice.reducer;
