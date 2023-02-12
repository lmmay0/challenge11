const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require('../../helpers/fsUtils');

// GET Route for retrieving all the tips
tips.get('/', (req, res) => {
  readFromFile('../db/db.json').then((data) => res.json(JSON.parse(data)));
});

// GET Route for a specific notes
tips.get('/:notes_id', (req, res) => {
  const notesId = req.params.notes_id;
  readFromFile('../db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => note.note_id === notesId);
      return result.length > 0
        ? res.json(result)
        : res.json('No note with that ID');
    });
});

// DELETE Route for a specific note
notes.delete('/:notes_id', (req, res) => {
  const noteId = req.params.notes_id;
  readFromFile('../db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      // Make a new array of all note except the one with the ID provided in the URL
      const result = json.filter((note) => note.note_id !== noteId);

      // Save that array to the filesystem
      writeToFile('../db/db.json', result);

      // Respond to the DELETE request
      res.json(`Item ${notesId} has been deleted 🗑️`);
    });
});

// POST Route for a new UX/UI note
notes.post('/', (req, res) => {
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      
    title: title,
    text: text,
      notes_id: uuidv4(),
    };

    readAndAppend(newNote, '../db/db.json');
    res.json(`Note added successfully 🚀`);
  } else {
    res.error('Error in adding note');
  }
});

module.exports = notes;
