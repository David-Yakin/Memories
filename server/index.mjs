import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import chalk from "chalk";
import morganLogger from "./logger/morganLogger.mjs";
import connectToDB from "./DB/mongoDB.mjs";
import router from "./router/router.mjs";
import dotenv from "dotenv";
import { generateInitialUsers } from "./initialData/initialDataService.mjs";
import { handleError } from "./utils/handleErrors.mjs";
// import path from "path";

dotenv.config();
const app = express();

// Checking the data sent to the server and limit it's size
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use((err, req, res, next) => {
  handleError(res, 500, err.message);
});

// let every url send a request
app.use(cors());
app.use(morganLogger);
app.use(router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(chalk.blueBright(`Server listening on port: ${PORT}`));
  connectToDB();
  await generateInitialUsers();
});
