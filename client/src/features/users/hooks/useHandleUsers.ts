import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../app/hooks";

import {
  // useDeleteUserQuery,
  useEditUserMutation,
  useLoginMutation,
  useRegisterMutation,
  useDeleteUserMutation,
} from "../slices/usersApiSlice";

import { useSnack } from "../../general/providers/SnackbarProvider";
import {
  EditUserFormType,
  LoginType,
  RegistrationForm,
} from "../models/types/userTypes";
import { logout, setUser } from "../slices/authSlice";
import ROUTES from "../../routes/routesModel";
import normalizeUser from "../helpers/normalization/normalizeUser";
import normalizeEditUser from "../helpers/normalization/normalizeEditUser";

type Return = {
  handleLogin: (data: LoginType) => void;
  isLoginLoading: boolean;
  handleRegistration: (data: RegistrationForm) => void;
  isRegisterLogin: boolean;
  handleEditAccount: (data: EditUserFormType) => void;
  isEditUserLoading: boolean;
  handleDeleteUser: (userId: string) => void;
  isDeleteUserLoading: boolean;
};

const useHandleUsers = (): Return => {
  // const { user } = useAppSelector(state => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [register, { isLoading: isRegisterLogin }] = useRegisterMutation();
  const [editUser, { isLoading: isEditUserLoading }] = useEditUserMutation();
  const [deleteUser, { isLoading: isDeleteUserLoading }] =
    useDeleteUserMutation();

  const snack = useSnack();

  const handleLogin = async (formInfo: LoginType) => {
    try {
      const { token } = await login(formInfo).unwrap();
      dispatch(setUser(token));
      navigate(ROUTES.ROOT);
    } catch (error: Record<string, unknown> | any) {
      snack("error", `Login Error: ${error.data || error.error}`);
    }
  };

  const handleRegistration = async (formInfo: RegistrationForm) => {
    try {
      const normalizedUser = normalizeUser({ ...formInfo });
      await register(normalizedUser).unwrap();
      const userForLogin = {
        email: formInfo.email,
        password: formInfo.password,
      };
      await handleLogin(userForLogin);
    } catch (error: Record<string, unknown> | any) {
      snack("error", `Registration Error: ${error.data || error.error}`);
    }
  };

  const handleEditAccount = async (formInfo: EditUserFormType) => {
    try {
      const normalizedUser = normalizeEditUser({ ...formInfo });
      await editUser(normalizedUser).unwrap();
      snack("success", "The user profile has been successfully updated");
      navigate(ROUTES.ROOT);
    } catch (error: Record<string, unknown> | any) {
      snack("error", `Edit Account Error: ${error.data || error.error}`);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await deleteUser(userId).unwrap();
      dispatch(logout());
      navigate(ROUTES.ROOT);
    } catch (error: Record<string, unknown> | any) {
      snack("error", `Delete User Error: ${error.data || error.error}`);
    }
  };

  return {
    handleLogin,
    isLoginLoading,
    handleRegistration,
    isRegisterLogin,
    handleEditAccount,
    isEditUserLoading,
    handleDeleteUser,
    isDeleteUserLoading,
  };
};

export default useHandleUsers;
