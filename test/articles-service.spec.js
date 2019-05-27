const ArticlesService = require('../src/articles-service')
const knex = require('knex');

describe.skip(`Articles service object`, function() {
    // Knex instance before the tests run 
    let db

    //test data 'expected'
    let testArticles = [
        {
            id: 1,
            date_published: new Date('2029-01-22T16:28:32.615Z'),
            title: 'First test post!',
            content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?'
        },
        {
            id: 2,
            date_published: new Date('2100-05-22T16:28:32.615Z'),
            title: 'Second test post!',
            content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, exercitationem cupiditate dignissimos est perspiciatis, nobis commodi alias saepe atque facilis labore sequi deleniti. Sint, adipisci facere! Velit temporibus debitis rerum.'
        },
        {
            id: 3,
            date_published: new Date('1919-12-22T16:28:32.615Z'),
            title: 'Third test post!',
            content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus, voluptate? Necessitatibus, reiciendis? Cupiditate totam laborum esse animi ratione ipsa dignissimos laboriosam eos similique cumque. Est nostrum esse porro id quaerat.'
        },
    ]

    //before is a mocha hook
    //use the TEST_DB_URL to connect to the test database.
    before(() => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL,
        })
    })

    //truncate to clear the table so we have a fresh start every time we run the tests
    before(() => db('blogful_articles').truncate())

    //use an afterEach block to remove all of the data after each test
    afterEach(() => db('blogful_articles').truncate())

    //disconnect from the database at the end of all the tests
    //to exit and avoid hanging
    after(() => db.destroy())

    //Insert the test articles into the test database before the tests
    context(`Given 'blogful_articles' has data`, () => {
        beforeEach(() => {
            return db
                .into('blogful_articles')
                .insert(testArticles)
        })


        it(`getById() resolves an article by id from 'blogful_articles' table`, () => {
            //specify an id to access
            const thirdId = 3

            //specify array location to access the id
            const thirdTestArticle = testArticles[thirdId - 1]

            //"inject" the db variable to access the Knex instance passing in the id
            return ArticlesService.getById(db, thirdId)
                .then(actual => {
                    expect(actual).to.eql({
                        id: thirdId,
                        title: thirdTestArticle.title,
                        content: thirdTestArticle.content,
                        date_published: thirdTestArticle.date_published,
                    })
                })
        })

        //"inject" the db variable to access the Knex instance
        it(`getAllArticles() resolves all articles from 'blogful_articles' table`, () => {
            return ArticlesService.getAllArticles(db)
                .then(actual => {
                    expect(actual).to.eql(testArticles)
                })
        })

        it(`deleteArticle() removes an article by id from 'blogful_articles' table`, () => {
            //specify article id to delete
            const articleId = 3

            //"inject" the db variable to access the Knex instance passing in the id to delete
            return ArticlesService.deleteArticle(db, articleId)
                //then inject test data db into getAllArticles 
                .then(() => ArticlesService.getAllArticles(db))

                //then pass in the test data removing the deleted article
                .then(allArticles => {[
                    {
                        id: 1,
                        date_published: new Date('2029-01-22T16:28:32.615Z'),
                        title: 'First test post!',
                        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?'
                    },
                    {
                        id: 2,
                        date_published: new Date('2100-05-22T16:28:32.615Z'),
                        title: 'Second test post!',
                        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, exercitationem cupiditate dignissimos est perspiciatis, nobis commodi alias saepe atque facilis labore sequi deleniti. Sint, adipisci facere! Velit temporibus debitis rerum.'
                    },
                ]

                //variable filtering all items not equal to the id of the deleted article form testArticles
                const expected = testArticles.filter(article => article.id !== articleId)

                //expect statement
                expect(allArticles).to.eql(expected)
            })
        })
        
        it(`updateArticle() updates an article from the 'blogful_articles' table`, () => {
            //specify id of article we will update
            const idOfArticleToUpdate = 3
            
            //create object of updated article data
            const newArticleData = {
                title: 'updated title',
                content: 'updated content',
                date_published: new Date(),
            }

            //return updateArticle method injecting Knex instance db and passing in id to update
            // and newArticleData which updates the article
            return ArticlesService.updateArticles(db, idOfArticleToUpdate, newArticleData)

            //then access getById method injecting Knex instance db and pass in idOfArticleToUpdate
                .then(() => ArticlesService.getById(db, idOfArticleToUpdate))
            
                //then article returned is 3 from getById
                .then(article => {
                    
                    //expect article 3 (which was updated) to equal
                    expect(article).to.eql({
                        //pass in id of article that was updated
                        id: idOfArticleToUpdate,
                        //access all data in object using spread
                        ...newArticleData,
                    })
                })
        })
    })

    //context or describe are one in the same
    context(`Given 'blogful_articles' has no data`, () => {
        it(`getAllArticles() resolves an empty array`, () => {
            return ArticlesService.getAllArticles(db)
                .then(actual => {
                    expect(actual).to.eql([])
                })
        })

        it(`insertArticle() inserts a new article and resolves the new article with an id`, () => {
            //create new object to insert
            const newArticle = {
                date_published: new Date('2020-01-01T16:28:32.615Z'),
                title: 'Test new title',
                content: 'Test new content',
            }
            //return insertArticle method injecting the Knew instance db and passing the newArticle object
            return ArticlesService.insertArticle(db, newArticle)
                //assert that the method resolves the newly created article
                //this will fail if you don't use the .returning() method in the service
                .then(actual => {
                    expect(actual).to.eql({
                        id: 1,
                        title: newArticle.title,
                        content: newArticle.content,
                        date_published: newArticle.date_published,
                    })
                })
        })
    }) 
})
