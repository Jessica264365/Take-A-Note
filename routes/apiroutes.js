const fs = require("fs");
const notes = fs.readFileSync("./db/db.json");
let jsonNotes = JSON.parse(notes);
let db = require("../db/db.json");
console.log(db);

module.exports = (app) => {
  // Get all notes
  app.get("/api/notes", (req, res) => {
    res.json(jsonNotes);
  });
  // Post a new note
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
  // Delete a note with the given id
  app.delete("/api/notes/:id", (req, res) => {
    const id = parseInt(req.params.id);
    jsonNotes = jsonNotes.filter((note) => {
      return note.id !== id;
    });
    console.log(jsonNotes);
    fs.writeFile("./db/db.json", JSON.stringify(jsonNotes), (err) => {
      if (err) throw err;
    });
    res.send(jsonNotes);
  });
};
