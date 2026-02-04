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
    test(("GET 200: responds with the correct articles object"), ()=> {
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

describe(("/api/articles/:article_id"), () => {
    test(("GET 200: responds with the correct article object"), ()=> {
        return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then(({body}) => {          
            const correctShape = body.every((article) => {
                return typeof article.author === "string" &&
                    typeof article.title === "string" &&
                    typeof article.article_id === "number" &&
                    typeof article.body === "string" &&
                    typeof article.topic === "string" &&
                    typeof article.created_at === "string" &&
                    typeof article.votes === "number" &&
                    typeof article.article_img_url === "string"
            }) 
            expect(correctShape).toBe(true)
        })
    })
    test(("GET 200: article returned corresponds to correct article_id"), ()=> {
        return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then(({body}) => {      
            const isCorrectArticle = body[0].article_id === 1 ? true : false
            expect(isCorrectArticle).toBe(true)
        })
    })
})