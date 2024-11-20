import Joi from 'joi'

export const registrationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required()
})

export const phoneLoginSchema = Joi.object({
  phoneNumber: Joi.string()
    .pattern(/^\+[1-9]\d{1,14}$/)
    .required()
    .messages({
      'string.pattern.base': 'Format nomor telepon harus dimulai dengan + dan diikuti kode negara',
      'any.required': 'Nomor telepon harus diisi'
    })
})
