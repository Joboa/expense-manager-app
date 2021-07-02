import { User } from '../models'
import { Request, Response, NextFunction } from 'express'
import { getRepository } from 'typeorm'
import jwt from 'jsonwebtoken'

// Generate new token
export const newToken = (user: any): string => {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRATION,
  })
}

// Verify token
export const verifyToken = (token: any) => {
  new Promise(
    (resolve: (value: any) => void, reject: (reason?: any) => void) => {
      jwt.verify(
        token,
        process.env.JWT_SECRET_KEY,
        (err: any, payload: any) => {
          if (err) return reject(err)
          resolve(payload)
        }
      )
    }
  )
}

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

export const signin = async (req: Request, res: Response) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: 'need email and password' })
  }

  const invalid = { message: 'Invalid email and password!' }

  try {
    const user = await getRepository(User).findOne({ email: req.body.email })

    if (!user) {
      return res.status(401).send(invalid)
    }

    // const match = await user.checkPassword(req.body.password)
    const match = await user.isValidPassword(req.body.password)

    if (!match) {
      return res.status(401).send(invalid)
    }

    const token = newToken(user)
    return res.status(201).send({ acessToken: token })
  } catch (e) {
    console.error(e)
    res.status(500).end()
  }
}

// Authenticate generated token
// export const authenticateToken = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<any> => {
//   const authHeader = req.headers['authorization']

//   if (!authHeader || !authHeader.startsWith('Bearer')) {
//     return res.status(401).end()
//   }

//   const token = authHeader.split(' ')[1]
//   if (token == null) return res.sendStatus(401)

//   let payload
//   try {
//     payload = verifyToken(token)
//   } catch (err) {
//     return res.status(401).end()
//   }

//   const user = await getRepository(User).findOne(payload.id)
