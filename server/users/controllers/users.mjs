import { generateAuthToken } from "../../auth/Providers/jwt.mjs";
import { handleError } from "../../utils/handleErrors.mjs";
import { comparePassword, generateUserPassword } from "../helpers/bcrypt.mjs";
import normalizeUser from "../helpers/normalizeUser.mjs";
import loginValidation from "../models/joi/loginValidation.mjs";
import registrationValidation from "../models/joi/registrationValidation.mjs";
import userUpdateValidation from "../models/joi/updateUserValidation.mjs";
import User from "../models/mongoose/User.mjs";
import lodash from "lodash";

export const register = async (req, res) => {
  try {
    const user = req.body;

    const { error } = registrationValidation(user);
    if (error)
      return handleError(res, 400, `Joi Error: ${error.details[0].message}`);

    const normalizedUser = normalizeUser(user);
    normalizedUser.password = generateUserPassword(user.password);

    const userExists = await User.findOne({ email: user.email });
    if (userExists) return res.status(400).send("User already registered");

    const userFromMongoose = new User(normalizedUser);

    const newUser = await userFromMongoose.save();
    const userForClient = lodash.pick(newUser, ["name", "email", "_id"]);

    res.status(201).send(userForClient);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { error } = loginValidation(req.body);
    if (error) return handleError(res, 400, `Joi Error: ${error.message}`);

    const user = await User.findOne({ email });
    if (!user)
      return handleError(
        res,
        401,
        "Authentication Error: Invalid email or password"
      );

    const validPassword = comparePassword(password, user.password);
    if (!validPassword)
      return handleError(
        res,
        401,
        "Authentication Error: Invalid email or password"
      );

    const token = generateAuthToken(user);
    return res.send({ token });
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id, isAdmin } = req.user;

    if (_id !== id && !isAdmin)
      return handleError(
        res,
        403,
        "Forbidden Error: You must be an admin type user or the registered user to see this user details"
      );

    const userExist = await User.findById(id, { password: 0, __v: 0 });
    if (!userExist)
      return res
        .status(404)
        .send("No user with this id was found in the database");

    res.send(userExist);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const { _id } = req.user;
    const userExist = await User.findById(_id, { password: 0, __v: 0 });
    if (!userExist)
      return res
        .status(404)
        .send("No user with this id was found in the database");

    res.send(userExist);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const { isAdmin } = req.user;
    if (!isAdmin)
      return handleError(
        res,
        403,
        "Forbidden Error: You mast be an admin type user to see all the users"
      );
    const users = await User.find({}, { password: 0, __v: 0 });
    res.send(users);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
};

export const editUser = async (req, res) => {
  try {
    const { _id } = req.user;
    const { error } = userUpdateValidation(req.body);
    if (error)
      return handleError(res, 400, `Joi Error: ${error.details[0].message}`);

    const normalizedUser = normalizeUser(req.body);
    const user = await User.findByIdAndUpdate(_id, normalizedUser, {
      new: true,
    });
    if (!user)
      return handleError(
        res,
        400,
        "No user with this id was found in the database"
      );

    return res.send(user);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id, isAdmin } = req.user;

    if (_id !== id && !isAdmin)
      return handleError(
        res,
        403,
        "Forbidden Error: You must be an admin type user or the registered user to delete this user"
      );

    const user = await User.findByIdAndDelete(id);
    res.send(user);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
};
