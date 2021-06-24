import { ConnectionOptions } from "typeorm"
import {User, Expense} from '../models'

const config: ConnectionOptions =({
    type: "postgres",
    host: process.env.HOST,
    port: parseInt(process.env.PORT_DB),
    username: process.env.USERNAME_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.DATABASE_DB,
    entities: [User, Expense],
    synchronize: true,
})

export default config