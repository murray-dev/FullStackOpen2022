require("dotenv").config();
const express = require("express");
const { default: mongoose } = require("mongoose");
const morgan = require("morgan");
const Person = require("./models/person");

const app = express();

app.use(express.static('build'));
app.use(express.json());
morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
);

app.get('/api/persons', (request, response) =>
  Person.find({}).then(persons => response.json(persons))
);

app.get('/api/persons/:id', (request, response) =>
  Person.findById(request.params.id)
    .then(person => response.json(person))
    .catch(e => response.status(404).end())
);

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => response.status(204).end())
    .catch(error => next(error));
});

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number missing'
    });
  }

  const person = Person({
    name: body.name,
    number: body.number,
  });

  person.save().then(savedPerson => response.json(savedPerson));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
