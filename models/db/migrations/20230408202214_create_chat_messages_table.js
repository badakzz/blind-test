exports.up = function (knex) {
    return knex.schema.createTable("chat_messages", (table) => {
        table.string("chat_message_id").primary()
        table.string("chatroom_id").notNullable()
        table.string("sender_id").notNullable()
        table.text("content").notNullable()
        table.boolean("is_flagged").defaultTo(false)
        table.string("reporter_id")
        table.timestamp("created_at").defaultTo(knex.fn.now())
        table.timestamp("updated_at").defaultTo(knex.fn.now())
    })
}

exports.down = function (knex) {
    return knex.schema.dropTable("chat_messages")
}
