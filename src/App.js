import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import CreateBlogForm from './components/CreateBlogForm'

const LoginForm = (props) => {
  return (
    <div>
      <form onSubmit={props.handleLogin}>
        <div>
          username
          <input
            id='username'
            type="text"
            value={props.username}
            name="Username"
            onChange={({ target }) => props.setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id='password'
            type="password"
            value={props.password}
            name="Password"
            onChange={({ target }) => props.setPassword(target.value)}
          />
        </div>
        <button type='submit' id='loginButton' >Login</button>
      </form>
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState([])
  const [password, setPassword] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState([])
  const [createVisible, setCreateVisible] = useState(false)

  const showWhenVisible = { display: createVisible ? '' : 'none' }
  const hideWhenVisible = { display: createVisible ? 'none' : '' }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(
        blogs.sort((a, b) => b.likes - a.likes)
      )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const Notification = ({ message }) => {
    if (!message) return null
    return (
      <div>
        {message}
      </div>
    )
  }

  const handleLike = (id) => {
    const blog = blogs.find(n => n.id === id)
    console.log(user)
    const changedBlog = blog
    changedBlog.likes += 1
    console.log('muutettu blogi', changedBlog)
    blogService
      .update(id, changedBlog)
      .then(returnedBlog => {
        returnedBlog.user = changedBlog.user
        setBlogs(blogs.sort((a, b) => b.likes - a.likes))
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
      })
  }

  const handleRemove = (id) => {
    blogService
      .remove(id)
      .then(setBlogs(blogs.filter(blog => blog.id !== id)))
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })
      blogService.setToken(user.token)

      window.localStorage.setItem('loggedBlogAppUser',JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('wrong credentials')
      setNotification('Wrong username or password')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleLogOut = async (event) => {
    event.preventDefault()
    console.log('kirjaudutaan ulos')
    blogService.setToken(null)
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
      })
    setNotification(`A new blog ${blogObject.title} added`)
    setTimeout(() => {
      setNotification(null)
    }, 2000)
    setCreateVisible(false)
  }

  if (!user) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={notification}/>
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification}/>
      <div>
        {user.name} logged in
        <button onClick={handleLogOut}>logout</button>
      </div>
      <div style={hideWhenVisible}>
        <button onClick={() => setCreateVisible(true)}>new blog</button>
      </div>
      <div style={showWhenVisible} >
        <CreateBlogForm createBlog={addBlog} />
      </div>
      <div style={showWhenVisible}>
        <button onClick={() => setCreateVisible(false)}>cancel</button>
      </div>
      {blogs.map(blog =>
        <div key={blog.id} >
          <Blog
            blog={blog}
            handleLike={handleLike}
            handleRemove={handleRemove}
            user={user}
          />
        </div>
      )}
    </div>
  )
}

export default App