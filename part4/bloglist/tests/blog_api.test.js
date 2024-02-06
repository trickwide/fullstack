const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})
describe('GET-requests', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('UID is defined as id instead of database default _id', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
  })
})

describe('Successful POST-requests', () => {
  test('New blog is added succesfully and total number of blogs is increased by one', async () => {
    const newBlog = helper.newBlog

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
  })

  test('New blog is added with correct content', async () => {
    const newBlog = helper.newBlog

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const blogsAfterPost = response.body

    const addedBlog = blogsAfterPost.find(
      (blog) => blog.title === newBlog.title
    )

    expect(addedBlog.title).toBe(newBlog.title)
    expect(addedBlog.author).toBe(newBlog.author)
    expect(addedBlog.url).toBe(newBlog.url)
    expect(addedBlog.likes).toBe(newBlog.likes)
  })

  test('Likes are set to 0 if missing from the request', async () => {
    const newBlogWithoutLikes = {
      title: 'Test blog without likes',
      author: 'Test author without likes',
      url: 'http://www.test.com/withoutlikes',
    }

    await api
      .post('/api/blogs')
      .send(newBlogWithoutLikes)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const addedBlog = response.body.find(
      (blog) => blog.title === newBlogWithoutLikes.title
    )
    expect(addedBlog.likes).toBeDefined()
    expect(addedBlog.likes).toBe(0)
  })
})

describe('Unsuccessful POST-requests', () => {
  test('Title is missing and respond is 400 Bad Rqeuest', async () => {
    const newBlogWithoutTitle = {
      author: 'Test author without title and url',
      url: 'http://www.test.com/withouttitle',
      likes: 0,
    }

    await api.post('/api/blogs').send(newBlogWithoutTitle).expect(400)
  })

  test('URL is missing and respond is 400 Bad Rqeuest', async () => {
    const newBlogWithoutUrl = {
      title: 'Test blog without url',
      author: 'Test author without url',
      likes: 0,
    }

    await api.post('/api/blogs').send(newBlogWithoutUrl).expect(400)
  })
})

describe('DELETE-requests', () => {
  test('Blog is deleted succesfully and total number of blogs is decreased by one', async () => {
    const response = await api.get('/api/blogs')
    const blogsBeforeDelete = response.body

    await api.delete(`/api/blogs/${blogsBeforeDelete[0].id}`).expect(204)

    const responseAfterDelete = await api.get('/api/blogs')
    const blogsAfterDelete = responseAfterDelete.body

    expect(blogsAfterDelete).toHaveLength(blogsBeforeDelete.length - 1)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
