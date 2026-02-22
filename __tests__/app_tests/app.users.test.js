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

describe("/api/users/", () => {
  test("GET 200: responds with a key of topics with a value of an array of objects", () => {
    return request(app)
      .get("/api/users/")
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeObject();
        expect(body.users).toBeArray();
      });
  });
  test("GET 200: responds with the correct users object", () => {
    return request(app)
      .get("/api/users/")
      .expect(200)
      .then(({ body }) => {
        const { users } = body;
        users.forEach((user) => {
          expect(typeof user.username).toBe("string");
          expect(typeof user.name).toBe("string");
          expect(typeof user.avatar_url).toBe("string");
        });
      });
  });
  test("405: incorrect http method returns an error message", () => {
    const methods = ["put", "patch", "post", "delete"];
    methods.forEach((method) => {
      return request(app)
        [method]("/api/users")
        .expect(405)
        .then(({ body }) => {
          expect(body.msg).toBe("Method not allowed");
        });
    });
  });
});

describe("/api/users/:username", () => {
  describe("GET 200", () => {
    test("GET 200: responds with an object the properties username, avater_url, and name", () => {
      return request(app)
        .get("/api/users/butter_bridge")
        .expect(200)
        .then(({ body }) => {
          const { user } = body;
          console.log("username result>>>", user);
          expect(user).toBeObject();
          expect(typeof user.username).toBe("string");
          expect(typeof user.avatar_url).toBe("string");
          expect(typeof user.name).toBe("string");
        });
    });
    //   test("GET 200: responds with the correct users object", () => {
    //     return request(app)
    //       .get("/api/users/")
    //       .expect(200)
    //       .then(({ body }) => {
    //         const { users } = body;
    //         users.forEach((user) => {
    //           expect(typeof user.username).toBe("string");
    //           expect(typeof user.name).toBe("string");
    //           expect(typeof user.avatar_url).toBe("string");
    //         });
    //       });
    //   });
    // });
    // describe("ERROR 400", () => {
    //   test("405: incorrect http method returns an error message", () => {
    //     const methods = ["put", "patch", "post", "delete"];
    //     methods.forEach((method) => {
    //       return request(app)
    //         [method]("/api/users")
    //         .expect(405)
    //         .then(({ body }) => {
    //           expect(body.msg).toBe("Method not allowed");
    //         });
    //     });
    //   });
  });
});
