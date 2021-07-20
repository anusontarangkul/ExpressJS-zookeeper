const fs = require('fs');
const {
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper,
} = require('../lib/zookeepers');
const { zookeepers } = require('../data/zookeepers.json');


jest.mock('fs');

test('creates a zookeeper object', () => {
    const zookeeper = createNewZookeeper(
        { name: 'Zach', id: '1', age: 24, favoriteAnimal: 'zebra' }, zookeepers
    );

    expect(zookeeper.name).toBe('Zach');
    expect(zookeeper.id).toBe('1');
    expect(zookeeper.age).toEqual(24);
    expect(zookeeper.favoriteAnimal).toBe('zebra');
});

test('filters by query', () => {
    const startingZooKeepers = [
        {
            name: 'Zach',
            id: '1',
            age: 24,
            favoriteAnimal: 'zebra'
        },
        {
            name: 'Megan',
            id: '2',
            age: 21,
            favoriteAnimal: 'tiger'
        }
    ];
    const updatedZooKeepers = filterByQuery({ name: 'Megan' }, startingZooKeepers);
    expect(updatedZooKeepers.length).toEqual(1);
});

test('finds by id', () => {
    const startingZooKeepers = [
        {
            name: 'Zach',
            id: '1',
            age: 24,
            favoriteAnimal: 'zebra'
        },
        {
            name: 'Megan',
            id: '2',
            age: 21,
            favoriteAnimal: 'tiger'
        }
    ];
    const result = findById('1', startingZooKeepers);
    expect(result.name).toBe('Zach');
})

test('validates zookeeper', () => {
    const validZooKeeper =
    {
        name: 'Zach',
        id: '1',
        age: 24,
        favoriteAnimal: 'zebra'
    };
    const invalidZooKeeper =
    {
        name: 'Megan',
        id: '2',
        age: '',
        favoriteAnimal: 'tiger'
    };

    const validResult = validateZookeeper(validZooKeeper);
    const invalidResult = validateZookeeper(invalidZooKeeper);

    expect(validResult).toBe(true);
    expect(invalidResult).toBe(false);
})




