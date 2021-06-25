import { Request, Response} from 'express'
import { getRepository } from 'typeorm'
import {User} from '../models'

class UserController {
  static userCreate = async (req: Request, res: Response) => {
    const newUser = {
      firstName : req.body.firstName,
      lastName : req.body.lastName,
      email : req.body.email,
      password : req.body.password,
    }
    const user = getRepository(User).create(newUser)
    const result = await getRepository(User).save(user)
    return res.json(result)
  }
}

export default UserController