import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('blog test', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Jest',
    url: 'https://jestjs.io/',
    likes: 10,
    user: {
      username: 'test',
      name: 'Test User',
    }
  }

  const handleLike = jest.fn()

  beforeEach(() => {
    render(<Blog blog={blog} updateLikes={handleLike} />)
  })

  test('renders only blog title and author', () => {
    const element = screen.getByText('Component testing is done with react-testing-library Jest')
    expect(element).toBeDefined()

    const urlElement = screen.queryByText('https://jestjs.io/')
    expect(urlElement).toBeNull()
    const likesElement = screen.queryByText(10, { exact: false })
    expect(likesElement).toBeNull()

    const { container } = render(<Blog blog={blog} />)

    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent('Jest')
  })

  test('clicking the view button shows blog details', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('View')
    await user.click(button)

    const urlElement = screen.getByText('https://jestjs.io/')
    expect(urlElement).toBeDefined()
  })

  test('clicking the like button twice calls the event handler two times', async () => {
    const user = userEvent.setup()
    const viewButton = screen.getByText('View')
    await user.click(viewButton)
    const likeButton = screen.getByText('Like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(handleLike.mock.calls).toHaveLength(2)
  })
})

