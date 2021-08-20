import { User } from '../user'
import { TestDatabase } from './TestDatabase'
import { clone } from '../../utils/clone'

describe('Testing user component', () => {
  const database = new TestDatabase()
  const user = clone(new User())

  user.id = 1
  user.firstname = 'Vic'
  user.email = 'x@email.com'
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
        email: 'x@email.com',
        firstname: 'Vic',
        lastname: 'Sidious',
        password: 'pieTillIDie',
        createdAt: '2021-07-23'
      }
      const response = await database.app
        .get('/api/v1/users/' + data.id)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        // .expect(200)
      // console.log(response) // You have an error here
      expect(response.statusCode).toBe(200)
      // expect(response.body).toEqual({
      //   data: {
      //     id: expect.any(Number),
      //     firstname: expect.any(String),
      //     lastname: expect.any(String),
      //     email: expect.any(String),
      //     password: expect.any(String),
      //     createdAt: expect.any(String),
      //   },
      // })
    })
  })

  describe('POST /users/', () => {
    it('creates a User', async () => {
      const response = await database.app
        .post('/api/v1/users')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .send({
          id: 2,
          email: 'x@email.com',
          firstname: 'Vic',
          lastname: 'Sidious',
          password: 'pieTillIDie',
        })
        // .expect(201)

      expect(response.statusCode).toBe(201)
    })
  })

  describe.only('UPDATE /users/:id', () => {
    it('updates a User', async () => {
      const data = {
        id: 1,
        firstname: 'Vic',
        lastname: 'Sidious',
        email: 'x@email.com',
        password: 'pieTillIDie',
        createdAt: '25-12-06'
      }  

      let newDetails = {
        id: 1,
        firstname: 'John',
        lastname: 'Sidious',
        email: 'x@email.com',
        password: 'pieTillIDie',
        createdAt: '25-12-06'
      }

      const response = await database.app
        .put('/api/v1/users/' + user.id)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .send({newDetails})
        // .expect(200)
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
        // .expect(200)

      expect(response.statusCode).toBe(200)
    })
  })
})
