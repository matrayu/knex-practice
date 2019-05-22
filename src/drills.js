require('dotenv').config();
const knex = require('knex');

const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL,
});

/* function searchByItem(searchTerm) {
    knexInstance
    .select('name', 'price', 'category')
    .from('shopping_list')
    .where('name', 'ilike', `%${searchTerm}%`)
    .then(result => {
        console.log(result)
    })
}

searchByItem('Bur')

function paginateProducts(pageNumber) {
    const productsPerPage = 6
    const offset = productsPerPage * (pageNumber - 1)
    knexInstance
      .select('id', 'name', 'price', 'category')
      .from('shopping_list')
      .limit(productsPerPage)
      .offset(offset)
      .then(result => {
        console.log(result)
      })
}
  
paginateProducts(2) 

function getItemsAddedAfter(daysAgo) {
    knexInstance
        .select('id', 'name', 'price', 'category', 'date_added')
        .where(
            'date_added', 
            '<', 
            knexInstance.raw(`now() - '?? days'::Interval`, daysAgo)
        )
        .from('shopping_list')
        .then(result => {
            console.log(result)
        })
}

getItemsAddedAfter(20);

*/

function totalCategoryCosts() {
    knexInstance
        .select('category')
        .from('shopping_list')
        .groupBy('category')
        .sum('price AS total')
        .then(result => {
            console.log(result)
        })
}

totalCategoryCosts();

function costPerCategory() {
    knexInstance
      .select('category')
      .count('price as total')
      .from('shopping_list')
      .groupBy('category')
      .then(result => {
        console.log('COST PER CATEGORY')
        console.log(result)
      })
}

costPerCategory()

function sumItemCategories(){
    knexInstance('shopping_list')
      .select('category')
      .count('name AS items')
      .sum('price AS total')
      .select(knexInstance.raw('ROUND(AVG(price), 2) AS average'))
      .groupBy('category')
      .then(res => console.log(res));
}

sumItemCategories()
