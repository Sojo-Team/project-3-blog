import express from 'express'
import {
  registerUser,
  resendEmail,
  verifyEmail,
} from '../controllers/user.controller.js'

const router = express.Router()

router.post('/register', registerUser)
router.put('/verify-email/:token', verifyEmail)
router.put('/resend-email', resendEmail)

// frist arg url
// second arg function

export default router
