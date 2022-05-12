import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const getNotifications = async (token) => {
  const { data } = await axios.get(`${API_URL}/notifications`, {
    headers: {
      auth: `Bearer ${token}`,
    },
  });
  return data;
};

const sendNotification = async (token, notification) => {
  const { data } = await axios.post(`${API_URL}/notifications`, notification, {
    headers: {
      auth: `Bearer ${token}`,
    },
  });
  return data;
};

const markOffNotification = async (token, messageId) => {
  const { data } = await axios.patch(
    `${API_URL}/notifications/${messageId}`,
    null,
    {
      headers: {
        auth: `Bearer ${token}`,
      },
    }
  );
  return data;
};

const deleteNotification = async (token, messageId) => {
  const { data } = await axios.delete(
    `${API_URL}/notifications/${messageId}`,
    {
      headers: {
        auth: `Bearer ${token}`,
      },
    }
  );
  return data;
};

const NOTIFICATIONS_API = {
  getNotifications,
  sendNotification,
  markOffNotification,
  deleteNotification,
};

export default NOTIFICATIONS_API;