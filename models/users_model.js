const db = require("../db/connection")

const fetchAllUsers = async () => {
    const result = await db.query(`SELECT * FROM users`)
    const {rows} = result
    return rows

}

module.exports = fetchAllUsers;