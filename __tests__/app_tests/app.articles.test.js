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
    test("articles are returned sorted in descending value when one column is passed in", () => {
      return request(app)
        .get("/api/articles?sort_by=author")
        .expect(200)
        .then(({ body }) => {
          const { articles } = body;
          expect(articles).toBeSortedBy("author", { descending: true });
        });
    });
    test("articles are returned in ascending order is specified ", () => {
      return request(app)
        .get("/api/articles?order=asc")
        .expect(200)
        .then(({ body }) => {
          const { articles } = body;
          expect(articles).toBeSorted({ ascending: true });
        });
    });
    test("articles are filtered by the topic specified in the query", () => {
      return request(app)
        .get("/api/articles?topic=mitch")
        .expect(200)
        .then(({ body }) => {
          const { articles } = body;
          articles.forEach((article) => {
            expect(article.topic).toBe("mitch");
          });
        });
    });
    describe("ERRORS 400", () => {
      test("returns error message when invalid value passed into sort by query", () => {
        return request(app)
          .get("/api/articles?sort_by=vegetable")
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe("Invalid query");
          });
      });
      test("returns error message when invalid value passed into order query", () => {
        return request(app)
          .get("/api/articles?order=vegetable")
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe("Invalid query");
          });
      });
      test("returns error message when invalid value passed into topic query", () => {
        return request(app)
          .get("/api/articles?topic=vegetable")
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe("Invalid query");
          });
      });
    });
    describe("ERRORS 405", () => {
      test("405: incorrect http method returns an error message", () => {
        const methods = ["put", "patch", "post", "delete"];
        methods.forEach((method) => {
          return request(app)
            [method]("/api/articles/")
            .expect(405)
            .then(({ body }) => {
              expect(body.msg).toBe("Method not allowed");
            });
        });
      });
    });
  });
});

describe("/api/articles/:article_id", () => {
  describe("GET 200", () => {
    test("responds with an object with a key of articles with a value of an object", () => {
      return request(app)
        .get("/api/articles/1")
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
    test("article object contains a key of total_comments", () => {
      return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then(({ body }) => {
          const { article } = body;
          expect(typeof article.total_comments).toBe("number");
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
  describe("PATCH 200: ", () => {
    test("responds with a single object", () => {
      return request(app)
        .patch("/api/articles/1")
        .send({ inc_votes: 5 })
        .expect(201)
        .then(({ body }) => {
          const { article } = body;
          expect(article).toBeObject();
          expect(article).not.toBeArray();
        });
    });
    test("article object contains the correct properties", () => {
      return request(app)
        .patch("/api/articles/1")
        .send({ inc_votes: 5 })
        .expect(201)
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
    test("the updated article corresponds to the correct article_id", () => {
      return request(app)
        .patch("/api/articles/1")
        .send({ inc_votes: 5 })
        .expect(201)
        .then(({ body }) => {
          const { article } = body;
          expect(article.article_id).toBe(1);
        });
    });
    test("votes are updated correctly", () => {
      return request(app)
        .patch("/api/articles/1")
        .send({ inc_votes: 5 })
        .expect(201)
        .then(({ body }) => {
          const { article } = body;
          expect(article.votes).toBe(105);
        });
    });
  });
  describe("ERROR 400", () => {
    test("returns error message trying to get article with invalid article id", () => {
      return request(app)
        .get("/api/articles/sjaks")
        .expect(400)
        .send()
        .then(({ body }) => {
          expect(body.msg).toBe("Invalid article id!");
        });
    });
    test("returns error message trying to patch article with invalid article id", () => {
      return request(app)
        .patch("/api/articles/sjaks")
        .expect(400)
        .send({ inc_votes: 5 })
        .then(({ body }) => {
          expect(body.msg).toBe("Invalid article id!");
        });
    });
    test("400: returns error message when provided invalid vote object", () => {
      return request(app)
        .patch("/api/articles/1")
        .send({})
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Invalid vote");
        });
    });
  });
  describe("ERROR 404", () => {
    test("returns error message when attempting to get an article id that doesn't exist in database", () => {
      return request(app)
        .get("/api/articles/9999999")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Article ID not found!");
        });
    });
    test("returns error message when attempting to patch an article id that doesn't exist in database", () => {
      return request(app)
        .patch("/api/articles/9999999")
        .send({ inc_votes: 5 })
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Article ID not found!");
        });
    });
  });
  describe("ERROR 405", () => {
    test("405: incorrect http method returns an error message", () => {
      const methods = ["put", "post", "delete"];
      methods.forEach((method) => {
        return request(app)
          [method]("/api/articles/1")
          .expect(405)
          .then(({ body }) => {
            expect(body.msg).toBe("Method not allowed");
          });
      });
    });
  });
});

describe("/api/articles/:article_id/comments", () => {
  describe("GET 200: ", () => {
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
            console.log(comment);
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
  });
  describe("POST 201", () => {
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
    test("comment object contains the correct properties", () => {
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
  });
  describe("ERROR 400: ", () => {
    test("returns error message when getting comment with invalid article_id", () => {
      return request(app)
        .get("/api/articles/jjska/comments")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Invalid article id!");
        });
    });
    test("returns error message when posting comment with invalid article_id", () => {
      return request(app)
        .post("/api/articles/jjska/comments")
        .send({ username: "butter_bridge", body: "this is my comment" })
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Invalid article id!");
        });
    });
    test("returns error message when posting comment with invalid comment", () => {
      return request(app)
        .post("/api/articles/1/comments")
        .send({ body: "butter_bridge" })
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Invalid comment!");
        });
    });
    describe("ERROR 404:", () => {
      test("returns error message getting a comment with an article_id that doesn't exist in database", () => {
        return request(app)
          .get("/api/articles/9999999/comments")
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).toBe("Article ID not found!");
          });
      });
      test("returns error message posting a comment with an article_id that doesn't exist in database", () => {
        return request(app)
          .post("/api/articles/9999999/comments")
          .send({ username: "butter_bridge", body: "this is my comment" })
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).toBe("Article ID not found!");
          });
      });
    });
  });
  describe("ERROR 405", () => {
    test("405: incorrect http method returns an error message", () => {
      const methods = ["put", "patch", "delete"];
      methods.forEach((method) => {
        return request(app)
          [method]("/api/articles/1/comments")
          .expect(405)
          .then(({ body }) => {
            expect(body.msg).toBe("Method not allowed");
          });
      });
    });
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
