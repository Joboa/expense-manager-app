import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm"
// import {Expense} from './expense'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  // @OneToMany((_type) => Expense, (expense: Expense) => expense.user)
  // expense!: Array<Expense>

  @CreateDateColumn()
  createdAt!: Date;

  // @UpdateDateColumn()
  // updatedAt!: Date;
}