import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const fetchChats = async (token) => {
  try {
    const { data } = await axios.get(`${API_URL}/chats`, {
      headers: {
        auth: `Bearer ${token}`,
      },
    });
    return data;
  } catch (err) {
    return { error: err?.response?.data?.error };
  }
};

const fetchSingleChat = async (token, chatId) => {
  try {
    const { data } = await axios.get(`${API_URL}/chats/${chatId}`, {
      headers: {
        auth: `Bearer ${token}`,
      },
    });
    return data;
  } catch (err) {
    return { error: err?.response?.data?.error };
  }
};

const fetchSingleChatMessages = async (token, chatId) => {
  try {
    const { data } = await axios.get(`${API_URL}/messages?chat=${chatId}`, {
      headers: {
        auth: `Bearer ${token}`,
      },
    });
    return data;
  } catch (err) {
    return { error: err?.response?.data?.error };
  }
};

const sendMessage = async (token, messageContent, chatId) => {
  try {
    const { data } = await axios.post(
      `${API_URL}/messages?chat=${chatId}`,
      {
        messageContent,
      },
      {
        headers: {
          auth: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (err) {
    return { error: err?.response?.data?.error };
  }
};

const updateGroupChat = async (token, chatId, { chatName, users, picture }) => {
  try {
    const { data } = await axios.patch(
      `${API_URL}/chats/${chatId}`,
      {
        chatName,
        users,
        picture,
      },
      {
        headers: {
          auth: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (err) {
    return { error: err?.response?.data?.error };
  }
};

const createGroupChat = async (token, chatData) => {
  try {
    const { data } = await axios.post(
      `${API_URL}/chats/createGroupChat`,
      chatData,
      {
        headers: {
          auth: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (err) {
    return { error: err?.response?.data?.error };
  }
};

const deleteChat = async (token, chatId) => {
  try {
    const { data } = await axios.delete(`${API_URL}/chats/${chatId}`, {
      headers: {
        auth: `Bearer ${token}`,
      },
    });
    return data;
  } catch (err) {
    return { error: err?.response?.data?.error };
  }
};

const accessChat = async (token, userId) => {
  try {
    const { data } = await axios.post(
      `${API_URL}/chats/`,
      {
        userId,
      },
      {
        headers: {
          auth: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (err) {
    return { error: err?.response?.data?.error };
  }
};

const CHAT_API = {
  fetchChats,
  fetchSingleChat,
  fetchSingleChatMessages,
  updateGroupChat,
  createGroupChat,
  deleteChat,
  accessChat,
  sendMessage
};

export default CHAT_API;
