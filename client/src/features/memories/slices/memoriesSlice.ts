import { createSlice } from "@reduxjs/toolkit";
import MemoryInterface from "../models/interfaces/MemoryInterface";

type InitialState = {
  memories: MemoryInterface[] | null;
  memory: MemoryInterface | null;
};

const initialState: InitialState = {
  memories: null,
  memory: null,
};

const memoriesSlice = createSlice({
  name: "memories",
  initialState,
  reducers: {
    setMemories: (state, action) => {
      state.memories = action.payload;
    },
    setMemory: (state, action) => {
      state.memory = action.payload;
    },
  },
});

export const { setMemories, setMemory } = memoriesSlice.actions;
export default memoriesSlice.reducer;
