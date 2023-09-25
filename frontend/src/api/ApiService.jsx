import axios from "axios";
const baseURL = "http://localhost:8090/";

const instance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const get = async (url, params = {}) => {
  try {
    const response = await instance.get(url, { params });
    return response.data;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const post = async (url, data = {}, headers = {}) => {
  try {
    const response = await instance.post(url, data, {
      headers: headers,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const put = async (url, data = {}, headers = {}) => {
  try {
    const response = await instance.put(url, data, {
      headers: headers,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const del = async (url, headers = {}) => {
  try {
    const response = await instance.delete(url, {
      headers: headers,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
