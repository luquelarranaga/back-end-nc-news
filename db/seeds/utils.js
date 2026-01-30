//article_id is one of the columns needed in out comments table.
//If we look at our comments data, we can see that article_id does not exist. But it does exist in our article data.
//Luckily, both our comments and article data contain info on article_title. 
// We can use this as a bridge between the two to acquire the respective article_id for the title. 

//array refers to the array of rows we have extracted from our bridging table
//key refers to the bridging key between the table
//In this case, article_title in our comments data allows us access title in the articles data.
//value is the name of the column/value we want to 

function createLookUpObject(array, key, value) { 
    const arrayClone = JSON.parse(JSON.stringify(array))

    const lookupObject = {}

    arrayClone.forEach((object) => {  //here we are iterating through the rows, and extracting the key pair {name_of_article: id}.
        lookupObject[object[key]] = object[value]
    })

    return lookupObject
};


module.exports = createLookUpObject;