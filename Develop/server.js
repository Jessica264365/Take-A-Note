const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
// const path = require("path");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));



require("./routes/apiroutes")(app);
require("./routes/htmlroutes")(app);

app.listen(PORT, () => {
  console.log("App listening on PORT: " + PORT);
});