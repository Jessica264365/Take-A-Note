const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve static files in the public folder
app.use(express.static("public"));
//api and html modules for the routes
require("./routes/apiroutes")(app);
require("./routes/htmlroutes")(app);

app.listen(PORT, () => {
  console.log("App listening on PORT: " + PORT);
});
