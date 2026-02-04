const db = require("../db/connection")

const fetchAllTopics = async () => {
    const result = await db.query(`SELECT * FROM topics`)
    const {rows} = result
    return rows

}

module.exports = fetchAllTopics;