import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getMemories } from "./api/memoriesApi";
import MemoryInterface from "./interfaces/MemoryInterface";

type InitialState = {
  memories: MemoryInterface[];
  loading: boolean;
  error: string;
};

const initialState: InitialState = {
  memories: [],
  loading: false,
  error: "",
};

const memorySlice = createSlice({
  name: "memory",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(getMemories.pending, (state: InitialState) => {
      state.loading = true;
    });
    builder.addCase(
      getMemories.fulfilled,
      (state: InitialState, action: PayloadAction<MemoryInterface[]>) => {
        state.loading = false;
        state.memories = action.payload;
        state.error = "";
      }
    );
    builder.addCase(
      getMemories.rejected,
      (state: InitialState, action: any) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong...";
      }
    );
  },
});

export const memoryReducer = memorySlice.reducer;
// export const {} = memorySlice.actions;
