import Joi from 'joi'

export const profileValidationSchema = Joi.object({
  username: Joi.string()
    .pattern(/^\S+$/) // Memastikan username hanya satu kata (tanpa spasi)
    .required()
    .messages({
      'any.required': 'Username is required',
      'string.base': 'Username must be a string',
      'string.empty': 'Username cannot be empty',
      'string.pattern.base': 'Username must be a single word without spaces'
    }),
  profile_pic: Joi.string().optional().allow(null),
  full_name: Joi.string().required().messages({
    'any.required': 'Full name is required',
    'string.base': 'Full name must be a string',
    'string.empty': 'Full name cannot be empty'
  }),
  birth_date: Joi.date().iso().required().messages({
    'any.required': 'Birth date is required',
    'date.base': 'Birth date must be a valid date',
    'date.format': 'Birth date must be in the format YYYY-MM-DD'
  }),
  location: Joi.string().required().messages({
    'any.required': 'Location is required',
    'string.base': 'Location must be a string',
    'string.empty': 'Location cannot be empty'
  }),
  gender: Joi.string().valid('MALE', 'FEMALE').required().messages({
    'any.required': 'Gender is required',
    'string.base': 'Gender must be a string',
    'any.only': 'Gender must be either MALE or FEMALE'
  })
})

export const updateProfileValidationSchema = Joi.object({
  username: Joi.string().pattern(/^\S+$/).optional().messages({
    'string.base': 'Username must be a string',
    'string.pattern.base': 'Username must be a single word without spaces'
  }),
  profile_pic: Joi.string().optional().allow(null), // Memungkinkan null
  full_name: Joi.string().optional().messages({
    'string.base': 'Full name must be a string'
  }),
  birth_date: Joi.date().iso().optional().messages({
    'date.base': 'Birth date must be a valid date',
    'date.format': 'Birth date must be in the format YYYY-MM-DD'
  }),
  location: Joi.string().optional().messages({
    'string.base': 'Location must be a string'
  }),
  gender: Joi.string().valid('MALE', 'FEMALE').optional().messages({
    'string.base': 'Gender must be a string',
    'any.only': 'Gender must be either MALE or FEMALE'
  })
})
