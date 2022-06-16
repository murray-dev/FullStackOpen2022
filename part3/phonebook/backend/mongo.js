const mongoose = require("mongoose");

const getURL = (password) => `mongodb+srv://murraydev:${password}@testcluster.\
qxwjakl.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model("Person", personSchema);

const displayAllPhoneEntries = (password) => {
    const url = getURL(password);

    mongoose
        .connect(url)
        .then(() => {

            Person.find({}).then(persons => {
                console.log("phonebook:");
                persons.forEach(person => console.log(person.name, person.number));
                mongoose.connection.close();
            });

        })
        .catch(err => console.log(err));
}

const addPersonToPhonebook = (password, name, number) => {
    const url = getURL(password);

    mongoose
        .connect(url)
        .then(() => {

            const person = Person({
                name: name,
                number, number,
            })

            person.save()
                .then(() => {
                    console.log(`added ${name} number ${number} to phonebook`);
                    mongoose.connection.close();
                })
                .catch(err => console.log(err));

        })
        .catch(err => console.log(err));
}

const displayUsageInfo = () => {
    console.log("Usage: node mongo.js <password> <?personName> <?personNumber>");
}

const params = process.argv.slice(2);

if (params.length === 0) {
    displayUsageInfo();
    process.exit(1)
} else if (params.length === 1) {
    displayAllPhoneEntries(...params);
} else if (params.length === 3) {
    addPersonToPhonebook(...params);
} else {
    displayUsageInfo();
    process.exit(1)
}

