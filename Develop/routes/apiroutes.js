const fs = require("fs");
const notes = fs.readFileSync("./db/db.json");
let jsonNotes = JSON.parse(notes);

module.exports = (app) => {
  app.get("/api/notes", (req, res) => {
    res.json(jsonNotes);
  });

  app.post("/api/notes", (req, res) => {
    let newNote = {
      id: Math.floor(Math.random() * 10000),
      title: req.body.title,
      text: req.body.text,
    };
    jsonNotes.push(newNote);

    fs.writeFile("./db/db.json", JSON.stringify(jsonNotes), (err) => {
      if (err) throw err;
    });
    res.send(newNote);
  });

  app.delete("/api/notes/:id", (req, res) => {
    const id = req.params.id;
    jsonNotes = jsonNotes.filter((note) => {
      note.id !== id;
    });
    fs.writeFile("./db/db.json", JSON.stringify(jsonNotes), (err) => {
      if (err) throw err;
    });
    res.send(jsonNotes);
  });
};
