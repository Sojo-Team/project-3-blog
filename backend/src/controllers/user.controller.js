import { BadRequestError, NotFoundError } from '../helpers/error-handler.js'
import { transporter } from '../helpers/mail.js'
import { generateRandomToken, addExpiryHours } from '../helpers/utils.js'
import User from '../models/user.model.js'
import { registerUserSchema } from '../schemes/auth/register-user.scheme.js'
import { resendEmailScheme } from '../schemes/auth/resend-email.scheme.js'

export const registerUser = async (req, res) => {
  const { error } = await Promise.resolve(registerUserSchema.validate(req.body))

  if (error?.details) {
    throw new BadRequestError(error.details[0].message)
  }

  const { firstName, lastName, email, password } = req.body

  const checkIfUserExists = await User.findOne({ email })

  if (checkIfUserExists) {
    throw new BadRequestError('User already exists')
  }

  const emailVerificationToken = await generateRandomToken()
  const emailVerificationTokenExpires = addExpiryHours()

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    emailVerificationToken,
    emailVerificationTokenExpires,
  })

  try {
    await transporter.sendMail({
      from: 'admin@blog.com',
      to: email,
      subject: 'Verify your email',
      html: `
    <p>Click on the link to verify your email</p>
    <a href="http://localhost:3000/verify-email/${emailVerificationToken}">Verify Email</a>
    <p>Verify your email before an hour</p>
    `,
    })
  } catch (error) {
    console.log(error)
  }

  return res.status(201).json({
    message: 'User created successfully',
    user,
  })
}

export const verifyEmail = async (req, res) => {
  const user = await User.findOne({ emailVerificationToken: req.params.token })
  if (!user) {
    throw new NotFoundError('User not found')
  }

  if (user.emailVerificationTokenExpires < new Date().toISOString()) {
    throw new BadRequestError('Token expired')
  }

  user.emailVerificationToken = ''
  user.emailVerificationTokenExpires = null
  user.emailVerified = true

  await user.save()

  return res.status(200).json({ message: 'Email verified successfully' })
}

export const resendEmail = async (req, res) => {
  const { error } = await Promise.resolve(resendEmailScheme.validate(req.body))

  if (error?.details) {
    throw new BadRequestError(error.details[0].message)
  }

  const { email } = req.body
}
