import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('blog form calls the event handler with the right details', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const titleInput = screen.getByPlaceholderText('Write blog title')
  const authorInput = screen.getByPlaceholderText('Write blog author')
  const urlInput = screen.getByPlaceholderText('Write blog url')
  const createButton = screen.getByText('Create')

  await user.type(titleInput, 'test blog')
  await user.type(authorInput, 'test author')
  await user.type(urlInput, 'test url')
  await user.click(createButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('test blog')
  expect(createBlog.mock.calls[0][0].author).toBe('test author')
  expect(createBlog.mock.calls[0][0].url).toBe('test url')

})