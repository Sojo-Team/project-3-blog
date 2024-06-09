import Joi from 'joi'

export const resendEmailScheme = Joi.object().keys({
  email: Joi.string().required().email().message({
    'string.base': 'Email must be a string',
    'string.empty': 'Email must not be empty',
    'string.email': 'Please enter a valid email address',
  }),
})
