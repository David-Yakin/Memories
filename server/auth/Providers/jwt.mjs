import JWT from "jsonwebtoken";
import config from "config";

const key = config.get("JWT_KEY");

export const generateAuthToken = user => {
  const { _id, isAdmin } = user;
  const token = JWT.sign({ _id, isAdmin }, key);
  return token;
};

export const verifyToken = tokenFromClient => {
  try {
    const userDataFromPayload = JWT.verify(tokenFromClient, key);
    return userDataFromPayload;
  } catch (error) {
    return null;
  }
};
