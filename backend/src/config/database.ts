import { ConnectionOptions } from "typeorm"
import {User, Expense} from '../models'

const config: ConnectionOptions =({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "joboa",
    password: "learningNode21",
    database: "expensedb",
    entities: [User, Expense],
    synchronize: true,
})

export default config