const express = require('express');
const app = express();

const { animals } = require('./data/animals.json');

function filterByQuery(query, animalsArray) {
    let filteredResults = animalsArray;
    let personalityTraitsArray = [];

    if (query.personalityTraits) {
        // creates array if value is string
        if (typeof query.personalityTraits === 'string') {
            personalityTraitsArray = [query.personalityTraits]
            console.log(personalityTraitsArray)
        } else {
            personalityTraitsArray = query.personalityTraits;
            console.log(personalityTraitsArray)
        }
        personalityTraitsArray.forEach(trait => {
            filteredResults = filteredResults.filter(
                animal => animal.personalityTraits.indexOf(trait) !== -1
            );
        });
    }
    if (query.diet) {
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if (query.species) {
        filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    if (query.name) {
        filteredResults = filteredResults.filter(animal => animal.name === query.name)
    }
    return filteredResults;
}

app.get('/api/animals', (req, res) => {
    let results = animals;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results)
})

app.listen(3001, () => {
    console.log(`API Server now on PORT 3001`);
})