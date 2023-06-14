import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../app/hooks";
import { useSnack } from "../../general/providers/SnackbarProvider";
import {
  useCreateMemoryMutation,
  useDeleteMemoryMutation,
  useGetMemoriesMutation,
  useGetMemoryMutation,
} from "../slices/memoryApiSlice";
import { setMemory, setMemories, addMemory } from "../slices/memoriesSlice";
import ROUTES from "../../routes/routesModel";
import { MemoryType } from "../models/types/memoriesTypes";
import normalizeCreateMemory from "../helpers/normalization/normalizeCreateMemory";
import { useCallback } from "react";
import MemoryInterface from "../models/interfaces/MemoryInterface";

type ReturnType = {
  handleGetMemory: (memoryId: string) => void;
  isMemoryLoading: boolean;
  handleCreateNewMemory: (memoryFromForm: MemoryType) => void;
  isCreateMemoryLoading: boolean;
  handleGetMemories: () => void;
  isMemoriesLoading: boolean;
  handleDeleteMemory: (memoryId: string) => void;
  isDeleteMemoryLoading: boolean;
  getMemoriesError: any;
};

const useHandleMemories = (): ReturnType => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const snack = useSnack();

  const [
    getMemories,
    { isLoading: isMemoriesLoading, error: getMemoriesError },
  ] = useGetMemoriesMutation();
  const [getMemory, { isLoading: isMemoryLoading }] = useGetMemoryMutation();
  const [createMemory, { isLoading: isCreateMemoryLoading }] =
    useCreateMemoryMutation();
  const [deleteMemory, { isLoading: isDeleteMemoryLoading }] =
    useDeleteMemoryMutation();

  const handleGetMemories = useCallback(async () => {
    try {
      const memories = await getMemories();
      if ("data" in memories) dispatch(setMemories(memories.data));
    } catch (error: Record<string, unknown> | any) {
      snack("error", `Get Memory Error: ${error.data || error.error}`);
      navigate(ROUTES.ROOT);
    }
  }, []);

  const handleGetMemory = useCallback(async (memoryId: string) => {
    try {
      const memory = await getMemory(memoryId);
      if ("data" in memory) dispatch(setMemory(memory.data));
    } catch (error: Record<string, unknown> | any) {
      snack("error", `Get Memory Error: ${error.data || error.error}`);
      navigate(ROUTES.ROOT);
    }
  }, []);

  const handleCreateNewMemory = async (memoryInfo: MemoryType) => {
    try {
      const normalizedMemory = normalizeCreateMemory(memoryInfo);
      const memoryFromDB = await createMemory(normalizedMemory).unwrap();
      dispatch(addMemory(memoryFromDB));
      navigate(ROUTES.MEMORIES);
    } catch (error: Record<string, unknown> | any) {
      snack("error", error.data || error.error);
    }
  };

  const handleDeleteMemory = async (memoryId: string) => {
    try {
      await deleteMemory(memoryId);
    } catch (error: Record<string, unknown> | any) {
      snack("error", error.data || error.error);
    }
  };

  return {
    handleGetMemories,
    isMemoriesLoading,
    getMemoriesError,
    handleGetMemory,
    isMemoryLoading,
    handleCreateNewMemory,
    isCreateMemoryLoading,
    handleDeleteMemory,
    isDeleteMemoryLoading,
  };
};

export default useHandleMemories;
