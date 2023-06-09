import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../app/hooks";
import { useSnack } from "../../general/providers/SnackbarProvider";
import { useGetMemoryMutation } from "../slices/memoryApiSlice";
import { setMemory } from "../slices/memoriesSlice";
import ROUTES from "../../routes/routesModel";

type ReturnType = {
  handleGetMemory: (memoryId: string) => void;
  isMemoryLoading: boolean;
};

const useHandleMemories = (): ReturnType => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const snack = useSnack();

  const [getMemory, { isLoading: isMemoryLoading }] = useGetMemoryMutation();

  const handleGetMemory = async (memoryId: string) => {
    try {
      const memory = await getMemory(memoryId);
      if ("data" in memory) dispatch(setMemory(memory.data));
    } catch (error: Record<string, unknown> | any) {
      snack("error", `Get Memory Error: ${error.data || error.error}`);
      navigate(ROUTES.ROOT);
    }
  };

  return { handleGetMemory, isMemoryLoading };
};

export default useHandleMemories;
