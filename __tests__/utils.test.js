const createLookUpObject = require("../db/seeds/utils")

describe("createLookUpObject", () => {
    test("does not mutate original input array", () => {
        const inputArray = [{name: "hey", age: 2}]
        const inputArrayClone = JSON.parse(JSON.stringify(inputArray))
        createLookUpObject(inputArray, "value1", "value2")
        expect(inputArray).toEqual(inputArrayClone)
    });
    test("returns an empty object when an empty array is passed in", () => {
        testCase = createLookUpObject([], "value1", "value2")
        expect(testCase).toEqual({})
    });
    test("returns object with single key-value pair when array of length 1 passed", () => {
        const array = [{name: "hey", age: 2}]
        const lookUpObject = createLookUpObject(array, "name", "age")
        const lookUpObjectLength = Object.keys(lookUpObject).length
        expect(array.length).toBe(lookUpObjectLength)
    });
    test("returns object who's number of key-pair values match the length of the array", () => {
        const array = [{name: "hey", age: 2}, {name: "hiya", age: 4}]
        const lookUpObject = createLookUpObject(array, "name", "age")
        const lookUpObjectLength = Object.keys(lookUpObject).length
        expect(array.length).toBe(lookUpObjectLength)
        const array2 = [{name: "hey", age: 2}, {name: "hiya", age: 4}, {name: "hi", age: 3}]
        const lookUpObject2 = createLookUpObject(array2, "name", "age")
        const lookUpObject2Length = Object.keys(lookUpObject2).length
        expect(array2.length).toBe(lookUpObject2Length)
    });
    test("The keys in the returned object match the key passed in as an argument", () => {
        const array = [{name: "hey", age: 2}]
        const key = "name"

        const lookUpObject = createLookUpObject(array, key, "age")
        const lookUpObjectKeys = Object.keys(lookUpObject)
        const correctKeys = lookUpObjectKeys.every((keyName) => {
            return keyName === array[0][key];
        })
        console.log("correctKeys :", correctKeys)
        expect(correctKeys).toBe(true)
    });
});
