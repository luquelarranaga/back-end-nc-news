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
    test("responds with no content", async () => {
      await request(app).delete("/api/comments/1").expect(204);
      await request(app).get("/api/comments/1").expect(404);
    });
  });
  describe("ERROR: ", () => {
    test("responds with error message when no comment_id provided ", async () => {
      await request(app)
        .delete("/api/comments/")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Path not found!");
        });
    });
  });
});
