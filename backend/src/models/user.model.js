import mongoose from 'mongoose'
import { hash, genSalt, compare } from 'bcrypt'

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true, index: true },
    lastName: { type: String, required: true, trim: true, index: true },
    email: { type: String, required: true, lowercase: true, unique: true },
    emailVerified: { type: Boolean, default: false },
    password: { type: String, required: true },
    role: { type: String, default: 'user', enum: ['user', 'admin'] },
    profilePicture: { type: String, default: '' },
    emailVerificationToken: { type: String, default: '' },
    emailVerificationTokenExpires: { type: Date, default: null },
    passwordResetToken: { type: String, default: '' },
    passwordResetTokenExpires: { type: Date, default: null },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform(_doc, ret) {
        delete ret.password
        return ret
      },
    },
    toObject: {
      virtuals: true,
    },
  }
)

userSchema.pre('save', async function () {
  if (this.isModified('password')) {
    const salt = await genSalt(10)
    const hashedPassword = await hash(this.password, salt)
    this.password = hashedPassword
  }
})

userSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`
})

const User = mongoose.model('User', userSchema)

export default User
