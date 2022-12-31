import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, handleRemove, user }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [showAll, setShowAll] = useState(false)

  const showDeleteButton = {
    display : (user.username === blog.user.username) ? '' : 'none'
  }

  if (!showAll) {
    return (
      <div style={blogStyle} className='aBlog'>
        {blog.title} {blog.author}
        <button onClick={() => setShowAll(true)}>view</button>
      </div>
    )
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title}
        <button onClick={() => setShowAll(false)}>hide</button>
      </div>
      <div>
        {blog.url}
      </div>
      <div>
      likes {blog.likes}
        <button onClick={() => handleLike(blog.id)}>like</button>
      </div>
      <div>
        {blog.user.name}
      </div>
      <div style={showDeleteButton}>
        <button onClick={() => handleRemove(blog.id)}>remove</button>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog