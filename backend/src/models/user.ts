import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm'
import { IsEmail } from 'class-validator'
import * as bcrypt from 'bcryptjs'
const BCRYPT_HASH_ROUND = 8

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ nullable: true })
  firstname!: string

  @Column({ nullable: true })
  lastname!: string

  @IsEmail()
  @Column({
    unique: true,
  })
  email!: string

  @Column()
  password!: string

  @BeforeInsert()
  @BeforeUpdate()
  async beforeInsert() {
    this.password = await bcrypt.hash(this.password, BCRYPT_HASH_ROUND)
  }

  @CreateDateColumn()
  createdAt!: Date
}
