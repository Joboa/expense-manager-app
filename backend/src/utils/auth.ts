import { User } from '../models'
import { Request, Response, NextFunction } from 'express'
import { getRepository } from 'typeorm'
import jwt from 'jsonwebtoken'

// Generate new token
export const newToken = (user: any): string => {
  return jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_KEY, {
    expiresIn: process.env.JWT_EXPIRATION,
  })
}

// Verify token
export const verifyToken = (token: any): Promise<any> =>
  new Promise((resolve, reject) => {
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_KEY,
      (err: any, payload: any) => {
        if (err) return reject(err)
        resolve(payload)
      }
    )
  })

// Register a new user
export const signup = async (req: Request, res: Response): Promise<any> => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: 'need email and password' })
  }

  try {
    const userInfo = getRepository(User).create(req.body)
    const user = await getRepository(User).save(userInfo)
    const token = newToken(user)
    return res.status(201).send({ accessToken: token })
  } catch (err) {
    return res.status(500).end()
  }
}

// Sign in an already registered User
export const signin = async (req: any, res: any): Promise<any> => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: 'need email and password' })
  }

  const invalid = { message: 'Invalid email and password!' }

  try {
    const user = await getRepository(User).findOne({ email: req.body.email })

    if (!user) {
      return res.status(401).send(invalid)
    }

    // check if password is valid
    const match = await user.isValidPassword(req.body.password)

    if (!match) {
      return res.status(401).send(invalid)
    }

    const token = newToken(user)
    return res.status(201).send({ acessToken: token })
  } catch (err) {
    console.error(err)
    res.status(500).end()
  }
}

// Authenticate generated token
export const authenticateToken = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    return res.status(401).end()
  }

  const token = authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)

  let payload: any
  try {
    payload = await verifyToken(token)
  } catch (err) {
    return res.status(401).end()
  }

  const user = await getRepository(User).findOne(payload.id)

  if (!user) {
    return res.status(401).end()
  }

  req.user = user

  next()
}
