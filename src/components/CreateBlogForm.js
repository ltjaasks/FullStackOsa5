import PropTypes from 'prop-types'
import { useState } from 'react'

const CreateBlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    console.log('BLOGI-INFOT', newTitle, newAuthor, newUrl)
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    })
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={addBlog}>
        <div>
            title:
          <input
            id='title'
            value={newTitle}
            onChange={handleTitleChange}
            data-testid='title'
          />
        </div>
        <div>
            author:
          <input
            id='author'
            value={newAuthor}
            onChange={handleAuthorChange}
            data-testid='author'
          />
        </div>
        <div>
            url:
          <input
            id='url'
            value={newUrl}
            onChange={handleUrlChange}
            data-testid='url'
          />
        </div>
        <button type='submit'>Create</button>
      </form>
    </div>
  )
}

CreateBlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default CreateBlogForm