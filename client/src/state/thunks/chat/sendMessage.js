import { createAsyncThunk } from "@reduxjs/toolkit";
import CHAT_API from "../../../api/chat";

export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async ({ token, messageContent, chatId }, thunkApi) => {
    const data = await CHAT_API.sendMessage(token, messageContent, chatId);
    return data;
  }
);
