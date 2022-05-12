import { createAsyncThunk } from "@reduxjs/toolkit";
import CHAT_API from "../../../api/chat";

export const updateGroupChat = createAsyncThunk(
  "chat/updateGroupChat",
  async ({ token, chatId, chatData }, thunkApi) => {
    const data = await CHAT_API.updateGroupChat(token, chatId, chatData);
    return data;
  }
);
