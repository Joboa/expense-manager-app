import { Expense } from '../expense'
import { TestDatabase } from './TestDatabase'
import { clone } from '../../utils/clone'

describe('Testing expense component', () => {
  const database = new TestDatabase()
  const expense = clone(new Expense())

  expense.amount = 20
  expense.description = 'Bought a T-shirt'

  beforeEach(async () => {
    await database.init()
  })

  afterEach(async () => {
    await database.kill()
  })

  describe('GET /expenses/', () => {
    it('retrieves all Expenses', async () => {
      const response = await database.app
        .get('/api/v1/expenses')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        // .expect(200)

      expect(response.statusCode).toBe(200)
    })
  })

  describe('POST /expenses/', () => {
    it('creates an Expense', async () => {
      const response = await database.app
        .post('/api/v1/expenses')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .send({
          id: 1,
          amount: 20,
          description: 'Bought a T-shirt',
        })
        // .expect(201)

      expect(response.statusCode).toBe(201)
    })
  })

  describe('GET /expenses/:id', () => {
    it('retrieves an Expense', async () => {
      const data = {
        id: 1,
      }
      const response = await database.app
        .get('/api/v1/expenses/' + data.id)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        // .expect(200)

      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual({
        data: {
          id: expect.any(Number),
          amount: expect.any(Number),
          description: expect.any(String),
          createdAt: expect.any(String),
        },
      })
    })
  })

  describe('UPDATE /expenses/:id', () => {
    it('updates an Expense', async () => {
      const data = {
        id: 1,
        amount: 20,
        description: 'Bought a T-shirt',
      }
      const response = await database.app
        .put('/api/v1/expenses/' + data.id)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .send({
          amount: 50,
        })
        // .expect(200)

      expect(response.statusCode).toBe(200)
    })
  })

  describe('DELETE /expenses/:id', () => {
    it('deletes an Expense', async () => {
      const data = {
        id: 1,
      }
      const response = await database.app
        .delete('/api/v1/expenses/' + data.id)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        // .expect(200)

      expect(response.statusCode).toBe(200)
    })
  })
})
