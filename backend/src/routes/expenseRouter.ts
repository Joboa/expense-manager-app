import { Router } from 'express'
import ExpenseController from '../controllers/expense.controller'

const router = Router()

// /api/v1/expenses/
router
  .route('/')
  .get(ExpenseController.getExpenses)
  .post(ExpenseController.createExpense)

// /api/v1/expenses/:id
router
  .route('/:id')
  .get(ExpenseController.getExpense)
  .put(ExpenseController.updateExpense)
  .delete(ExpenseController.deleteExpense)

export default router
