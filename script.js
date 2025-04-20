document.addEventListener("DOMContentLoaded", () => {
    // Set current year in footer
    document.querySelectorAll("#currentYear").forEach((el) => {
      el.textContent = new Date().getFullYear()
    })
  
    // Mobile menu toggle
    const menuToggle = document.getElementById("menuToggle")
    const nav = document.querySelector(".nav")
  
    if (menuToggle) {
      menuToggle.addEventListener("click", () => {
        nav.classList.toggle("active")
      })
    }
  
    // Tabs functionality
    const tabBtns = document.querySelectorAll(".tab-btn")
  
    if (tabBtns.length > 0) {
      tabBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
          // Remove active class from all buttons and panes
          document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"))
          document.querySelectorAll(".tab-pane").forEach((p) => p.classList.remove("active"))
  
          // Add active class
          this.classList.add("active")
  
          // Show corresponding tab pane
          const tabId = this.getAttribute("data-tab")
          document.getElementById(tabId).classList.add("active")
        })
      })
    }
  
    // Admin tabs functionality
    const adminTabBtns = document.querySelectorAll(".admin-tab-btn")
  
    if (adminTabBtns.length > 0) {
      adminTabBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
          // Remove active class from all buttons and panes
          document.querySelectorAll(".admin-tab-btn").forEach((b) => b.classList.remove("active"))
          document.querySelectorAll(".admin-tab-pane").forEach((p) => p.classList.remove("active"))
  
          // Add active class
          this.classList.add("active")
  
          // Show corresponding tab pane
          const tabId = this.getAttribute("data-tab")
          document.getElementById(tabId).classList.add("active")
        })
      })
    }
  
    // Contact form submission
    const contactForm = document.getElementById("contactForm")
  
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault()
        
        alert("Thank you for your message! I will get back to you soon.")
        contactForm.reset()
      })
    }
  
    // Blog page functionality
    if (window.location.pathname.includes("blog.html")) {
      loadBlogPosts()
    }
  
    // Blog detail page functionality
    if (window.location.pathname.includes("blogdetail.html")) {
      const urlParams = new URLSearchParams(window.location.search)
      const blogId = urlParams.get("id")
  
      if (true) {
        loadBlogDetail(blogId)
      } else {
        window.location.href = "blogs.html"
      }
    }
  
    // Admin page functionality
    if (window.location.pathname.includes("admin.html")) {
      setupAdminPage()
    }
  })
  
  // Mock localStorage for demo purposes
  const localStorageMock = {
    getItem: function (key) {
      return this[key] || null
    },
    setItem: function (key, value) {
      this[key] = String(value)
    },
    removeItem: function (key) {
      delete this[key]
    },
    clear: function () {
      for (var key in this) {
        if (this.hasOwnProperty(key)) {
          delete this[key]
        }
      }
    },
  }
  
  // Use localStorageMock if localStorage is not available (e.g., in some testing environments)
  const storage = typeof localStorage === "undefined" ? localStorageMock : localStorage
  
  // Blog Functions
  function getBlogs() {
    try {
      const blogs = storage.getItem("blogs")
      return blogs ? JSON.parse(blogs) : []
    } catch (error) {
      console.error("Error getting blogs from localStorage:", error)
      return []
    }
  }
  
  function saveBlogs(blogs) {
    try {
      storage.setItem("blogs", JSON.stringify(blogs))
    } catch (error) {
      console.error("Error saving blogs to localStorage:", error)
    }
  }
  
  function getBlogById(id) {
    const blogs = getBlogs()
    return blogs.find((blog) => blog.id === id)
  }
  
  function loadBlogPosts() {
    const blogPosts = document.getElementById("blogPosts")
    const blogs = getBlogs()
  
    if (blogs.length === 0) {
      // Create sample blogs if none exist
      const sampleBlogs = [
        {
          id: "1",
          title: "Hosting a Web Page on GitHub Using GitHub Actions Workflow",
          summary: "If you’ve built a personal portfolio, project documentation, or just a fun HTML site and want to host it online for free, GitHub Pages is a fantastic option. But did you know you can automate your deployment using GitHub Actions Workflows? In this blog, we'll walk through how to set that up step-by-step.",
          content: `
            <p>GitHub isn’t just for version control and code collaboration—it’s also a powerful and free platform to host websites. Whether you're building a personal blog, showcasing a portfolio, or highlighting a project, GitHub Pages provides an easy way to publish static sites straight from your repository.</p>
            
            <h2>Step 1: Create a GitHub account</h2>
            <ul>
              <li>The first step is to create a <a href="https://github.com/">GitHub </a> account if you don’t have one already. You can create an account for free on the GitHub website.</li>
              <li>If you already have one then do github login to your account.</li>
            </ul>

            <h2>Step 2: Create a new repository</h2>
            <ul>
              <li>Click on the "+" icon in the top right corner of the GitHub page.</li>
              <li>Select "New repository".</li>
              <li>Give your repository a name (e.g., "my-website").</li>
              <li>Choose "Public" for visibility.</li>
              <li>Check the box for "Initialize this repository with a README".</li>
              <li>Click "Create repository".</li>
            </ul>

            <h2>Step 3: Create a simple HTML file</h2>
            <p>In your new repository, create an HTML file. You can do this directly on GitHub or clone the repository to your local machine and edit it there.</p>
             
            <h2>Step 4: Goto the "Settings" tab</h2>
             <ul>
              <li>Click on the "Settings" tab in your repository.</li>
              <li>Scroll down to the "GitHub Pages" section.</li>  
              <li>Select the "main" branch as the source.</li>
              <li>Click "Save".</li>
            </ul>

            <p>After a few minutes, your site will be live at <code>https://yourusername.github.io/your-repository-name</code>.</p>
            <p>For example, if your GitHub username is "john" and your repository name is "my-website", your site will be available at <code>https://john.github.io/my-website</code>.</p>


            <h2>Step 5: Automate Deployment with GitHub Actions</h2>
            <p>Now that your site is live, you can automate the deployment process using GitHub Actions. This allows you to automatically deploy changes whenever you push to the main branch.</p>
            <p>To set up GitHub Actions:</p>
            <ul>
              <li>In your repository, click on the "Actions" tab.</li>  
              <li>Click on "Set up a workflow yourself".</li>
              <li>Replace the default YAML code with the following:</li>
              <pre>
                <code># Simple workflow for deploying static content to GitHub Pages
name: Deploy static content to Pages

on:
  # Runs on pushes targeting the default branch
  push:
    branches: ["main"]

  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

# Sets permissions of the GITHUB_TOKEN to allow deployment to GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

# Allow only one concurrent deployment, skipping runs queued between the run in-progress and latest queued.
# However, do NOT cancel in-progress runs as we want to allow these production deployments to complete.
concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  # Single deploy job since we're just deploying
  deploy:
    environment:
      name: github-pages
      url: "{{ steps.deployment.outputs.page_url }}"
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Pages
        uses: actions/configure-pages@v5
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          # Upload entire repository
          path: '.'
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4

                </code>
              </pre>
              
            <ul>
              <li>Commit the changes.</li>
              <li>Now, every time you push changes to the main branch, GitHub Actions will automatically deploy your site.</li>
            </ul>`,
          date: "Dec 15, 2025",
          author: "Shivam Yadav",
          category: "Technologies",
          image: "https://via.placeholder.com/600x400?text=Web+Development",
        },
        {
          id: "2",
          title: "Mastering Android Development",
          summary: "Tips and tricks for becoming a proficient Android developer.",
          content:`
          <p>Android development offers a vast ecosystem for creating mobile applications. This post covers advanced techniques and best practices for building robust Android apps."</p>
          <h4>Comming Soon</h4>`,
          date: "April 20, 2025",
          author: "Shivam Yadav",
          category: "Android",
          image: "https://via.placeholder.com/600x400?text=Android+Development",
        },
      ]
  
      saveBlogs(sampleBlogs)
      renderBlogPosts(sampleBlogs)
    } else {
      renderBlogPosts(blogs)
    }
  }
  
  function renderBlogPosts(blogs) {
    const blogPosts = document.getElementById("blogPosts")
  
    if (!blogPosts){
      console.error("Blog posts container not found.")
      return
    }
  
    blogPosts.innerHTML = ""
  
    blogs.forEach((blog) => {
      const postCard = document.createElement("div")
      postCard.className = "post-card"
  
      postCard.innerHTML = `
        <div class="post-image">
          <img src="${blog.image || "https://via.placeholder.com/400x200"}" alt="${blog.title}">
        </div>
        <div class="post-content">
          <div class="post-meta">
            <span class="post-category">${blog.category}</span>
            <span class="post-date">${blog.date}</span>
          </div>
          <h3 class="post-title">${blog.title}</h3>
          <p class="post-excerpt">${blog.summary}</p>
          <a href="blogdetail.html?id=${blog.id}" class="post-link">Read More <i class="fas fa-arrow-right"></i></a>
        </div>
      `
  
      blogPosts.appendChild(postCard)
    })
  }
  
  function loadBlogDetail(blogId) {
    const blog = getBlogById(blogId)
  
    if (!blog) {
      window.location.href = "blogdetail.html"
      return
    }
  
    // Set blog details
    document.title = `${blog.title} - Shivam's Portfolio`
    document.getElementById("blogImage").src = blog.image || "https://via.placeholder.com/1200x600"
    document.getElementById("blogCategory").textContent = blog.category
    document.getElementById("blogTitle").textContent = blog.title
    document.getElementById("blogAuthor").textContent = blog.author
    document.getElementById("blogDate").textContent = blog.date
    document.getElementById("blogContent").innerHTML = blog.content
  
    // Load related posts
    loadRelatedPosts(blog)
  }
  
  function loadRelatedPosts(currentBlog) {
    const relatedPosts = document.getElementById("relatedPosts")
    const blogs = getBlogs()
  
    // Filter out current blog and get up to 3 related posts
    const related = blogs.filter((blog) => blog.id !== currentBlog.id).slice(0, 3)
  
    relatedPosts.innerHTML = ""
  
    related.forEach((blog) => {
      const relatedCard = document.createElement("a")
      relatedCard.href = `blogdetail.html?id=${blog.id}`
      relatedCard.className = "related-card"
  
      relatedCard.innerHTML = `
        <div class="related-image">
          <img src="${blog.image || "https://via.placeholder.com/300x200"}" alt="${blog.title}">
        </div>
        <div class="related-content">
          <h3 class="related-title">${blog.title}</h3>
          <p class="related-excerpt">${blog.summary}</p>
        </div>
      `
  
      relatedPosts.appendChild(relatedCard)
    })
  }
  
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
  
  