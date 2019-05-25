const ShoppingListService = require('../src/shopping-list-service');
const knex = require('knex');

describe(`Articles service object`, function() {
    let db
    let testShoppingList = [
        {
            id: 1,
            name: 'Taco Shells',
            price: "7.25",
            category: 'Main',
            checked: true,
            date_added: new Date('2029-01-22T16:28:32.615Z'),
        },
        {
            id: 2,
            name: 'Milk',
            price: "5.99",
            category: 'Breakfast',
            checked: true,
            date_added: new Date('2029-01-22T16:28:32.615Z'),
        },
        {
            id: 3,
            name: 'Coffee',
            price: "14.00",
            category: 'Main',
            checked: false,
            date_added: new Date('2029-01-22T16:28:32.615Z'),
        },
    ]

    before(() => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL,
        })
    })

    before(() => db('shopping_list').truncate())

    afterEach(() => db('shopping_list').truncate())

    after(() => db.destroy())

    context(`Given 'shopping_list' has data`, () => {
        beforeEach(() => {
            return db
                .into('shopping_list')
                .insert(testShoppingList)
        })

        it(`getAllItems() resolves all items from 'shopping_list' table`, () => {
            return ShoppingListService.getAllItems(db)
                .then(actual => {
                    expect(actual).to.eql(testShoppingList.map(item => ({
                        ...item,
                        date_added: new Date(item.date_added)
                    })))
                })
        })

        it(`getItemById() resolves an item by id from 'shopping_list' table`, () => {
            const secondId = 2
            const secondTestId = testShoppingList[secondId - 1]
            return ShoppingListService.getItemById(db, secondId)
                .then(actual => {
                    expect(actual).to.eql({
                        id: secondId,
                        name: secondTestId.name,
                        price: secondTestId.price,
                        category: secondTestId.category,
                        checked: secondTestId.checked,
                        date_added: secondTestId.date_added,
                    })
                })
        })

        it(`deleteItem() removes an item by id from the 'shopping-list' table`, () => {
            const itemId = 1
            return ShoppingListService.deleteItem(db, itemId)
                .then(() => ShoppingListService.getAllItems(db))
                .then(allItems => {[
                    {
                        id: 2,
                        name: 'Milk',
                        price: "5.99",
                        category: 'Breakfast',
                        checked: true,
                        date_added: new Date('2029-01-22T16:28:32.615Z'),
                    },
                    {
                        id: 3,
                        name: 'Coffee',
                        price: "14.00",
                        category: 'Main',
                        checked: false,
                        date_added: new Date('2029-01-22T16:28:32.615Z'),
                    },  
                ]
                const expected = testShoppingList.filter(item => item.id !== itemId)
                expect(allItems).to.eql(expected)
                })
        })

        it(`updateItem() updates item from the 'shopping_list' table`, () => {
            const idOfItemToUpdate = 2
            const newItemData = {
                name: "Milk",
                price: "7.99",
                category: 'Breakfast',
                checked: false,
                date_added: new Date(),
            }
            return ShoppingListService.updateItem(db, idOfItemToUpdate, newItemData)
                .then(() => ShoppingListService.getItemById(db, idOfItemToUpdate))
                .then(item => {
                    expect(item).to.eql({
                        id: idOfItemToUpdate,
                        ...newItemData,
                    })
                })
        })
    })

    context(`Given 'shopping-list' has no data`, () => {
        it(`getAllItems() resolves an empty array`, () => {
            return ShoppingListService.getAllItems(db)
                .then(actual => {
                    expect(actual).to.eql([])
                })
        })

        it(`insertItem() inserts a new item and resolves the new item with an id`, () => {
            const newItem = {
                name: "Bacon",
                price: "9.99",
                category: 'Breakfast',
                checked: true,
                date_added: new Date(),
            }
            return ShoppingListService.insertItem(db, newItem)
                .then(actual => {
                    expect(actual).to.eql({
                        id: 1,
                        name: newItem.name,
                        price: newItem.price,
                        category: newItem.category,
                        checked: newItem.checked,
                        date_added: newItem.date_added,
                    })
                })
        })

    })
})

