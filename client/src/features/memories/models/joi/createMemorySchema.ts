import Joi from "joi";

export const DEFAULT_VALIDATION = Joi.string().min(2).max(256).required();
export const NOT_REQUIRED = Joi.string().min(2).allow("");
export const URL_VALIDATION = Joi.string()
  .ruleset.regex(
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
  )
  .rule({ message: "user image mast be a valid url" });

const nameSchema = Joi.object({
  _id: DEFAULT_VALIDATION,
  first: DEFAULT_VALIDATION,
  middle: NOT_REQUIRED,
  last: DEFAULT_VALIDATION,
});

export const personSchema = {
  _id: DEFAULT_VALIDATION,
  first: DEFAULT_VALIDATION,
  middle: NOT_REQUIRED,
  last: DEFAULT_VALIDATION,
};

const createMemorySchema = {
  title: DEFAULT_VALIDATION,
  description: DEFAULT_VALIDATION,
  imageUrl: URL_VALIDATION,
  // imageAlt: DEFAULT_VALIDATION,
  peopleInPic: Joi.array().items(nameSchema),
  state: NOT_REQUIRED,
  country: DEFAULT_VALIDATION,
  region: NOT_REQUIRED,
  city: NOT_REQUIRED,
  street: NOT_REQUIRED,
  houseNumber: NOT_REQUIRED,
};

export default createMemorySchema;
