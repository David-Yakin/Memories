import axios from "axios";
import MemoryInterface from "../interfaces/MemoryInterface";
import { createAsyncThunk } from "@reduxjs/toolkit";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";

export const getMemories = createAsyncThunk(
  "memories/getMemories",
  async () => {
    try {
      const { data } = await axios.get<MemoryInterface[]>(`${apiUrl}/memories`);
      return Promise.resolve(data);
    } catch (error) {
      if (axios.isAxiosError(error)) return Promise.reject(error.message);
      console.log(`%c${error}`, "color: yellow");
      return Promise.reject("An unexpected error occurred!");
    }
  }
);

// export const getMemories = async () => {
//   try {
//     const { data } = await axios.get<MemoryInterface[]>(`${apiUrl}/memories`);
//     return Promise.resolve(data);
//   } catch (error) {
//     if (axios.isAxiosError(error)) return Promise.reject(error.message);
//     console.log(`%c${error}`, "color: yellow");
//     return Promise.reject("An unexpected error occurred!");
//   }
// };

// export const getMemories = () =>
//   axios.get(`${apiUrl}/memories`).then(({ data }) => data);
