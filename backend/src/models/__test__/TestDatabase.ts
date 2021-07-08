import 'reflect-metadata'

process.env.NODE_ENV = 'test'

import { config } from 'dotenv'
config()

import { createConnection, ConnectionOptions, Connection } from 'typeorm'
import { createServer, Server as HttpServer } from 'http'

import express from 'express'
import supertest from 'supertest'

import { app } from '../../index'

import { User, Expense } from '..'

export class TestDatabase {
  private _app: express.Application
  private _connection: Connection
  private _server: HttpServer

  private connectionOptions: ConnectionOptions = {
    type: 'postgres',
    port: parseInt(process.env.PORT_DB),
    username: process.env.USERNAME_DB,
    password: process.env.PASSWORD_DB,
    database: 'expense_manager_test',
    entities: [User, Expense],
    synchronize: true,
    logging: false,
  }

  public get app(): supertest.SuperTest<supertest.Test> {
    return supertest(this._app)
  }

  public get connection(): Connection {
    return this._connection
  }

  public get server(): HttpServer {
    return this._server
  }

  public async init(): Promise<void> {
    await this.startup()
  }

  public async kill(): Promise<void> {
    this._server.close()
    this._connection.close()
  }

  private async startup(): Promise<void> {
    this._connection = await createConnection(this.connectionOptions)
    this._app = app
    this._server = createServer(this._app).listen(process.env.NODE_PORT)
  }
}
