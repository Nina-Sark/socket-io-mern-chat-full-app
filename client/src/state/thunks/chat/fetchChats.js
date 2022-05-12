import { createAsyncThunk } from "@reduxjs/toolkit";
import CHAT_API from "../../../api/chat";

export const fetchChats = createAsyncThunk(
  "chat/fetchChats",
  async (token, thunkApi) => {
    const data = await CHAT_API.fetchChats(token);
    return data;
  }
);
