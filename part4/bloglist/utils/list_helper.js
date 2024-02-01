const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (favorite, item) => {
    return favorite.likes > item.likes ? favorite : item
  }

  return blogs.reduce(reducer, {})
}

const mostBlogs = (blogs) => {
  const counted = _.countBy(blogs, 'author')
  const author = _.maxBy(Object.entries(counted), ([, value]) => value)[0]
  return { author, blogs: counted[author] }
}

const mostLikes = (blogs) => {
  const groupedByAuthor = _.groupBy(blogs, 'author')

  const likesPerAuthor = _.map(groupedByAuthor, (posts, author) => ({
    author,
    likes: _.sumBy(posts, 'likes'),
  }))

  const authorWithMostLikes = _.maxBy(likesPerAuthor, 'likes')

  return authorWithMostLikes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
