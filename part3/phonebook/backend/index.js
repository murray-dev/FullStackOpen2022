require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const Person = require("./models/person");

const app = express();

app.use(express.static('build'));
app.use(express.json());
morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
);

app.get('/info', (request, response) => {
  response.send(
    `<p>Phonebook has info for ${persons.length} people</p>
    <p>${Date()}</p>`
  );
});

app.get('/api/persons', (request, response) =>
  Person.find({}).then(persons => response.json(persons))
);

app.get('/api/persons/:id', (request, response) =>
  Person.findById(request.params.id)
    .then(person => response.json(person))
    .catch(e => response.status(404).end())
);

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter(person => person.id !== id);

  response.status(204).end();
});

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number missing'
    });
  }

  if (persons.find(p => p.name === body.name)) {
    return response.status(400).json({
      error: 'name must be unique'
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random() * 10 ** 12)
  }

  persons = persons.concat(person);

  response.json(person);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
