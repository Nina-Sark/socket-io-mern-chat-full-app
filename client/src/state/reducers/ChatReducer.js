import { createSlice } from "@reduxjs/toolkit";
import { extractError, isError } from "../../utils/extractError";
import { accessChat } from "../thunks/chat/accessChat";
import { createGroupChat } from "../thunks/chat/createGroupChat";
import { deleteChat } from "../thunks/chat/deleteChat";
import { fetchChats } from "../thunks/chat/fetchChats";
import { fetchMessages } from "../thunks/chat/fetchMessages";
import { fetchSingleChat } from "../thunks/chat/fetchSingleChat";
import { sendMessage } from "../thunks/chat/sendMessage";
import { updateGroupChat } from "../thunks/chat/updateGroupChat";

const initialState = {
  chats: [],
  selectedChat: null,
  selectedChatMessages: [],
  fetch_chats_loading: false,
  fetch_single_chat_loading: false,
  fetch_messages_loading: false,
  update_group_chat_loading: false,
  update_group_chat_error: null,
  new_group_chat_loading: false,
  new_group_chat_error: null,
  delete_chat_loading: false,
  access_chat_loading: false,
  sending_message_loading: false,
};

const ChatReducer = createSlice({
  name: "chat",
  initialState,
  reducers: {
    resetChat: (state = initialState, action) => {
      return {
        ...state,
        chats: [],
        selectedChat: null,
        selectedChatMessages: [],
      };
    },
    addNewMessage: (state = initialState, action) => {
      const isTheSameChat =
        action.payload?.message?.chat?._id === state.selectedChat?._id;
      const chatExists = [...state.chats]
        .map((chat) => chat?._id)
        .includes(action.payload?.message?.chat?._id);

      const userChats = chatExists
        ? [...state.chats]
        : [action.payload?.message?.chat, ...state.chats];

      return {
        ...state,
        selectedChatMessages: isTheSameChat
          ? [...state.selectedChatMessages, action.payload?.message]
          : state.selectedChatMessages,
        chats: userChats.map((chat) =>
          chat?._id === action.payload?.message?.chat?._id
            ? { ...chat, latestMessage: action.payload?.message }
            : chat
        ),
      };
    },
    updateChats: (state = initialState, action) => {
      return {
        ...state,
        chats: action.payload,
      };
    },
    clearError: (state = initialState, action) => {
      return {
        ...state,
        [action.payload]: null,
      };
    },
  },
  extraReducers: {
    [fetchChats.pending]: (state = initialState, action) => {
      return {
        ...state,
        fetch_chats_loading: true,
      };
    },
    [fetchChats.fulfilled]: (state = initialState, action) => {
      console.log(action.payload);
      return {
        ...state,
        fetch_chats_loading: false,
        chats: action.payload?.chats,
      };
    },
    [fetchSingleChat.pending]: (state = initialState, action) => {
      return {
        ...state,
        fetch_single_chat_loading: true,
        selectedChat: null,
      };
    },
    [fetchSingleChat.fulfilled]: (state = initialState, action) => {
      console.log(action.payload);
      return {
        ...state,
        fetch_single_chat_loading: false,
        selectedChat: action.payload?.chat,
      };
    },
    [fetchMessages.pending]: (state = initialState, action) => {
      return {
        ...state,
        fetch_messages_loading: true,
        selectedChatMessages: [],
      };
    },
    [fetchMessages.fulfilled]: (state = initialState, action) => {
      return {
        ...state,
        fetch_messages_loading: false,
        selectedChatMessages: action.payload?.messages,
      };
    },
    [updateGroupChat.pending]: (state = initialState, action) => {
      return {
        ...state,
        update_group_chat_loading: true,
        update_group_chat_error: null,
      };
    },
    [updateGroupChat.fulfilled]: (state = initialState, action) => {
      console.log(action.payload);
      return {
        ...state,
        selectedChat: !action.payload?.chat
          ? state.selectedChat
          : action.payload?.chat,
        update_group_chat_loading: false,
        update_group_chat_error: action.payload?.error,
      };
    },
    [createGroupChat.pending]: (state = initialState, action) => {
      return {
        ...state,
        new_group_chat_loading: true,
      };
    },
    [createGroupChat.fulfilled]: (state = initialState, action) => {
      console.log(action.payload, isError(action.payload));
      return {
        ...state,
        new_group_chat_loading: false,
        chats: isError(action.payload)
          ? state.chats
          : [action.payload?.chat, ...state.chats],
        selectedChat: isError(action.payload) ? null : action.payload?.chat,
        new_group_chat_error: isError(action.payload)
          ? extractError(action.payload)
          : null,
      };
    },
    [deleteChat.pending]: (state = initialState, action) => {
      return {
        ...state,
        delete_chat_loading: true,
      };
    },
    [deleteChat.fulfilled]: (state = initialState, action) => {
      return {
        ...state,
        delete_chat_loading: false,
        chats: isError(action.payload)
          ? state.chats
          : [...state.chats].filter(
              (chat) => chat?._id !== state?.selectedChat?._id
            ),
        selectedChat: null,
      };
    },
    [accessChat.pending]: (state = initialState, action) => {
      return {
        ...state,
        access_chat_loading: true,
      };
    },
    [accessChat.fulfilled]: (state = initialState, { payload }) => {
      return {
        ...state,
        access_chat_loading: false,
        selectedChat: payload?.chat,
        chats: [...state.chats].find((chat) => chat?._id === payload?.chat?._id)
          ? state.chats
          : [payload?.chat, ...state.chats],
      };
    },
    [sendMessage.fulfilled]: (state = initialState, action) => {
      return state;
    },
  },
});

export const {
  updateChats,
  clearError,
  addNewMessage,
  resetChat,
} = ChatReducer.actions;

export default ChatReducer.reducer;
