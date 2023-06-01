import bcrypt from "bcryptjs";

export const generateUserPassword = password => bcrypt.hashSync(password, 10);

export const comparePassword = (password, anotherPassword) =>
  bcrypt.compareSync(password, anotherPassword);
