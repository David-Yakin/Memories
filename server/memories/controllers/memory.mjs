import { handleError } from "../../utils/handleErrors.mjs";
import Memory from "../models/mongoose/memory.mjs";

export const getMemory = async (req, res) => {
  try {
    const memories = await Memory.find();
    res.send(memories);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
};

export const createMemory = async (req, res) => {
  try {
    const memory = req.body;
    const newMemory = new Memory(memory);
    await newMemory.save();
    res.status(201).send(newMemory);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
};
