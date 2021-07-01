import { User } from '../models'
import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import jwt from 'jsonwebtoken'

// Generate new token
export const newToken = (user: any) => {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRATION,
  })
}

// Verify token
export const verifyToken = (token: any) => {
  new Promise((resolve: any, reject: any) => {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err: any, payload: any) => {
      if (err) return reject(err)
      resolve(payload)
    })
  })
}

// Register a new user
export const signup = async (req: Request, res: Response) => {
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

// Authenticate generated token
// export const authenticateToken = async (req: Request, res: Response, next: any) => {
//   const authHeader = req.headers.authorization

//   if (!authHeader || !authHeader.startsWith('Bearer')) {
//     return res.status(401).end()
//   }

//   const token = authHeader.split(' ')[1]
//   if (token == null) return res.sendStatus(401)


//   jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
//     if (err) return res.sendStatus(403)
//     // req.user = user
//   })

  // let payload
  // try {
  //   payload = await verifyToken(token)
  // } catch (err) {
  //   return res.status(401).end()
  // }

  // const user = await getRepository(User).findOne(payload.id)

  // if (!user) {
  //   return res.status(401).end()
  // }

  
  // next()
// }
