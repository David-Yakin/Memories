import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../app/hooks";
import { useSnack } from "../../general/providers/SnackbarProvider";
import {
  useCreateMemoryMutation,
  useDeleteMemoryMutation,
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
  handleGetMemories: (memoriesFromDB: MemoryInterface[]) => void;
  handleDeleteMemory: (memoryId: string) => void;
  isDeleteMemoryLoading: boolean;
};

const useHandleMemories = (): ReturnType => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const snack = useSnack();

  const [getMemory, { isLoading: isMemoryLoading }] = useGetMemoryMutation();
  const [createMemory, { isLoading: isCreateMemoryLoading }] =
    useCreateMemoryMutation();
  const [deleteMemory, { isLoading: isDeleteMemoryLoading }] =
    useDeleteMemoryMutation();

  const handleGetMemories = useCallback(
    async (memoriesFromDB: MemoryInterface[]) => {
      try {
        dispatch(setMemories(memoriesFromDB));
      } catch (error: Record<string, unknown> | any) {
        snack("error", `Get Memory Error: ${error.data || error.error}`);
        navigate(ROUTES.ROOT);
      }
    },
    []
  );

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
    handleGetMemory,
    isMemoryLoading,
    handleCreateNewMemory,
    isCreateMemoryLoading,
    handleGetMemories,
    handleDeleteMemory,
    isDeleteMemoryLoading,
  };
};

export default useHandleMemories;
