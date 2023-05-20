const Joi = require("joi");
const addSchema = Joi.object({
    name: Joi.string().required().messages({
      "any.required": `missing required name field`,
      "string.empty": `"name" cannot be empty`,
      "string.base": `"name" must be string`,
    }),
    email: Joi.string().required().messages({
      "any.required": `missing required email field`,
      "string.empty": `"email" cannot be empty`,
      "string.base": `"email" must be string`,
    }),
    phone: Joi.string().required().messages({
      "any.required": `missing required phone field`,
      "string.empty": `phone cannot be empty`,
      "string.base": `phone must be string`
    }),
    favorite: Joi.boolean(),
  });
  const putSchema = Joi.object({
    name: Joi.string().required().messages({
    "any.required": `missing fields`,
    
  }),
  email: Joi.string().required().messages({
    "any.required": `missing fields`,
  }),
  phone: Joi.string().required().messages({
    "any.required": `missing fields`,
  }),})
    
  const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required().messages({
      "any.required": `missing required favorite field`}
      ),
  });

  const schemas = {
    addSchema,
    updateFavoriteSchema,
   putSchema 
    
  };
  module.exports = {
    schemas
  };