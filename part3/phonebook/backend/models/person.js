require("dotenv").config();
const mongoose = require("mongoose");

const url = process.env.MONGODB_URL;

console.log("Connecting to: ", url);
mongoose.connect(url)
  .then(() => console.log("Connected to MongoDB."))
  .catch(e => console.log("Could not connect to MongoDB: ", e));

const personSchema = mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
    unique: true,
  },
  number: {
    type: String,
    minLength: 8,
    required: true,
    validate: {
      validator: number => /^\d{2,3}-\d+/.test(number)
    }
  },
});

personSchema.set("toJSON", {
  "transform": (document, returnObject) => {
    returnObject.id = returnObject._id.toString();
    delete returnObject._id;
    delete returnObject.__v;
  }
});

const Person = mongoose.model("Person", personSchema);
Person.init().catch(e => console.log(e.message));

module.exports = Person;
