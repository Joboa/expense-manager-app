import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

export const getOne =
  (model: any) =>
  async (req: Request, res: Response): Promise<any | null> => {
    try {
      const result = await getRepository(model).findOne({ id: req.params.id })

      if (!result) {
        return res.status(400).end()
      }

      res.status(200).json({ data: result })
    } catch (err) {
      console.error(err)
      res.status(400).end()
    }
  }

export const getMany =
  (model: any) =>
  async (req: Request, res: Response): Promise<any> => {
    try {
      const results = await getRepository(model).find()

      res.status(200).json({ data: results })
    } catch (err) {
      console.error(err)
      res.status(400).end()
    }
  }

export const createOne =
  (model: any) =>
  async (req: Request, res: Response): Promise<any> => {
    try {
      const getData = getRepository(model).create({ ...req.body })
      const result = await getRepository(model).save(getData)
      res.status(201).json({ data: result })
    } catch (err) {
      console.error(err)
      res.status(400).end()
    }
  }

export const updateOne =
  (model: any) =>
  async (req: Request, res: Response): Promise<any> => {
    try {
      const updateData = await getRepository(model).findOne({
        id: req.params.id,
      })
      if (updateData) {
        getRepository(model).merge(updateData, req.body)
        const updatedData = await getRepository(model).save(updateData)
        res.status(200).json({ data: updatedData })
      }
      return res.status(400).end()
    } catch (err) {
      console.error(err)
      res.status(400).end()
    }
  }

export const removeOne =
  (model: any) =>
  async (req: Request, res: Response): Promise<any> => {
    try {
      const removed = await getRepository(model).delete({ id: req.params.id })

      if (!removed) {
        return res.status(400).end()
      }

      return res.status(200).json({ data: removed })
    } catch (err) {
      console.error(err)
      res.status(400).end()
    }
  }

export const crudControllers = (model: any) => ({
  getOne: getOne(model),
  getMany: getMany(model),
  createOne: createOne(model),
  updateOne: updateOne(model),
  removeOne: removeOne(model),
})
