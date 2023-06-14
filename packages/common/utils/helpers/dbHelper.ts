import Knex from '../../../../models/knex'

export async function isFieldUnique(
    tableName: string,
    fieldName: string,
    fieldValue: string
): Promise<boolean> {
    const existingRecord = await Knex(tableName)
        .where(fieldName, fieldValue)
        .first()
    return !existingRecord
}
