import { User } from '../models'
import jwt from 'jsonwebtoken'

export const newToken = (user: any) => {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRATION,
  })
}

export const verifyToken = (token: any) => {
  new Promise((resolve: any, reject: any) => {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err: any, payload: any) => {
      if (err) return reject(err)
      resolve(payload)
    })
  })
}
