const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

describe('Some initial blogs in database', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('testing unique id of blog', async () => {
        const response = await api.get('/api/blogs')

        const ids = response.body.map(blog => blog.id)

        for (id of ids) {
            expect(id).toBeDefined()
        }
    })

})

afterAll(async () => {
    await mongoose.connection.close()
})
