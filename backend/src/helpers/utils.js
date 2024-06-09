import crypto from 'node:crypto'

export const generateRandomToken = async () => {
  const randomBytes = await Promise.resolve(crypto.randomBytes(20))
  const randomCharacters = randomBytes.toString('hex')
  return randomCharacters
}

export const addExpiryHours = () => {
  let currentTime = new Date()
  let futureTime = new Date(currentTime.getTime() + 60 * 60 * 1000)
  return futureTime
}
