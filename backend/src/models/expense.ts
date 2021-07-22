import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm'

@Entity()
export class Expense {
  @PrimaryGeneratedColumn()
  id!: number

  @Column('double precision')
  amount!: number

  @Column({
    type: 'text',
  })
  description!: string

  // @Column({ nullable: true })
  // userId!: number;
  // @ManyToOne(() => User, (user: User) => user.expense)
  // @JoinColumn()
  // user!: User;

  @CreateDateColumn()
  createdAt!: Date
}
