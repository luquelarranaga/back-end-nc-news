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

describe(("/api/articles/"), () => {
    test(("GET 200: responds with the correct topics object"), ()=> {
        return request(app)
        .get("/api/articles/")
        .expect(200)
        .then(({body}) => {          
            const correctShape = body.every((article) => {
                return typeof article.author === "string" &&
                    typeof article.title === "string" &&
                    typeof article.article_id === "number" &&
                    typeof article.topic === "string" &&
                    typeof article.created_at === "string" &&
                    typeof article.votes === "number" &&
                    typeof article.article_img_url === "string" &&
                    typeof article.total_comments === "number"
            }) 
            expect(correctShape).toBe(true)
        })
    })
})
