import { handleError } from "../utils/handleErrors.mjs";
import { verifyToken } from "./Providers/jwt.mjs";

const auth = (req, res, next) => {
  try {
    const tokenFromClient = req.header("x-auth-token");
    if (!tokenFromClient) throw new Error("Authentication Error: Please Login");

    const userInfo = verifyToken(tokenFromClient);
    if (!userInfo) throw new Error("Authentication Error: Unauthorize user");

    req.user = userInfo;
    return next();
  } catch (error) {
    return handleError(res, 401, error.message);
  }
};

export default auth;
