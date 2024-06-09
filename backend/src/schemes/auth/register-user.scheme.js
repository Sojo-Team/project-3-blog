import Joi from 'joi'

export const registerUserSchema = Joi.object().keys({
  firstName: Joi.string().required().messages({
    'string.base': 'First Name must be of type string',
    'string.empty': 'First Name is a required field',
  }),
  lastName: Joi.string().required().messages({
    'string.base': 'Last Name must be of type string',
    'string.empty': 'Last Name is a required field',
  }),
  password: Joi.string().min(4).max(12).required().messages({
    'string.base': 'Password must be of type string',
    'string.min': 'Invalid password',
    'string.max': 'Invalid password',
    'string.empty': 'Password is a required field',
  }),
  email: Joi.string().email().required().messages({
    'string.base': 'Email must be of type string',
    'string.email': 'Please provide a valid email address',
    'string.empty': 'Email is a required field',
  }),
})
