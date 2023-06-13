import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../app/hooks";
import { useSnack } from "../../general/providers/SnackbarProvider";
import {
  useCreateMemoryMutation,
  useGetMemoryMutation,
} from "../slices/memoryApiSlice";
import { setMemory } from "../slices/memoriesSlice";
import ROUTES from "../../routes/routesModel";
import { MemoryType } from "../models/types/memoriesTypes";
import normalizeCreateMemory from "../helpers/normalization/normalizeCreateMemory";

type ReturnType = {
  handleGetMemory: (memoryId: string) => void;
  isMemoryLoading: boolean;
  handleCreateNewMemory: (memoryFromForm: MemoryType) => void;
  isCreateMemoryLoading: boolean;
};

const useHandleMemories = (): ReturnType => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const snack = useSnack();

  const [getMemory, { isLoading: isMemoryLoading }] = useGetMemoryMutation();

  const [createMemory, { isLoading: isCreateMemoryLoading }] =
    useCreateMemoryMutation();

  const handleGetMemory = async (memoryId: string) => {
    try {
      const memory = await getMemory(memoryId);
      if ("data" in memory) dispatch(setMemory(memory.data));
    } catch (error: Record<string, unknown> | any) {
      snack("error", `Get Memory Error: ${error.data || error.error}`);
      navigate(ROUTES.ROOT);
    }
  };

  const handleCreateNewMemory = async (memoryInfo: MemoryType) => {
    try {
      const normalizedMemory = normalizeCreateMemory(memoryInfo);
      await createMemory(normalizedMemory).unwrap();
      navigate(ROUTES.MEMORIES);
    } catch (error: Record<string, unknown> | any) {
      snack("error", error.data || error.error);
    }
  };

  return {
    handleGetMemory,
    isMemoryLoading,
    handleCreateNewMemory,
    isCreateMemoryLoading,
  };
};

export default useHandleMemories;
