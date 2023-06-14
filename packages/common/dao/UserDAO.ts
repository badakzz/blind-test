import Knex from '../../../models/knex'
import { TABLE } from '../constants'
import { isEmailValid } from '../../src/utils/helpers'
import { User } from '../types'

export async function createUser(userData) {
    return await Knex(TABLE.USERS)
        .insert(userData)
        .returning('*')
        .then((rows) => rows[0])
}

export async function getUserById(id) {
    return Knex.first('user_id', 'user_name', 'email', 'is_active')
        .where({
            user_id: id,
        })
        .from(TABLE.USERS)
}

export async function getUserByUsernameOrEmail(identifier): Promise<User> {
    return Knex(TABLE.USERS)
        .where(function () {
            if (isEmailValid(identifier)) {
                this.where('email', identifier)
            } else {
                this.where('user_name', identifier)
            }
        })
        .first()
}

export const updateUser = async (id, updates) => {
    try {
        const [updatedUser] = await Knex('users')
            .where({ id })
            .update(updates)
            .returning('*')
        return updatedUser
    } catch (err) {
        console.error(err)
        return null
    }
}

export const deleteUser = async (id) => {
    try {
        await Knex('users').where({ id }).del()
        return true
    } catch (err) {
        console.error(err)
        return false
    }
}
