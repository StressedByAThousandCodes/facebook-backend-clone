/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .table('comment', function (table) {
        table.integer('ref_comment_id', 4).nullable();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
    .table('comment', function (table) {
        table.dropColumn('ref_comment_id');
    })
};
