import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export class Expense {

  @PrimaryGeneratedColumn()
  id: number;

  @Column("double")
  amount: number;

  @Column({
    length: 150
  })
  description: string;

  @Column()
  date: Date;
}

