import Joi from 'joi'

export const profileValidationSchema = Joi.object({
  username: Joi.string().pattern(/^\S+$/).required().messages({
    'any.required': 'Username is required',
    'string.min': 'Username must be at least 5 characters long',
    'string.max': 'Username must be at most 30 characters long',
    'string.base': 'Username must be a string',
    'string.empty': 'Username cannot be empty',
    'string.pattern.base': 'Username must be a single word without spaces'
  }),
  profile_pic: Joi.string().optional().allow(''),
  full_name: Joi.string().required().min(3).max(50).messages({
    'string.min': 'Full name must be at least 3 characters long',
    'string.max': 'Full name must be at most 50 characters long',
    'any.required': 'Full name is required',
    'string.base': 'Full name must be a string',
    'string.empty': 'Full name cannot be empty'
  }),
  birth_date: Joi.date().max('now').required().messages({
    'date.max': 'Tanggal lahir tidak valid',
    'any.required': 'Tanggal lahir wajib diisi'
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
