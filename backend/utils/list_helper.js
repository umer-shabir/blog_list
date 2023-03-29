const lodash = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, blogs) => {
        return sum + blogs.likes
    }

    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return null;    
    }

    const mostLiked = blogs.reduce((prev, curr) => {
        return prev.likes > curr.likes ? prev : curr
    })

    return {
        title: mostLiked.title,
        author: mostLiked.author,
        likes: mostLiked.likes
    }
}

const mostBlogs = (blogs) => {

    if (blogs.length === 0) {
        return null
    }

    const authorCount = lodash.countBy(blogs, 'author')

    const topAuthor = Object.keys(authorCount).reduce((prev, curr) => {
        return authorCount[prev] > authorCount[curr] ? prev : curr
    })

    return {
        author: topAuthor,
        blogs: authorCount[topAuthor]
    }
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) return null

    const likesCount = lodash(blogs).groupBy('author').map((objs, key) => ({
        author: key,
        likes: lodash.sumBy(objs, 'likes')
    }))
    .value()

    return likesCount.reduce((prev, curr) => {
        return prev.likes > curr.likes ? prev : curr
    }) 
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
}