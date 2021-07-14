import { Router } from 'express'
import UserController from '../controllers/user.controller'

const router = Router()

// api/v1/users/me
router.get('/me', UserController.getMe)

// /api/v1/users/
router.route('/')
  .get(UserController.getUsers)
  .post(UserController.createUser)

// /api/v1/users/:id
router
  .route('/:id')
  .get(UserController.getUser)
  .put(UserController.updateUser)
  .delete(UserController.deleteUser)

export default router
