import MemoryInterface from "../models/interfaces/MemoryInterface";
import { apiSlice } from "../../../app/apiSlice";

const MEMORIES_API = "/memories";

const memoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getMemories: builder.query<MemoryInterface[], void>({
      query: () => MEMORIES_API,
    }),

    getMemory: builder.mutation<MemoryInterface, string>({
      query: memoryId => `${MEMORIES_API}/${memoryId}`,
    }),

    createMemory: builder.mutation({
      query: data => ({
        url: MEMORIES_API,
        method: "POST",
        body: data,
      }),
    }),

    editMemory: builder.mutation({
      query: data => ({
        url: `${MEMORIES_API}/${data.memoryId}`,
        method: "PUT",
        body: data.memory,
      }),
    }),

    shareMemory: builder.mutation({
      query: data => ({
        url: `${MEMORIES_API}/${data.memoryId}`,
        method: "PATCH",
        body: data.email,
      }),
    }),

    changeLikeMemoryStatus: builder.mutation({
      query: memoryId => ({
        url: `${MEMORIES_API}/${memoryId}`,
        method: "PATCH",
      }),
    }),

    deleteMemory: builder.mutation({
      query: memoryId => ({
        url: `${MEMORIES_API}/${memoryId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetMemoriesQuery,
  useGetMemoryMutation,
  useCreateMemoryMutation,
  useEditMemoryMutation,
  useShareMemoryMutation,
  useChangeLikeMemoryStatusMutation,
  useDeleteMemoryMutation,
} = memoriesApiSlice;
