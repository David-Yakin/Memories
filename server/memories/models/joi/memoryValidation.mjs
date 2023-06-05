import Joi from "joi";

const memoryValidation = memory => {
  const nameSchema = Joi.object({
    first: Joi.string().min(2).required(),
    middle: Joi.string().min(2).allow(""),
    last: Joi.string().min(2).required(),
  });

  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.object()
      .keys({
        url: Joi.string()
          .ruleset.regex(
            /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
          )
          .rule({ message: "user image mast be a valid url" })
          .required(),
        alt: Joi.string().min(2).max(256).required(),
      })
      .required(),
    peopleInPic: Joi.array().items(nameSchema).required(),
    location: Joi.object()
      .keys({
        state: Joi.string().min(2).allow(""),
        country: Joi.string().required(),
        region: Joi.string().min(2).allow(""),
        city: Joi.string().min(2).allow(""),
        street: Joi.string().min(2).allow(""),
        houseNumber: Joi.string().min(2).allow(""),
      })
      .required(),
  });
  return schema.validate(memory);
};

export default memoryValidation;
