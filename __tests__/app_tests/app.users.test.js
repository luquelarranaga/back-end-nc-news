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
    test(("GET 200: responds with an object with a key of users"), ()=> {
        return request(app)
        .get("/api/users/")
        .expect(200)
        .then(({body}) => {     
            console.log("body in test", body)     
            expect(body).toBeObject()
            expect(body.users).toBeArray()
        })
    })
    test(("GET 200: responds with the correct users object"), ()=> {
        return request(app)
        .get("/api/users/")
        .expect(200)
        .then(({body}) => {    
            const {users} = body      
            users.forEach((user)=> {
                expect(typeof user.username).toBe("string");
                expect(typeof user.name).toBe("string");
                expect(typeof user.avatar_url).toBe("string");
            })
        })
    })
})
