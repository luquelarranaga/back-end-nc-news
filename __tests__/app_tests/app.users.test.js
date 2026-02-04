const db = require("../../db/connection");
const data = require("../../db/data/test-data");
const seed = require("../../db/seeds/seed")
const request = require("supertest")
const app = require("../../app");

beforeEach(()=> {
    return seed(data)
});

afterAll(() => {
    return db.end
});

describe(("/api/users/"), () => {
    test(("GET 200: responds with the correct users object"), ()=> {
        return request(app)
        .get("/api/users/")
        .expect(200)
        .then(({body}) => {          
            const correctShape = body.every((user) => {
                return typeof user.username === "string" &&
                    typeof user.name === "string" &&
                    typeof user.avatar_url === "string"
            }) 
            expect(correctShape).toBe(true)
        })
    })
})
