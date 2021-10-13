'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductosSchema extends Schema {
  up () {
    this.create('productos', (table) => {
      table.increments('id')
      table.string("title").notNullable()
      table.float('price')
      table.string("thumbnail")      
    })
  }

  down () {
    this.drop('productos')
  }
}

module.exports = ProductosSchema
