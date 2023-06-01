import axios from "axios";
import { useSnack } from "../providers/SnackbarProvider";
// import { useUser } from "../users/providers/UserProvider";
import { useEffect } from "react";

const useAxiosInterceptors = () => {
  const snack = useSnack();
  // const { token } = useUser();

  useEffect(() => {
    // axios.defaults.headers.common["x-auth-token"] = token;
    axios.interceptors.request.use(data => {
      console.log(data);

      return Promise.resolve(data);
    }, null);

    axios.interceptors.response.use(null, (error: any) => {
      const expectedError = error.response && error.response.status >= 400;
      if (expectedError) snack("error", error.message);
      return Promise.reject(error);
    });
  }, []);
};

export default useAxiosInterceptors;
