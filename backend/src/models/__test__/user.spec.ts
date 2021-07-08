import { User } from '../user'
import { TestDatabase } from './TestDatabase'
import { clone } from '../../utils/clone'

describe('Testing user component', () => {
  const database = new TestDatabase()
  const user = clone(new User())

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
    it('retrieves a User', async () => {
      const response = await database.app
        .get('/api/v1/users')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)

      expect(response.statusCode).toBe(200)
    })
  })
})
