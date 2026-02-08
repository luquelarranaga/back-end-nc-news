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

describe("GET: /api/articles/", () => {
  describe("GET 200", () => {
    test("responds with an object with a key of articles with a value of an array of objects", () => {
      return request(app)
        .get("/api/articles/")
        .expect(200)
        .then(({ body }) => {
          expect(body).toBeObject();
          expect(body.articles).toBeArray();
        });
    });
    test("responds with the correct articles object", () => {
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
    test("articles object contains a key of total_comments", () => {
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
});

describe("GET: /api/articles/:article_id", () => {
  describe("GET 200", () => {
    test("responds with an object with a key of articles with a value of an object", () => {
      return request(app)
        .get("/api/articles/2")
        .expect(200)
        .then(({ body }) => {
          expect(body).toBeObject();
          expect(body.article).toBeObject();
        });
    });
    test("responds with the correct article object", () => {
      return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then(({ body }) => {
          const { article } = body;
          expect(typeof article.author).toBe("string");
          expect(typeof article.title).toBe("string");
          expect(typeof article.article_id).toBe("number");
          expect(typeof article.body).toBe("string");
          expect(typeof article.topic).toBe("string");
          expect(typeof article.created_at).toBe("string");
          expect(typeof article.votes).toBe("number");
          expect(typeof article.article_img_url).toBe("string");
        });
    });
    test("article returned corresponds to correct article_id", () => {
      return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then(({ body }) => {
          const { article } = body;
          const isCorrectArticle = article.article_id === 1 ? true : false;
          expect(isCorrectArticle).toBe(true);
        });
    });
  });
  describe("Errors", () => {
    test("400: returns error message when given wrong data type for article_id", () => {
      return request(app)
        .get("/api/articles/sjaks")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Invalid ID data type!");
        });
    });
    test("404: returns error message when given input doesn't exist in database", () => {
      return request(app)
        .get("/api/articles/9999999")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Category ID not found!");
        });
    });
  });
});

describe("GET: /api/articles/:article_id/comments", () => {
  describe("200: ", () => {
    test("responds with an object with a key of comments with a value of an array of comments", () => {
      return request(app)
        .get("/api/articles/1/comments")
        .expect(200)
        .then(({ body }) => {
          expect(body).toBeObject();
          expect(body.comments).toBeArray();
        });
    });
    test("every comment object contains the correct properties", () => {
      return request(app)
        .get("/api/articles/1/comments")
        .expect(200)
        .then(({ body }) => {
          const { comments } = body;
          comments.forEach((comment) => {
            expect(typeof comment.comment_id).toBe("number");
            expect(typeof comment.votes).toBe("number");
            expect(typeof comment.created_at).toBe("string");
            expect(typeof comment.author).toBe("string");
            expect(typeof comment.body).toBe("string");
            expect(typeof comment.article_id).toBe("number");
          });
        });
    });
    test("the returned comments correspond to the correct article_id", () => {
      return request(app)
        .get("/api/articles/1/comments")
        .expect(200)
        .then(({ body }) => {
          const { comments } = body;
          comments.forEach((comment) => {
            expect(comment.article_id).toBe(1);
          });
        });
    });
    test("returns the correct number of comments per article", () => {
      return request(app)
        .get("/api/articles/1/comments")
        .expect(200)
        .then(({ body }) => {
          const { comments } = body;
          expect(comments.length).toBe(11);
        });
    });
    describe("Errors: ", () => {
      test("400: returns error message when given wrong data type for article_id", () => {
        return request(app)
          .get("/api/articles/jjska/comments")
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe("Invalid ID data type!");
          });
      });
      test("404: returns error message when given article_id doesn't exist in database", () => {
        return request(app)
          .get("/api/articles/9999999/comments")
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).toBe("Article ID not found!");
          });
      });
    });
  });
});

describe("POST: /api/articles/:article_id/comments", () => {
  describe("201: ", () => {
    test("responds with a single object", () => {
      return request(app)
        .post("/api/articles/1/comments")
        .send({ username: "butter_bridge", body: "this is my comment" })
        .expect(201)
        .then(({ body }) => {
          //we receive the object of the response, which contains a body that is our inserted comment
          const { comment } = body;
          expect(comment).toBeObject();
          expect(comment).not.toBeArray();
        });
    });
    test("every comment object contains the correct properties", () => {
      return request(app)
        .post("/api/articles/1/comments")
        .send({ username: "butter_bridge", body: "this is my comment" })
        .expect(201)
        .then(({ body }) => {
          const { comment } = body;
          expect(typeof comment.comment_id).toBe("number");
          expect(typeof comment.votes).toBe("number");
          expect(typeof comment.created_at).toBe("string");
          expect(typeof comment.author).toBe("string");
          expect(typeof comment.body).toBe("string");
          expect(typeof comment.article_id).toBe("number");
        });
    });
    test("the returned comments correspond to the correct article_id", () => {
      return request(app)
        .post("/api/articles/1/comments")
        .send({ username: "butter_bridge", body: "this is my comment" })
        .expect(201)
        .then(({ body }) => {
          const { comment } = body;
          expect(comment.article_id).toBe(1);
        });
    });
    describe("Errors: ", () => {
      test("400: returns error message when given wrong data type for article_id", () => {
        return request(app)
          .post("/api/articles/jjska/comments")
          .send({ username: "butter_bridge", body: "this is my comment" })
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe("Invalid ID data type!");
          });
      });
      test("400: returns error message when given comment object is missing username/body", () => {
        return request(app)
          .post("/api/articles/1/comments")
          .send({ body: "butter_bridge" })
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe("Invalid comment, missing username/body");
          });
      });
    });
    //     test("404: returns error message when given article_id doesn't exist in database", () => {
    //       return request(app)
    //         .get("/api/articles/9999999/comments")
    //         .expect(404)
    //         .then(({ body }) => {
    //           console.log("testing body>>> ", body);
    //           expect(body.msg).toBe("Article ID not found!");
    //         });
    //     });
    //
  });
});

describe("/api/invalid-path/", () => {
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
