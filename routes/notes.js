const notes = require('express').Router();
const uuid = require('../helpers/uuid');

const { readFromFile, readAndAppend } = require('../helpers/fsUtils');

notes.get('/notes', (req, res) => {
  readFromFile('../db/note.json').then((data) => res.json(JSON.parse(data)));
});

notes.post('/notes', (req, res) => {

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      noteID: uuid(),
    };

    readAndAppend(newNote, '../db/note.json');
    res.json(`Note added successfully`);
  } else {
    res.error('Error in adding note');
  }
}); 

module.exports = notes;