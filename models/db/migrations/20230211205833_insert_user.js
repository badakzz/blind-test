exports.up = function (knex) {
    return knex("users").insert({
        user_name: "dwq",
        email: "lucas.deray@greenscope.io",
        password:
            "$2a$10$ql9M86cr18nuhzO24ZHiy.QQliXs/.wDiluVG0jYxyDG9B.bsGdZi",
        permissions: 1,
        is_active: true,
    })
}

exports.down = function (knex) {
    return knex("users").where({ email: "lucas.deray@greenscope.io" }).delete()
}
