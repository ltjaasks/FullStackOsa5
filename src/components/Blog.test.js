import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

let blog
let loggedUser

beforeAll(() => {
  blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Lauri J',
    url: 'joku.ff',
    likes: 3,
    user: {
      username: 'lauri',
      name: 'lauri testi'
    }
  }
  loggedUser = {
    username: 'lauri'
  }
})

test('renders title', () => {
  render(<Blog blog={blog} user={loggedUser}/>)

  const element = screen.getByText('Component testing is done with react-testing-library Lauri J')
  expect(element).toBeDefined()
})

test('renders url, likes and user when view-button has been pressed', async () => {
  render(<Blog blog={blog} user={loggedUser}/>)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const elementTitle = screen.getByText('Component testing is done with react-testing-library')
  const elementAuthor = screen.getByText('lauri testi')
  const elementUrl = screen.getByText('joku.ff')
  const elementLikes = screen.getByText('likes 3')

  expect(elementTitle).toBeDefined()
  expect(elementAuthor).toBeDefined()
  expect(elementUrl).toBeDefined()
  expect(elementLikes).toBeDefined()
})

test('When like-button is pressed twice the onClick-function is called twice', async () => {
  const mockHandler = jest.fn()
  render(<Blog blog={blog} handleLike={mockHandler} user={loggedUser}/>)

  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)
  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})