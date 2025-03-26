// Get all blogs
function getBlogs() {
  const blogs = localStorage.getItem("blogs")
  return blogs ? JSON.parse(blogs) : []
}

// Get a single blog by ID
function getBlogById(id) {
  const blogs = getBlogs()
  return blogs.find((blog) => blog.id === id) || null
}

// Save blogs to localStorage
function saveBlogs(blogs) {
  localStorage.setItem("blogs", JSON.stringify(blogs))
}

// Add a new blog
function addBlog(blog) {
  const newBlog = {
    ...blog,
    id: Date.now().toString(),
    date: new Date().toISOString().split("T")[0],
  }

  const blogs = getBlogs()
  const updatedBlogs = [...blogs, newBlog]
  saveBlogs(updatedBlogs)

  return newBlog
}

// Delete a blog
function deleteBlogById(id) {
  const blogs = getBlogs()
  const updatedBlogs = blogs.filter((blog) => blog.id !== id)

  if (updatedBlogs.length === blogs.length) {
    return false // Blog not found
  }

  saveBlogs(updatedBlogs)
  return true
}

// Update a blog
function updateBlog(id, updatedData) {
  const blogs = getBlogs()
  const index = blogs.findIndex((blog) => blog.id === id)

  if (index === -1) {
    return null // Blog not found
  }

  const updatedBlog = {
    ...blogs[index],
    ...updatedData,
  }

  blogs[index] = updatedBlog
  saveBlogs(blogs)

  return updatedBlog
}

