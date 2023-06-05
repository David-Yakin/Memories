import express, { Router } from "express";
const router = Router();
import { handleError } from "../utils/handleErrors.mjs";
import memoriesRouter from "../memories/routes/memoriesRoutes.mjs";
import usersRouter from "../users/routes/usersRoutes.mjs";
// import path from "path";
// import dotenv from "dotenv";
// dotenv.config();
// const app = express();

router.use("/memories", memoriesRouter);
router.use("/users", usersRouter);

// if (process.env.NODE_ENV === "production") {
//   const __dirname = path.resolve();
//   const uri = path.join(__dirname, "client/build");
//   app.use(express.static(uri));
//   const pathResolve = path.resolve(
//     __dirname,
//     "../",
//     "client",
//     "build",
//     "index.html"
//   );
//   router.get("*", (req, res) => res.sendFile(pathResolve));
// }

router.use((req, res) => {
  handleError(res, 404, "Page not found!");
});

export default router;
