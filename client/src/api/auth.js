import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const loginUser = async ({ email, password }) => {
  try {
    const { data } = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });
    return data;
  } catch (error) {
    return { error: error?.response?.data?.error };
  }
};

const signupUser = async (userData) => {
  try {
    const { data } = await axios.post(`${API_URL}/auth/signup`, userData);
    return data;
  } catch (error) {
    return { error: error?.response?.data?.error };
  }
};

const getEmailVerificationToken = async (token) => {
  try {
    const { data } = await axios.get(`${API_URL}/auth/emailverificationtoken`, {
      headers: {
        auth: `Bearer ${token}`,
      },
    });
    console.log(data);
    return data;
  } catch (error) {
    return { error: error?.response?.data?.error };
  }
};

const verifyEmail = async (emailToken, userToken) => {
  try {
    const { data } = await axios.get(
      `${API_URL}/auth/verifyemail/${emailToken}`,
      {
        headers: {
          auth: `Bearer ${userToken}`,
        },
      }
    );
    console.log(data);
    return data;
  } catch (err) {
    return { error: err?.response?.data?.error };
  }
};

const forgotPassword = async (email) => {
  try {
    const { data } = await axios.patch(`${API_URL}/auth/forgotpassword`, {
      email,
    });
    return data;
  } catch (err) {
    return { error: err?.response?.data?.error };
  }
};

const resetPassword = async (token, newPassword) => {
  try {
    const { data } = await axios.patch(
      `${API_URL}/auth/resetpassword/${token}`,
      {
        newPassword,
      }
    );
    return data;
  } catch (err) {
    return { error: err?.response?.data?.error };
  }
};

const logoutUser = async (token) => {
  try {
    const { data } = await axios.patch(
      `${API_URL}/auth/logout`,
      {},
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

const AUTH_API = {
  loginUserEndpoint: loginUser,
  signupUserEndpoint: signupUser,
  getEmailVerificationTokenEndpoint: getEmailVerificationToken,
  verifyEmailEndpoint: verifyEmail,
  forgotPasswordEndpoint: forgotPassword,
  resetPasswordEndpoint: resetPassword,
  logoutUser,
};

export default AUTH_API;
