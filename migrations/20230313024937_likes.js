/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('likes', function (table) {
        table.increments('id');
        table.date('created_at').notNullable();
        table.integer('post_id', 4).notNullable();
        table.integer('ref_user_id', 4).notNullable();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
    .dropTable('likes');
};
