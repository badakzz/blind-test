exports.up = function (knex) {
    return knex.schema.createTable("guessed_songs", function (table) {
        table.increments()
        table.integer("user_id").notNullable()
        table.string("chatroom_id").notNullable()
        table.string("guess").notNullable()
        table.string("guess_type").notNullable() // "song" or "artist"
        table.timestamps(true, true)
        table
            .foreign("user_id")
            .references("user_id")
            .inTable("users")
            .onDelete("CASCADE")
            .onUpdate("CASCADE")

        table
            .foreign("chatroom_id")
            .references("chatroom_id")
            .inTable("chatrooms")
            .onDelete("CASCADE")
            .onUpdate("CASCADE")
    })
}

exports.down = function (knex) {
    return knex.schema.dropTable("guessed_songs")
}
