/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('friends', function (table) {
        table.uuid('id');
        table.timestamp('created_at').notNullable();
        table.timestamp('updated_at').notNullable();
        table.uuid('from_user').notNullable();
        table.uuid('to_user').notNullable();
        table.text('status', 8).notNullable
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
    .dropTable('friends');
};
