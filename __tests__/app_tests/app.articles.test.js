const db = require("../../db/connection");
const data = require("../../db/data/test-data");
const seed = require("../../db/seeds/seed");
const request = require("supertest");
const app = require("../../app");

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  return db.end;
});

describe("/api/articles/", () => {
  test("GET 200: responds with an object with a key of articles with a value of an array of objects", () => {
    return request(app)
      .get("/api/articles/")
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeObject();
        expect(body.articles).toBeArray();
      });
  });
  test("GET 200: responds with the correct articles object", () => {
    return request(app)
      .get("/api/articles/")
      .expect(200)
      .then(({ body }) => {
        const { articles } = body;
        articles.forEach((article) => {
          expect(typeof article.author).toBe("string");
          expect(typeof article.title).toBe("string");
          expect(typeof article.article_id).toBe("number");
          expect(typeof article.topic).toBe("string");
          expect(typeof article.created_at).toBe("string");
          expect(typeof article.votes).toBe("number");
          expect(typeof article.article_img_url).toBe("string");
        });
      });
  });
  test("GET 200: articles object contains a key of total_comments", () => {
    return request(app)
      .get("/api/articles/")
      .expect(200)
      .then(({ body }) => {
        const { articles } = body;
        articles.forEach((article) => {
          expect(typeof article.total_comments).toBe("number");
        });
      });
  });
});

describe("/api/articles/:article_id", () => {
  test("GET 200: responds with an object with a key of articles with a value of an object", () => {
    return request(app)
      .get("/api/articles/2")
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeObject();
        expect(body.article).toBeArray();
      });
  });
  test("GET 200: responds with the correct article object", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({ body }) => {
        console.log("body of articles/article_id", body);
        const { article } = body;
        expect(typeof article[0].author).toBe("string");
        expect(typeof article[0].title).toBe("string");
        expect(typeof article[0].article_id).toBe("number");
        expect(typeof article[0].body).toBe("string");
        expect(typeof article[0].topic).toBe("string");
        expect(typeof article[0].created_at).toBe("string");
        expect(typeof article[0].votes).toBe("number");
        expect(typeof article[0].article_img_url).toBe("string");
      });
  });
  test("GET 200: article returned corresponds to correct article_id", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({ body }) => {
        const { article } = body;
        const isCorrectArticle = article[0].article_id === 1 ? true : false;
        expect(isCorrectArticle).toBe(true);
      });
  });
  test("400: returns error message when given wrong data type for article_id", () => {
    return request(app)
      .get("/api/articles/sjaks")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid ID data type!");
      });
  });
});

describe("invalid file path", () => {
  test("404: invalid file path returns error message", () => {
    return request(app)
      .get("/api/invalid-path/")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Path not found!");
      });
  });
});

//do method tests at the end ?
// - id is either wrong data type(400 (bad request), could send msg "invalid id type")
// - id not available in the db (404 (not found), could send back a message of "ID not found")
// 	- the id would return as undefined
// - typo within the rest of the path (400 (bad request), could send msg "path not found")
// - incorrect http method invoked (405 (method not allowed), "method not allowed")
