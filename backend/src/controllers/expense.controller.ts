import { Expense } from '../models/'
import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

class ExpenseController {
  static createExpense = async (req: Request, res: Response): Promise<any> => {
    try {
      const newExpenses = { ...req.body }

      const expenditureResults = getRepository(Expense).create(newExpenses)
      const expenses = await getRepository(Expense).save(expenditureResults)

      return res.status(201).json({ data: expenses })
    } catch (err) {
      console.error(err)
      res.status(400).end()
    }
  }

  static getExpenses = async (
    req: Request,
    res: Response
  ): Promise<any | null> => {
    try {
      const getExpenseResults = await getRepository(Expense).find()

      if (!getExpenseResults)
        return res.status(400).send({ message: 'No expenses found!' })

      return res.status(200).json({ data: getExpenseResults })
    } catch (err) {
      console.error(err)
      res.status(400).end()
    }
  }

  static getExpense = async (
    req: Request,
    res: Response
  ): Promise<any | null> => {
    try {
      const { id } = req.params
      const getExpenseResult = await getRepository(Expense).findOne(id)

      if (!getExpenseResult)
        return res.status(400).send({ message: 'No expense found!' })

      return res.status(200).json({ data: getExpenseResult })
    } catch (err) {
      console.error(err)
      res.status(400).end()
    }
  }

  static updateExpense = async (req: Request, res: Response): Promise<any> => {
    try {
      const { id } = req.params
      const updateExpenseInfo = await getRepository(Expense).findOne(id)

      if (updateExpenseInfo) {
        getRepository(Expense).merge(updateExpenseInfo, req.body)
        const updatedExpenseInfo = await getRepository(Expense).save(
          updateExpenseInfo
        )
        return res.status(200).json({ data: updatedExpenseInfo })
      }

      return res.status(400).json({ message: 'Expense not found!' })
    } catch (err) {
      console.error(err)
      res.status(400).end()
    }
  }

  static deleteExpense = async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const deleted = await getRepository(Expense).delete(id)

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

export default ExpenseController
