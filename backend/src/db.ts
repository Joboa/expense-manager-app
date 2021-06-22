import { createConnection } from "typeorm";
import { Expense } from "./entity/Expense";

export const dbconnect = createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "joboa",
    password: "learningNode21",
    database: "expensedb",
    entities: [
        Expense
    ],
    synchronize: true,
    logging: false
})



// then(connection => {
//     // here you can start to work with your entities
// }).catch(error => console.log(error));