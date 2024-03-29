exports.up = function (knex) {
    return knex.schema.createTable("chatrooms", (table) => {
        table.string("chatroom_id").primary()
        table.timestamp("created_at").defaultTo(knex.fn.now())
        table.timestamp("updated_at").defaultTo(knex.fn.now())
    })
}

exports.down = function (knex) {
    return knex.schema.dropTable("chatrooms")
}
