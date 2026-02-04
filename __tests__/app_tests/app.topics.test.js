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

describe(("/api/topics/"), () => {
    test(("GET 200: responds with the correct topics object"), ()=> {
        return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({body}) => {          
            const correctShape = body.every((topic) => {
                return typeof topic.slug === "string" &&
                    typeof topic.description === "string" &&
                    typeof topic.img_url === "string"
            }) 
            expect(correctShape).toBe(true)
        })
    })
})
