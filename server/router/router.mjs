import { Router } from "express";
const router = Router();
import { handleError } from "../utils/handleErrors.mjs";
import memoriesRouter from "../memories/routes/memoriesRoutes.mjs";
import usersRouter from "../users/routes/usersRoutes.mjs";

router.use("/memories", memoriesRouter);
router.use("/users", usersRouter);

router.use((req, res) => {
  handleError(res, 404, "Page not found!");
});

export default router;
