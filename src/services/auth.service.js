import api from "./api";
import axios from "axios";
import Tokenservice from "./token.service";

const API_URL = "/api/auth";

const register = async (username, email, password) => {
  return await api.post(API_URL + "/signup", { username, email, password });
};

const login = async (username, password) => {
  const response = await api.post(API_URL + "/signin", { username, password })
  if (response.data.accessToken) {
    localStorage.setItem("accessToken", JSON.stringify(response.data.accessToken));
    localStorage.setItem("user", JSON.stringify(response));
  }
  return response;

}

const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");
  // You may also want to handle token invalidation on the server side if needed
};

const AuthService = {
  register,
  login,
  logout,
};

export default AuthService;


//เป็นแค่ที่ส่ง