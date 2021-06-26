import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm'
import { IsEmail, Min, Max } from 'class-validator'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number

    @Min(2)
    @Max(100)
    @Column({ length: 100 })
    firstName!: string

    @Min(2)
    @Max(100)
    @Column({ length: 100 })
    lastName!: string

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
