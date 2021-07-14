import { User } from '../user'
import { TestDatabase } from './TestDatabase'
import { clone } from '../../utils/clone'

describe('Testing user component', () => {
  const database = new TestDatabase()
  const user = clone(new User())

  user.id = 1
  user.email = 'x@email.com'
  user.firstname = 'Vic'
  user.lastname = 'Sidious'
  user.password = 'pieTillIDie'

  beforeEach(async () => {
    await database.init()
  })

  afterEach(async () => {
    await database.kill()
  })

  describe('GET /users/', () => {
    it('retrieves all Users', async () => {
      const response = await database.app
        .get('/api/v1/users')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)

      expect(response.statusCode).toBe(200)
    })
  })

  describe('GET /users/:id', () => {
    it('retrieves a User', async () => {
      const data = {
        id: 1,
      }
      const response = await database.app
        .get('/api/v1/users/' + data.id)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)

      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual({
        data: {
          id: expect.any(Number),
          firstname: expect.any(String),
          lastname: expect.any(String),
          email: expect.any(String),
          password: expect.any(String),
          createdAt: expect.any(String),
        },
      })
    })
  })

  describe('POST /users/', () => {
    it('creates a User', async () => {
      const response = await database.app
        .post('/api/v1/users')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .send({
          id: 1,
          email: 'x@email.com',
          firstname: 'Vic',
          lastname: 'Sidious',
          password: 'pieTillIDie',
        })
        .expect(201)

      expect(response.statusCode).toBe(201)
    })
  })

  describe('UPDATE /users/:id', () => {
    it('updates a User', async () => {
      const data = {
        id: 1,
        email: 'x@email.com',
        firstname: 'Vic',
        lastname: 'Sidious',
        password: 'pieTillIDie',
      }
      const response = await database.app
        .put('/api/v1/users/' + data.id)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .send({
          firstname: 'John',
        })
        .expect(200)

      expect(response.statusCode).toBe(200)
    })
  })

  describe('DELETE /users/:id', () => {
    it('deletes a User', async () => {
      const data = {
        id: 1,
      }
      const response = await database.app
        .delete('/api/v1/users/' + data.id)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)

      expect(response.statusCode).toBe(200)
    })
  })
})
