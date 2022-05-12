import { createAsyncThunk } from "@reduxjs/toolkit";
import CHAT_API from "../../../api/chat";

export const fetchMessages = createAsyncThunk(
  "chat/fetchMessages",
  async ({ token, chatId }, thunkApi) => {
    const data = await CHAT_API.fetchSingleChatMessages(token, chatId);
    return data;
  }
);
