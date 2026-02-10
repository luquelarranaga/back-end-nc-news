// const app = require("./app");

// app.listen(8000, (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Listening on port 8000");
//   }
// });

const app = require("./app.js");
const { PORT = 9090 } = process.env;

app.listen(PORT, () => console.log(`Listening on ${PORT}...`));
