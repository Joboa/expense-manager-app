import { User } from '../models/'
import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

class UserController {
  static getMe = async (req: any, res: Response) => {
    res.status(200).json({ data: req.user })
  }

  static createUser = async (req: Request, res: Response): Promise<any> => {
    try {
      const newUser = { ...req.body }

      const user = getRepository(User).create(newUser)
      const createUserResult = await getRepository(User).save(user)

      return res.status(201).json({ data: createUserResult })
    } catch (err) {
      console.error(err)
      res.status(400).end()
    }
  }

  static getUsers = async (
    req: Request,
    res: Response
  ): Promise<any | null> => {
    try {
      const getUsersResult = await getRepository(User).find()

      if (!getUsersResult)
        return res.status(400).send({ message: 'No user found!' })

      return res.status(200).json({ data: getUsersResult })
    } catch (err) {
      console.error(err)
      res.status(400).end()
    }
  }

  static getUser = async (req: Request, res: Response): Promise<any | null> => {
    try {
      const { id } = req.params
      const getUserResult = await getRepository(User).findOne(id)

      if (!getUserResult)
        return res.status(400).send({ message: 'No user found!' })

      return res.status(200).json({ data: getUserResult })
    } catch (err) {
      console.error(err)
      res.status(400).end()
    }
  }

  static updateUser = async (req: Request, res: Response): Promise<any> => {
    try {
      const { id } = req.params
      const updateUserInfo = await getRepository(User).findOne(id)

      if (updateUserInfo) {
        getRepository(User).merge(updateUserInfo, req.body)
        const updatedUserInfo = await getRepository(User).save(updateUserInfo)
        return res.status(200).json({ data: updatedUserInfo })
      }

      return res.status(400).json({ message: 'User not found!' })
    } catch (err) {
      console.error(err)
      res.status(400).end()
    }
  }

  static deleteUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const deleted = await getRepository(User).delete(id)

      if (!deleted) {
        return res.status(400).end()
      }

      return res.status(200).json({ data: deleted })
    } catch (err) {
      console.error(err)
      res.status(400).end()
    }
  }
}

export default UserController
