import axios from "axios";
import chalk from "chalk";
import normalizeUser from "../users/helpers/normalizeUser.mjs";
import { generateUserPassword } from "../users/helpers/bcrypt.mjs";
import User from "../users/models/mongoose/User.mjs";
import path from "path";
import data from "./initialData.json" assert { type: "json" };

export const generateInitialUsers = async () => {
  try {
    const { users } = data;
    users.forEach(async user => {
      try {
        const userExists = await User.findOne({ email: user.email });
        if (userExists) throw new Error("User already registered");

        const normalizedUser = normalizeUser({ ...user });
        normalizedUser.password = generateUserPassword(user.password);

        const userFromMongoose = new User(normalizedUser);
        await userFromMongoose.save();
        return;
      } catch (error) {
        return console.log(
          chalk.redBright(`Generate initialData Error:  ${error.message}`)
        );
      }
    });
  } catch (error) {
    return console.log(
      chalk.redBright(`Generate initialData Error:  ${error.message}`)
    );
  }
};
