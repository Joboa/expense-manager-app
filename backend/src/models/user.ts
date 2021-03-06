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
  async hashPassword(): Promise<void> {
    this.password = await bcrypt.hash(this.password, BCRYPT_HASH_ROUND)

  }

  isValidPassword = (password: string) => {
    return bcrypt.compare(password, this.password)
  }

  @CreateDateColumn()
  createdAt!: Date
}
