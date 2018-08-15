exports.up = function (knex, Promise) {
  return knex.schema.createTable('recipes', (table) => {
    table.increments();
    table.string('name');
    table.string('slug');
    table.text('description').nullable();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('recipes');
};
