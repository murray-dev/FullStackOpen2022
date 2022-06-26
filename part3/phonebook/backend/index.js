require("dotenv").config();
const { response } = require("express");
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

app.get('/info', (request, response) => {
  Person.estimatedDocumentCount()
    .then(length =>
      response.send(
        `<p>Phonebook has info for ${length} people</p>
        <p>${Date()}</p>`
      )
    )
    .catch(error => next(error));
});

app.get('/api/persons', (request, response, next) =>
  Person.find({})
    .then(persons => response.json(persons))
    .catch(error => next(error))
);

app.get('/api/persons/:id', (request, response, next) =>
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch(error => next(error))
);

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => response.status(204).end())
    .catch(error => next(error));
});

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  const person = Person({
    name: body.name,
    number: body.number,
  });

  person.save()
    .then(savedPerson => response.json(savedPerson))
    .catch(error => next(error));
});

app.put('/api/persons/:id', (request, response, next) => {

  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        const { number } = request.body;
        person.number = number;
        person.save()
          .then(updatedPerson => response.json(updatedPerson))
          .catch(error => next(error));
      } else {
        response.status(404).end();
      }
    })
    .catch(error => next(error));
});

const errorHandler = (error, request, response, next) => {
  console.log(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "Invalid id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).send({ error: error.message });
  }

  next(error);
}
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
