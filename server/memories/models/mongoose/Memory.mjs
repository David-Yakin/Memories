import mongoose from "mongoose";

const memorySchema = mongoose.Schema({
  title: String,
  message: String,
  creator: String,
  tags: [String],
  selectedFile: String,
  likes: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Memory = mongoose.model("memory", memorySchema);

export default Memory;
