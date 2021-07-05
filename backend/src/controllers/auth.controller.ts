import { Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'
import { getRepository } from 'typeorm'
import { validate } from 'class-validator'
import {User} from '../models'

class AuthController {
  static login = async (req: Request, res: Response) => {

    let {email, password} = req.body
    if (!(email && password)) {
      res.status(400).send({ message: 'need email and password' })
    }


    const userRepository = getRepository(User)
    let user: User
    try {
      user = await userRepository.findOneOrFail({where: {email}})
    } catch (err) {
      res.status(401).send()
    }

    // check if password is valid
    const match = await user.isValidPassword(password)
    if (!match) {
      res.status(401).send({message: 'Invalid email and password!'})
      return
    }

    // Sign user with JWT
    const token = jwt.sign(
      {userId: user.id,  email: user.email},
      process.env.ACCESS_TOKEN_KEY,
      {expiresIn: '1h'}
    )

    res.status(201).send({accessToken: token})
  }


  static resetPassword = async (req: Request, res: Response) => {
    // Get valid ID from JWT 
    const id = res.locals.jwtPayload.userId

    const {oldPassword, newPassword} = req.body
    if (!(oldPassword && newPassword)) {
      res.status(400).send()
    }

    const userRepository = getRepository(User)
    let user: User
    try {
      user = await userRepository.findOneOrFail(id)
    }  catch (err) {
      res.status(401).send()
    }

    // check if password is valid
    const match = await user.isValidPassword(oldPassword)

    // Validate the user
    user.password = newPassword
    const errors = await validate(user)

    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }
    //Hash the new password and save
    userRepository.save(user);
    res.status(204).send();
}
}

export default AuthController