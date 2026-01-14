/* eslint-disable prettier/prettier */
import { belongsTo, column } from '@adonisjs/lucid/orm'
import BaseModel from './base_model.js'
import { slugify } from '@adonisjs/lucid-slugify'
import User from './user.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Task extends BaseModel {
  public static table = "tasks"

  @column()
  declare title: string

  @column()
  @slugify({ strategy: 'dbIncrement', fields: ['title'] })
  declare slug: string

  @column()
  declare description: string

  @column()
  declare status: string

  @column()
  declare longitude: number

  @column()
  declare latitude: number

  @column()
  declare createdBy: string

  @belongsTo(()=> User)
  declare user: BelongsTo<typeof User>
}