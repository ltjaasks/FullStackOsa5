import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateBlogForm from './CreateBlogForm'

test('the callback function is called with the right info', async () => {
  const user = userEvent.setup()
  const addBlog = jest.fn()

  render(<CreateBlogForm createBlog={addBlog} />)

  const inputTitle = screen.getByTestId('title')
  const inputAuthor = screen.getByTestId('author')
  const inputUrl = screen.getByTestId('url')
  const createButton = screen.getByText('Create')

  await user.type(inputTitle, 'testaillaan')
  await user.type(inputAuthor, 'latetestaaja')
  await user.type(inputUrl, 'joku-urli.testi')
  await user.click(createButton)

  console.log('BLOGI', addBlog.mock.calls[0][0].title)

  expect(addBlog.mock.calls[0][0]).toStrictEqual(
    {
      title: 'testaillaan',
      author: 'latetestaaja',
      url: 'joku-urli.testi'
    }
  )
})