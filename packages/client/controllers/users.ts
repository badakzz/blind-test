import Knex from "knex"

export const createUser = async (user) => {
    try {
        const [newUser] = await Knex("users").insert(user).returning("*")
        return newUser
    } catch (err) {
        console.error(err)
        return null
    }
}

export const getUserById = async (id) => {
    try {
        const [user] = await Knex("users").where({ id })
        return user
    } catch (err) {
        console.error(err)
        return null
    }
}

export const updateUser = async (id, updates) => {
    try {
        const [updatedUser] = await Knex("users")
            .where({ id })
            .update(updates)
            .returning("*")
        return updatedUser
    } catch (err) {
        console.error(err)
        return null
    }
}

export const deleteUser = async (id) => {
    try {
        await Knex("users").where({ id }).del()
        return true
    } catch (err) {
        console.error(err)
        return false
    }
}
