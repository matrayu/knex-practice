const ShoppingListService = {
    getAllItems(knex) {
        return knex('shopping_list')
    },
    getItemById(knex, id) {
        return knex('shopping_list')
            .where({ id })
            .first()
    },
    deleteItem(knex, id) {
        return knex('shopping_list')
            .where({ id })
            .delete()
    },
    updateItem(knex, id, newItemFields) {
        return knex('shopping_list')
            .where({ id })
            .update(newItemFields)
    },
    insertItem(knex, newItem) {
        return knex
            .insert(newItem)
            .into('shopping_list')
            .returning('*')
            .then(rows => {
                return rows[0];
            });
    },
}

module.exports = ShoppingListService;