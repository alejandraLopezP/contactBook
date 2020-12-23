import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Contacts extends BaseSchema {
  protected tableName = 'contacts'

  public async up () {
    this.schema.table(this.tableName, (table) => {
      table.boolean('favorite')
    })
  }

  public async down () {
    this.schema.table(this.tableName, (table) => {
      table.boolean('favorite')
    })
  }
}
