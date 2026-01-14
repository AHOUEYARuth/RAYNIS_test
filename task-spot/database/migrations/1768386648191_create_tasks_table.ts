/* eslint-disable prettier/prettier */
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tasks'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('title').notNullable()
      table.string('slug').notNullable().unique()
      table.text('description').notNullable()
      table.enum('status', ['pending', 'validate', 'published', 'rejected', 'archived']).defaultTo('pending')
      table.float('longitude').notNullable()
      table.float('latitude').notNullable()
      table.uuid('created_by').references('id').inTable('users').onDelete('CASCADE')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}