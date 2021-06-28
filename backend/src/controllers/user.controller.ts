import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { User } from '../models'

class UserController {
    static createUser = async (req: Request, res: Response): Promise<any> => {
        const newUser = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password,
        }
        const user = getRepository(User).create(newUser)
        const createUserResult = await getRepository(User).save(user)
        return res.status(200).json(createUserResult)
    }

    static getUsers = async (req: Request, res: Response): Promise<any | null> => {
        const getUsersResult = await getRepository(User).find()
        getUsersResult
            ? res.status(200).json(getUsersResult)
            : res.status(400).send({ message: 'No users found!' })
    }

    static getUser = async (req: Request, res: Response): Promise<any | null> => {
        const id = req.params.id
        const getUserResult = await getRepository(User).findOne(id)
        if (!getUserResult)
            return res.status(400).send({ message: 'No user found!' })
        return res.json(getUserResult)
    }

    static updateUser = async (req: Request, res: Response): Promise<any> => {
        const id = req.params.id
        const updateUserInfo = await getRepository(User).findOne(id)
        if (updateUserInfo) {
            getRepository(User).merge(updateUserInfo, req.body)
            const updatedUserInfo = await getRepository(User).save(
                updateUserInfo
            )
            return res.json(updatedUserInfo)
        }
        return res.json({ message: 'User not found!' })
    }

    static deleteUser = async (req: Request, res: Response) => {
        const id = req.params.id
        const deleteAUser = await getRepository(User).delete(id)
        return res.json(deleteAUser)
    }
}

export default UserController
