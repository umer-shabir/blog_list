const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const config = require('../utils/config')
const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are 6 blogs', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('blogs have id property named id instead of _id', async () => {
    const response = await api.get('/api/blogs')

    const ids = response.body.map((blog) => blog.id)

    for (const id of ids) {
      expect(id).toBeDefined()
    }
  })
})

describe('addition of a new blog', () => {
  let token = null
  beforeAll(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = await new User({ username: 'root', passwordHash }).save()

    const userForToken = { username: user.username, id: user.id }
    return (token = jwt.sign(userForToken, config.SECRET))
  })
  test('a valid blog can be added by authorized user', async () => {
    const newBlog = {
      title: 'New Blog',
      author: 'blogman',
      url: 'www.blog.com',
      likes: 100
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map((blog) => blog.title)

    expect(titles).toContain('New Blog')

  })

  test('blog without likes specified will have default 0 likes', async () => {
    const newBlog = {
      title: 'No likes Blog',
      author: 'blogman',
      url: 'www.blog.com',
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0)
  })

  test('backend responds with status 400 if title and url are missing', async () => {
    const blogWithoutTitle = {
      author: 'bloger',
      url: 'www.bloger.com',
      likes: 10,
    }

    const blogWithoutUrl = {
      title: 'Blog with no url',
      author: 'bloger',
      likes: 10,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(blogWithoutTitle)
      .expect(400)

    await api
      .post('/api/blogs')
      .send(blogWithoutUrl)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

describe('Deletion of a blog', () => {
  let token = null
  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = await new User({ username: 'root', passwordHash }).save()

    const userForToken = { username: user.username, id: user.id }
    token = jwt.sign(userForToken, config.SECRET)

    const newBlog = {
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
      likes: 0,
    }


    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    return token
  })
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await Blog.find({}).populate('user')
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await Blog.find({}).populate('user')
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

    const titles = blogsAtEnd.map(blog => blog.title)
    expect(titles).not.toContain(blogToDelete.title)
  })
  test('fails with status code 401 if user is not authorized', async () => {
    const blogsAtStart = await Blog.find({}).populate('user')
    const blogToDelete = blogsAtStart[0]

    let token = null

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(401)

    const blogsAtEnd = await Blog.find({}).populate('user')

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
    expect(blogsAtStart).toEqual(blogsAtEnd)
  })
})

describe('Updating a blog', () => {
  test('succeeds with status 200 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({ likes: 10 })
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    const updatedBlog = blogsAtEnd[0]
    expect(updatedBlog.likes).toBe(10)
  })
})


afterAll(async () => {
  await mongoose.connection.close()
})
