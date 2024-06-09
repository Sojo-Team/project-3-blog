import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: 'fb8d28fc0de079',
    pass: '2a5b83b25b2eb2',
  },
})
