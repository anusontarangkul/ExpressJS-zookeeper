const { filterByQuery, findById, createNewAnimal, validateAnimal } = require('../../lib/animal');
const { animals } = require('../../data/animals.json');
const router = require('express').Router();

router.get('/animals', (req, res) => {
    let results = animals;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results)
});

router.get('/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

router.post('/animals', (req, res) => {
    // set id based on what the nexct index of the array will be
    req.body.id = animals.length.toString();

    // validate data in req.body
    if (!validateAnimal(req.body)) {
        res.status(400).send('The animal is not properly formatted.')
    } else {
        // add animal to json file and aimals array
        const animal = createNewAnimal(req.body, animals);
        res.json(animal);
    }
});

module.exports = router;