import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const getCurrentUser = async (token) => {
  try {
    const { data } = await axios.get(`${API_URL}/users/currentUser`, {
      headers: {
        auth: `Bearer ${token}`,
      },
    });
    return data;
  } catch (err) {
    return { error: err?.response?.data?.error };
  }
};

const updateProfilePic = async (token, picture) => {
  try {
    const { data } = await axios.patch(
      `${API_URL}/users/currentUser/updateProfilePicture`,
      { picture },
      {
        headers: {
          auth: `Bearer ${token}`,
        },
      }
    );
    return data;
    console.log(data);
  } catch (err) {
    return { error: err?.response?.data?.error };
  }
};

const searchUsers = async (token, keyword) => {
  try {
    const { data } = await axios.get(`${API_URL}/users?keyword=${keyword}`, {
      headers: {
        auth: `Bearer ${token}`,
      },
    });
    return data;
  } catch (err) {
    return { error: err?.response?.data?.error };
  }
};

const USERS_API = {
  getCurrentUser,
  updateProfilePic,
  searchUsers,
};

export default USERS_API;
