import { User } from '../user'
import { getRepository } from 'typeorm'

describe('User model', () => {
    describe('schema', () => {
        test('user entities', () => {
            const user = new User()
            user.id = 1
            user.firstName = 'firstName'
            user.lastName = 'lastName'
            user.email = 'email@email.com'
            user.password = 'password'
            expect(user).toEqual({
                id: 1,
                firstName: 'firstName',
                lastName: 'lastName',
                email: 'email@email.com',
                password: 'password',
            })
        })

        // test('lastName', () => {
        //   const user = new User
        //   user.lastName= "lastName"
        //   expect(user).toEqual({lastName: "lastName"})
        // })

        // test('email', () => {
        //   const user = new User
        //   user.email= "email@email.com"
        //   expect(user).toEqual({email: "email@email.com"})
        // })

        // test('password', () => {
        //   const user = new User
        //   user.password = "password"
        //   expect(user).toEqual({password: "password"})
        // })
    })
})
