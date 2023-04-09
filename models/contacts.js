const {Schema,model}= require("mongoose");
const Joi = require("joi");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    }
  },
  { versionKey: false, timestamps: true }
);



const addSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `"name" is required`,
    "string.empty": `"name" cannot be empty`,
    "string.base": `"name" must be string`,
  }),
  email: Joi.string().required().messages({
    "any.required": `"email" is required`,
    "string.empty": `"email" cannot be empty`,
    "string.base": `"email" must be string`,
  }),
  phone: Joi.string().required().messages({
    "any.required": `"phone" is required`,
  }),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

contactSchema.post("save", (error, data, next) => {
  error.status = 400;
  next();
});
const schemas = {
  addSchema,
  updateFavoriteSchema,
};

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  schemas,
};