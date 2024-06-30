const express = require('express');
const database = require('./db/note.json');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();
const fs = require('fs');

app.use(express.json());

app.use(express.static('public'));


app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) => {
  res.json(database);
}
);

app.post('/api/notes', (req, res) => {
  // generate id
  req.body.id = Math.floor(Math.random()*100000000);
  // push note to database array
  database.push(req.body);
  // write updated array to database file
  fs.writeFileSync('./db/note.json', JSON.stringify(database));
  // send notes as response 
  res.json(database);
}
);

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});