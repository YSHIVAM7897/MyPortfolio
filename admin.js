 // Admin Functions
 function setupAdminPage() {
    const loginForm = document.getElementById("loginForm")
    const adminLoginSection = document.getElementById("adminLoginSection")
    const adminDashboardSection = document.getElementById("adminDashboardSection")
    const logoutBtn = document.getElementById("logoutBtn")
    const createBlogBtn = document.getElementById("createBlogBtn")
    const closeModalBtn = document.getElementById("closeModal")
    const blogModal = document.getElementById("blogModal")
    const blogForm = document.getElementById("blogForm")
  
    // Check if already logged in
    const isLoggedIn = sessionStorage.getItem("adminLoggedIn") === "true"
  
    if (isLoggedIn) {
      adminLoginSection.style.display = "none"
      adminDashboardSection.style.display = "block"
      loadAdminBlogs()
    }
  
    // Login form submission
    if (loginForm) {
      loginForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        const username = document.getElementById("username").value
        const password = document.getElementById("password").value
  
        // Simple authentication for demo purposes
        if (username === "admin" && password === "password") {
          sessionStorage.setItem("adminLoggedIn", "true")
          adminLoginSection.style.display = "none"
          adminDashboardSection.style.display = "block"
          loadAdminBlogs()
        } else {
          alert("Invalid credentials")
        }
      })
    }
  
    // Logout button
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        sessionStorage.removeItem("adminLoggedIn")
        adminLoginSection.style.display = "flex"
        adminDashboardSection.style.display = "none"
      })
    }
  
    // Create blog button
    if (createBlogBtn) {
      createBlogBtn.addEventListener("click", () => {
        document.getElementById("modalTitle").textContent = "Create New Blog Post"
        document.getElementById("blogId").value = ""
        document.getElementById("blogForm").reset()
        document.getElementById("imagePreview").style.display = "none"
        blogModal.classList.add("active")
      })
    }
  
    // Close modal button
    if (closeModalBtn) {
      closeModalBtn.addEventListener("click", () => {
        blogModal.classList.remove("active")
      })
    }
  
    // Image preview
    const imageInput = document.getElementById("image")
    if (imageInput) {
      imageInput.addEventListener("change", (e) => {
        const file = e.target.files[0]
        if (file) {
          const reader = new FileReader()
          reader.onload = (e) => {
            document.getElementById("previewImg").src = e.target.result
            document.getElementById("imagePreview").style.display = "block"
          }
          reader.readAsDataURL(file)
        }
      })
    }
  
    // Blog form submission
    if (blogForm) {
      blogForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        const blogId = document.getElementById("blogId").value
        const title = document.getElementById("title").value
        const category = document.getElementById("category").value
        const summary = document.getElementById("summary").value
        const content = document.getElementById("content").value
        const imageInput = document.getElementById("image")
  
        let imageUrl = ""
  
        // If editing and no new image selected, keep the old image
        if (blogId) {
          const existingBlog = getBlogById(blogId)
          if (existingBlog) {
            imageUrl = existingBlog.image
          }
        }
  
        // If new image selected, use it
        if (imageInput.files && imageInput.files[0]) {
          const reader = new FileReader()
          reader.onload = (e) => {
            imageUrl = e.target.result
            saveBlogPost(blogId, title, category, summary, content, imageUrl)
          }
          reader.readAsDataURL(imageInput.files[0])
        } else {
          // No new image, use placeholder or existing
          if (!imageUrl) {
            imageUrl = `https://via.placeholder.com/600x400?text=${encodeURIComponent(category)}`
          }
          saveBlogPost(blogId, title, category, summary, content, imageUrl)
        }
      })
    }
  }
  
  function saveBlogPost(id, title, category, summary, content, imageUrl) {
    const blogs = getBlogs()
  
    if (id) {
      // Update existing blog
      const index = blogs.findIndex((blog) => blog.id === id)
      if (index !== -1) {
        blogs[index] = {
          ...blogs[index],
          title,
          category,
          summary,
          content,
          image: imageUrl,
        }
      }
    } else {
      // Create new blog
      const newBlog = {
        id: Date.now().toString(),
        title,
        category,
        summary,
        content,
        date: new Date().toISOString().split("T")[0],
        author: "Shivam Yadav",
        image: imageUrl,
      }
  
      blogs.push(newBlog)
    }
  
    saveBlogs(blogs)
    loadAdminBlogs()
    document.getElementById("blogModal").classList.remove("active")
  }
  
  function loadAdminBlogs() {
    const blogTableBody = document.getElementById("blogTableBody")
    const blogs = getBlogs()
  
    if (!blogTableBody) return
  
    blogTableBody.innerHTML = ""
  
    blogs.forEach((blog) => {
      const row = document.createElement("tr")
  
      row.innerHTML = `
        <td>
          <div class="blog-title-cell">
            <div class="blog-thumbnail">
              <img src="${blog.image || "https://via.placeholder.com/50"}" alt="${blog.title}">
            </div>
            <div class="blog-title-info">
              <h4>${blog.title}</h4>
              <p>${blog.summary.substring(0, 50)}...</p>
            </div>
          </div>
        </td>
        <td>
          <span class="category-badge">${blog.category}</span>
        </td>
        <td>${blog.date}</td>
        <td>
          <div class="action-buttons">
            <a href="blog-detail.html?id=${blog.id}" target="_blank" class="action-btn view-btn">View</a>
            <button class="action-btn edit-btn" data-id="${blog.id}">Edit</button>
            <button class="action-btn delete-btn" data-id="${blog.id}">Delete</button>
          </div>
        </td>
      `
  
      blogTableBody.appendChild(row)
    })
  
    // Add event listeners to edit and delete buttons
    document.querySelectorAll(".edit-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        const blogId = this.getAttribute("data-id")
        editBlog(blogId)
      })
    })
  
    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        const blogId = this.getAttribute("data-id")
        deleteBlog(blogId)
      })
    })
  }
  
  function editBlog(blogId) {
    const blog = getBlogById(blogId)
  
    if (!blog) return
  
    document.getElementById("modalTitle").textContent = "Edit Blog Post"
    document.getElementById("blogId").value = blog.id
    document.getElementById("title").value = blog.title
    document.getElementById("category").value = blog.category
    document.getElementById("summary").value = blog.summary
    document.getElementById("content").value = blog.content
  
    if (blog.image) {
      document.getElementById("previewImg").src = blog.image
      document.getElementById("imagePreview").style.display = "block"
    } else {
      document.getElementById("imagePreview").style.display = "none"
    }
  
    document.getElementById("blogModal").classList.add("active")
  }
  
  function deleteBlog(blogId) {
    if (confirm("Are you sure you want to delete this blog post?")) {
      const blogs = getBlogs()
      const updatedBlogs = blogs.filter((blog) => blog.id !== blogId)
      saveBlogs(updatedBlogs)
      loadAdminBlogs()
    }
  }
  
  