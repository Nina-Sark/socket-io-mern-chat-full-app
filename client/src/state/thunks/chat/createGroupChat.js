import { createAsyncThunk } from "@reduxjs/toolkit";
import CHAT_API from "../../../api/chat";

export const createGroupChat = createAsyncThunk(
  "chat/createGroupChat",
  async ({ token, chatData }, thunkApi) => {
    const data = await CHAT_API.createGroupChat(token, chatData);
    return data;
  }
);