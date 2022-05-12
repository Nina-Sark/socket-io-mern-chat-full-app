import { createAsyncThunk } from "@reduxjs/toolkit";
import CHAT_API from "../../../api/chat";

export const deleteChat = createAsyncThunk(
  "chat/deleteChat",
  async ({ token, chatId }, thunkApi) => {
    const data = await CHAT_API.deleteChat(token, chatId);
    return data;
  }
);