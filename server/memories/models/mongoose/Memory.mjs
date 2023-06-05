import mongoose from "mongoose";

const DEFAULT_VALIDATION = {
  type: String,
  required: true,
  minLength: 2,
  maxLength: 256,
  trim: true,
  lowercase: true,
};

const NOT_REQUIRED = {
  type: String,
  maxLength: 256,
  trim: true,
  lowercase: true,
};

const EMAIL_VALIDATION = {
  type: String,
  required: true,
  match: RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/),
  lowercase: true,
  trim: true,
  unique: true,
};

const URL_VALIDATION = {
  type: String,
  match: RegExp(
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
  ),
  trim: true,
  lowercase: true,
};

const LOCATION_VALIDATION = new mongoose.Schema({
  state: NOT_REQUIRED,
  country: DEFAULT_VALIDATION,
  region: NOT_REQUIRED,
  city: NOT_REQUIRED,
  street: NOT_REQUIRED,
  houseNumber: Number,
});

const NAME_VALIDATION = new mongoose.Schema({
  first: DEFAULT_VALIDATION,
  middle: NOT_REQUIRED,
  last: DEFAULT_VALIDATION,
});

const IMAGE_VALIDATION = new mongoose.Schema({
  url: URL_VALIDATION,
  alt: DEFAULT_VALIDATION,
});

const schema = new mongoose.Schema({
  title: DEFAULT_VALIDATION,
  description: DEFAULT_VALIDATION,
  image: IMAGE_VALIDATION,
  peopleInPic: [NAME_VALIDATION],
  location: LOCATION_VALIDATION,
  sharedWith: [EMAIL_VALIDATION],
  likes: [NOT_REQUIRED],
  createdAt: {
    type: Date,
    default: new Date(),
  },
  user_id: DEFAULT_VALIDATION,
});

const Memory = mongoose.model("memory", schema, "memories");

export default Memory;
