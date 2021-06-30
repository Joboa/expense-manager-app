import { Router } from 'express'
import controllers from '../controllers/user.controller'

const router = Router()

// /api/v1/users/
router.route('/')
  .get(controllers.getMany)
  .post(controllers.createOne)

// /api/v1/users/:id
router
  .route('/:id')
  .get(controllers.getOne)
  .put(controllers.updateOne)
  .delete(controllers.removeOne)

export default router
