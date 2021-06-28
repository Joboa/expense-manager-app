import { Router } from 'express'
import UserController from '../controllers/user.controller'

const router = Router()

router.post('/users', UserController.createUser)
router.get('/users', UserController.getUsers)
router.get('/users/:id', UserController.getUser)
router.patch('/users/:id', UserController.updateUser)
router.delete('/users/:id', UserController.deleteUser)

export default router
