exports.up = async function (knex) {
    return knex.schema.createTable("scoreboard", (table) => {
        table.increments("score_id").primary()
        table.string("chatroom_id").notNullable()
        table.integer("user_id").unsigned().notNullable()
        table.integer("score").unsigned().defaultTo(0)

        table
            .foreign("chatroom_id")
            .references("chatroom_id")
            .inTable("chatrooms")
            .onDelete("CASCADE")
            .onUpdate("CASCADE")

        table
            .foreign("user_id")
            .references("user_id")
            .inTable("users")
            .onDelete("CASCADE")
            .onUpdate("CASCADE")

        table.unique(["chatroom_id", "user_id"])
    })
}

exports.down = async function (knex) {
    return knex.schema.dropTableIfExists("scoreboard")
}
