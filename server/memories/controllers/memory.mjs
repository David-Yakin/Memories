import { handleError } from "../../utils/handleErrors.mjs";
import normalizeMemory from "../helpers/normalizeMemory.mjs";
import memoryValidation from "../models/joi/memoryValidation.mjs";
import Memory from "../models/mongoose/Memory.mjs";
import User from "../../users/models/mongoose/User.mjs";

export const createMemory = async (req, res) => {
  try {
    const user = req.user;
    const memory = req.body;

    const { error } = memoryValidation(memory);
    if (error)
      return handleError(res, 400, `Joi Error: ${error.details[0].message}`);

    const normalizedMemory = normalizeMemory(memory, user._id);
    const newMemory = new Memory(normalizedMemory);
    const memoryFormDB = await newMemory.save();

    res.status(201).send(memoryFormDB);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
};

export const getMemories = async (req, res) => {
  try {
    const user = req.user;
    const userFromDb = await User.findById(user._id);
    if (!userFromDb)
      return handleError(
        res,
        400,
        "Mongoose Error: No user with this id is in the database"
      );

    const memories = await Memory.find();
    if (memories.length) {
      const filteredMemories = memories.filter(memory => {
        if (memory.user_id === user._id) return memory;
        const isExist = memory.sharedWith.find(
          email => email === userFromDb.email
        );
        if (isExist) return memory;
      });
      return res.send(filteredMemories);
    }

    res.send(memories);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
};

export const getMemory = async (req, res) => {
  try {
    const user = req.user;
    const { memoryId } = req.params;

    const userFromDb = await User.findById(user._id);
    if (!userFromDb)
      return handleError(
        res,
        400,
        "Mongoose Error: No user with this id is in the database"
      );

    const memory = await Memory.findById(memoryId);
    if (!memory)
      return handleError(
        res,
        400,
        "Mongoose Error: I Don't remember this memory"
      );

    const isExist = memory.sharedWith.find(email => email === userFromDb.email);

    if (memory.user_id !== user._id && !isExist)
      return handleError(res, 403, "You not authorize to see this memory");

    return res.send(memory);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
};

export const editMemory = async (req, res) => {
  try {
    const { memoryId } = req.params;
    const user = req.user;
    const memory = req.body;

    const normalizedMemory = normalizeMemory(memory, user._id);
    const memoryFromDB = await Memory.findOneAndUpdate(
      {
        _id: memoryId,
        user_id: user._id,
      },
      normalizedMemory,
      { new: true }
    );
    if (!memoryFromDB)
      return handleError(
        res,
        400,
        "Mongoose Error: I Don't remember this memory"
      );

    return res.send(memoryFromDB);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
};

export const deleteMemory = async (req, res) => {
  try {
    const { memoryId } = req.params;
    const user = req.user;

    const deletedMemory = await Memory.findOneAndDelete({
      _id: memoryId,
      user_id: user._id,
    });
    if (!deletedMemory)
      return handleError(
        res,
        400,
        "Mongoose Error: I Don't remember this memory"
      );
    return res.send(deletedMemory);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
};

export const shareMemory = async (req, res) => {
  try {
    const { memoryId } = req.params;
    const user = req.user;
    const emailFromClient = req.body.email;

    const memory = await Memory.findOne({ _id: memoryId, user_id: user._id });
    if (!memory)
      return handleError(
        res,
        400,
        "Mongoose Error: I Don't remember this memory"
      );

    const isEmail = memory.sharedWith.find(email => email === emailFromClient);
    if (!isEmail) {
      memory.sharedWith.push(emailFromClient);
      const memoryFromDb = await memory.save();
      return res.send(memoryFromDb);
    }

    return handleError(
      res,
      400,
      "Mongoose Error: This memory is already shared with this person"
    );
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
};

export const likeMemory = async (req, res) => {
  try {
    const { memoryId } = req.params;
    const userId = req.user._id;

    const memory = await Memory.findById(memoryId);
    if (!memory)
      return handleError(
        res,
        400,
        "Mongoose Error: I Don't remember this memory"
      );

    const isLiked = memory.likes.find(id => id === userId);
    if (!isLiked) {
      memory.likes.push(userId);
      const memoryFromDB = await memory.save();
      return res.send(memoryFromDB);
    }

    const filteredMemory = memory.likes.filter(id => id !== userId);
    memory.likes = filteredMemory;
    const memoryFromDB = await memory.save();
    return res.send(memoryFromDB);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
};
