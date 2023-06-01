import chalk from "chalk";

export const handleError = (res, status, message = "") => {
  console.log(chalk.redBright(message));
  return res.status(status).send(message);
};

export const handleBadRequest = async (validator, error) => {
  const errorMessage = `${validator} Error: ${error.message}`;
  error.message = errorMessage;
  error.status = error.status || 400;
  return Promise.reject(error);
};
