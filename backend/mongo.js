require('dotenv').config()
const { forEach } = require('lodash')
const mongoose = require('mongoose')

const url = process.env.TEST_MONGODB_URI

mongoose.set('strictQuery', false)
mongoose.connect(url)

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

const blog = new Blog({
    title: 'SecondTestBlog',
    author: 'TestUser2',
    url: 'Secondblog.com',
    likes: 1
})

/*blog.save().then(result => {
    console.log('saved')
    mongoose.connection.close()
})*/

Blog.find({}).then(result => {
    result.forEach(blog => {
        console.log(blog)
    })
    mongoose.connection.close()
})