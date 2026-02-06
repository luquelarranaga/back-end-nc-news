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

describe("/api/topics/", () => {
  describe("GET 200", () => {
    test("responds with an object with a key of topics with a value of an array of objects", () => {
      return request(app)
        .get("/api/topics/")
        .expect(200)
        .then(({ body }) => {
          expect(body).toBeObject();
          expect(body.topics).toBeArray();
        });
    });
    test("responds with the correct topics object", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body }) => {
          const { topics } = body;
          topics.forEach((topic) => {
            expect(typeof topic.slug).toBe("string");
            expect(typeof topic.description).toBe("string");
            expect(typeof topic.img_url).toBe("string");
          });
        });
    });
  });
  //   describe("ERROR HANDLING", () => {
  //     test("404: incorrect path returns an error message", () => {
  //       return request(app)
  //         .get("/api/invalid-path/")
  //         .expect(404)
  //         .then(({ body }) => {
  //           expect(body.msg).toBe("Path not found!");
  //         });
  //     });
  //     // test("405: incorrect http method returns an error message", () => {
  //     //     const methods = ['']
  //     //     return request(app)

  //     // });
  //   });
});
