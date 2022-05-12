import { createAsyncThunk } from "@reduxjs/toolkit";
import CHAT_API from "../../../api/chat";

export const accessChat = createAsyncThunk(
  "chat/accessChat",
  async ({ token, userId }, thunkApi) => {
    const data = await CHAT_API.accessChat(token, userId);
    return data;
  }
);