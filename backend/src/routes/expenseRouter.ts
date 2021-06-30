import { Router } from 'express'
import controllers from '../controllers/expense.controller'

const router = Router()

// /api/v1/expenses/
router
  .route('/')
  .get(controllers.getMany)
  .post(controllers.createOne)


  // /api/v1/expenses/:id
router
  .route('/:id')
  .get(controllers.getOne)
  .put(controllers.updateOne)
  .delete(controllers.removeOne)

export default router
