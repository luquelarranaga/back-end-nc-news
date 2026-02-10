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

describe("/api/comments/:comments", () => {
  describe("DELETE: ", () => {
    test("responds with no content", () => {
      return request(app)
        .delete("/api/comments/1")
        .expect(200)
        .then(({ body }) => {
          expect(body.msg).toBe("comment deleted");
        });
      //   await request(app).get("/api/comments/1").expect(404);
    });
  });
  describe("ERROR: ", () => {
    test("responds with error message when no comment_id provided ", () => {
      return request(app)
        .delete("/api/comments/")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Path not found!");
        });
    });
    test("responds with error message when given invalid comment_id", () => {
      return request(app)
        .delete("/api/comments/ashjakhd")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Invalid comment!");
        });
    });
    test("responds with error message when given valid comment_id that doesn't exist in the database", () => {
      return request(app)
        .delete("/api/comments/9999")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Comment not found!");
        });
    });
    test("405: incorrect http method returns an error message", () => {
      const methods = ["put", "patch", "post", "get"];
      methods.forEach((method) => {
        return request(app)
          [method]("/api/comments/1")
          .expect(405)
          .then(({ body }) => {
            expect(body.msg).toBe("Method not allowed");
          });
      });
    });
  });
});
