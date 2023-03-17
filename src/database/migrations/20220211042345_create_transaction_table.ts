import { Knex } from 'knex';
import { DatabaseSchema } from '../database.schema';
import { DatabaseTable } from '../database.tables';

export async function up(knex: Knex): Promise<void> {
  // return knex.transaction(async (trx: Knex.Transaction) =>
  knex.schema
    // .createSchemaIfNotExists(DatabaseSchema.sonalysisService)
    // .then(() =>
    // trx.schema
    .hasTable(DatabaseTable.transactions)
    .then((tableExists: boolean) => {
      if (!tableExists) {
        return knex.schema.createTable(
          DatabaseTable.transactions,
          (tableBuilder: Knex.CreateTableBuilder) => {
            tableBuilder.string('id').unique().notNullable().primary();
            tableBuilder.string('user_id').notNullable();
            tableBuilder.string('product_id').notNullable();
            tableBuilder.integer('transaction_amount').notNullable();
            tableBuilder.timestamps(true, true);
          },
        );
      }
    })
    .catch((e) => console.error('MIGRATION_ERROR', e));
  // );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .withSchema(DatabaseSchema.userService)
    .dropTableIfExists(DatabaseTable.transactions);
}
