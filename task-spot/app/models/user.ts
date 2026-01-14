/* eslint-disable prettier/prettier */
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import {  column, hasMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import BaseModel from './base_model.js'
import Task from './task.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  public static table = "users"

  @column()
  declare lastName: string 

  @column()
  declare firstName: string

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @hasMany(()=> Task)
  declare tasks: HasMany<typeof Task>

  static accessTokens = DbAccessTokensProvider.forModel(User)
}