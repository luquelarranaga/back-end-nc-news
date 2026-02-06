const app = require("./app");

app.listen(8000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Listening on port 8000");
  }
});
