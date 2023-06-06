/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    return knex.schema.createTable("playlists", (table) => {
        table.increments("playlist_id").primary()
        table.string("playlist_name").notNullable()
        table.integer("user_id").unsigned().notNullable()

        table
            .foreign("user_id")
            .references("user_id")
            .inTable("users")
            .onDelete("CASCADE")
            .onUpdate("CASCADE")
    })
}

exports.down = async function (knex) {
    return knex.schema.dropTableIfExists("playlists")
}

// might use that to bring up recent playlists used by user, or their imports
