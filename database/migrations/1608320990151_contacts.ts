import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Contacts extends BaseSchema {
  protected tableName = 'contacts'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.timestamps(true)
      table.string('name')
      table.string('phone_number')
      table.string('photo')
      table.string('email')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
