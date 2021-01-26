import Knex from 'knex';

exports.up = function(knex: Knex, promise:Promise<void>) {
    return knex.schema.table('users', function (table) {
        table.boolean('is_proffy').defaultTo(false);
    });
  }

exports.down = function(knex:Knex, promise: Promise<void>) {
    return knex.schema.table('users', function(table) {
      table.dropColumn('is_proffy');
    });
}