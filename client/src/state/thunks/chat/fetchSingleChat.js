import { createAsyncThunk } from "@reduxjs/toolkit";
import CHAT_API from "../../../api/chat";

export const fetchSingleChat = createAsyncThunk(
  "chat/fetchSingleChat",
  async ({ token, chatId }, thunkApi) => {
    const data = await CHAT_API.fetchSingleChat(token, chatId);
    return data;
  }
);
