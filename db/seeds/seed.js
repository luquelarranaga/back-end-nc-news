const format = require("pg-format");
const db = require("../connection")
const pgformat = require("pg-format")
const createLookUpObject = require("/Users/malula/NORTHCODERS/projects/nc-news-BE/db/seeds/utils.js")

const seed = async ({ topicData, userData, articleData, commentData }) => {
  //seeding is the process of populating your database.
  //Since we want to populate multiple databases that have the same structure (our test and development databases),
  //it's best to create a function that can dynamically populate our databases. 

  //we begin by dropping all tables. Consider the order here. 
  await db.query('DROP TABLE IF EXISTS comments');
  await db.query('DROP TABLE IF EXISTS articles');
  await db.query('DROP TABLE IF EXISTS topics');
  await db.query('DROP TABLE IF EXISTS users');

  //Then we create our tables. Consider the order here too (dependents should be created later)
  await db.query(`
    CREATE TABLE users(
      username VARCHAR PRIMARY KEY,
      name VARCHAR,
      avatar_url VARCHAR(1000));`);
    
  await db.query(`
    CREATE TABLE topics(
      slug VARCHAR PRIMARY KEY, 
      description VARCHAR,
      img_url VARCHAR(1000) 
    );`)

  await db.query(`
    CREATE TABLE articles(
      article_id SERIAL PRIMARY KEY,
      title VARCHAR,
      topic VARCHAR REFERENCES topics(slug),
      author VARCHAR REFERENCES users(username),
      body TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      votes INT DEFAULT 0,
      article_img_url VARCHAR(1000)
    );`)

  await db.query(`
    CREATE TABLE comments(
      comment_id SERIAL PRIMARY KEY,
      article_id INT REFERENCES articles(article_id) NOT NULL,
      body TEXT,
      votes INT DEFAULT 0,
      author VARCHAR REFERENCES users(username),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`)
  
  
  //Now we are ready to insert our columns, rows and data into our table. We want to do this dynamically.
  //To do so, we want to access our userData which was passed as an argument. This can either refer to our test or dev data. 
  //pgformat will allow us to format the data in a way where we can use it dynamically. 
  //Make sure to install it and require it into your file first before proceeding. 
  //First we must format our data so that we have an array of our values. More info here: https://l2c.northcoders.com/courses/sd-notes/back-end#sectionId=pg-format,step=intro
  const formattedUsers = userData.map((user) => {
    return [user.username, user.name, user.avatar_url]
  })

  //with our formatted data we can create our queryStr.
  //This essentially creates the block of SQL we will need to insert when we query our database later on. 
  const userQueryStr = format(
    `INSERT INTO users
    (username, name, avatar_url)
    VALUES %L
    RETURNING *;`, formattedUsers)
  
  //now that we have our string, we provide it to db.query which will then read it as SQL and proceed to insert the data into our db. 
  await db.query(userQueryStr);
  

  const formattedTopics = topicData.map((topic) => {
    return [topic.slug, topic.description, topic.img_url]
  })

  const topicsQueryStr = format(
    `INSERT INTO topics
    (slug, description, img_url)
    VALUES %L
    RETURNING *;`, formattedTopics)

  await db.query(topicsQueryStr);
  
  const formattedArticles = articleData.map((article) => {
    return [article.title, article.topic, article.author, article.body, article.created_at, article.votes, article.article_img_url]
  })

  const articleQueryStr = format(
    `INSERT INTO articles
    (title, topic, author, body, created_at, votes, article_img_url)
    VALUES %L
    RETURNING *;`, formattedArticles) 

  const articleResult = await db.query(articleQueryStr); //the result of this is an object
  
  const rows = articleResult.rows //the articleResult object contains a key called rows, which contains all our row info for articles. 

  const result = createLookUpObject(rows, "title", "article_id")

  const formattedComments = commentData.map((comment) => {
    return [result[comment.article_title], comment.body, comment.votes, comment.author, comment.created_at]
  })

  const queryStr = format( 
    `INSERT INTO comments
    (article_id, body, votes, author, created_at)
    VALUES %L
    RETURNING *;`, formattedComments)

  await db.query(queryStr);
 
};


module.exports = seed;