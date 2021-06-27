import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm'
import { IsEmail } from 'class-validator'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({nullable: true})
    firstname!: string

    @Column({nullable: true})
    lastname!: string

    @IsEmail()
    @Column({
        unique: true,
    })
    email!: string

    @Column()
    password!: string

    // @OneToMany((_type) => Expense, (expense: Expense) => expense.user)
    // expense!: Array<Expense>

    @CreateDateColumn()
    createdAt!: Date

    // @UpdateDateColumn()
    // updatedAt!: Date;
}
