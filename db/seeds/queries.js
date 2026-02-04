//Right now the code below only queries our dev dv because node's environment is set to "development" (see connection.js)
//In order to query our test db, we have the following options:
//OPTION1: manually set node to test inside our file by adding this on top row: process.env.NODE_ENV = "test" 

//OPTION2: specify in terminal by adding NODE_ENV=TEST prior to node
//e.g.: NODE_ENV=test node /Users/malula/NORTHCODERS/projects/nc-news-BE/db/seeds/queries


//OPTION 3 create a script in package.json file. 
//e.g. "query-test-data": "NODE_ENV=test node /Users/malula/NORTHCODERS/projects/nc-news-BE/db/seeds/queries"
//now you can simply type the following in terminal: npm run query-test-data

const db = require("../connection")

const query = async () => {
   const table = await db.query(
    `SELECT * FROM comments
    WHERE votes > 10`
   )

   console.log(table.rows)
}

query();

//RUN DEV 