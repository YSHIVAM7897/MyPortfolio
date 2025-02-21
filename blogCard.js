// Array of blog objects
const blogs = [
  {
    title: "Hosting a Web Page on GitHub Pages!",
    description: "Learn how to host your website for free using GitHub Pages. This guide covers setting up a repository, uploading your HTML, CSS, and JavaScript files, and making your site live with a GitHub Pages URL. Perfect for developers, students, and project showcases! 🚀",
    imgSrc: "https://www.spinxdigital.com/app/uploads/2024/03/Blog-Main-Image.jpg",
    link: "https://example.com/github-pages-guide"
  },
  {
    title: "How to set up a Android Development Environment",
    description: "Learn how to set up an Android development environment on your local machine. This guide covers installing Android Studio, setting up an emulator, and creating your first Android app. Perfect for beginners and students! 📱",
    imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcxvx7-Wparxr1aKmUd9j2hH59oLWWX3LjPA&s",
    link: "https://example.com/web-dev-trends-2024"
  },
  {
    title: "Learn how to set-up Android Emulator",
    description: "Master the art of setting up an Android Emulator with this detailed guide.",
    imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQQORjEE-W6ZhfBaNyRvnQJw54u_DILWGXCg&s",
    link: "https://example.com/css-animation-guide"
  },

  {
    title: "How to set up a React Development Environment",
    description: "Learn how to set up a React development environment on your local machine. This guide covers installing Node.js, creating a new React app, and running your app in a development server. Perfect for beginners and students! ⚛️",
    imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7oL9Lwj8hY09u2LF1xXYFIVSpXQilZXZZcw&s",
    link: "https://example.com/web-dev-trends-2024"
  }
];

// Get the root container
const root = document.getElementById("root");

// Loop through the blog array and create cards dynamically
blogs.forEach(blog => {
  const card = document.createElement("div");
  card.classList.add("blog-card");

  // Update innerHTML for the card
  card.innerHTML = `
    <div class="blog-card__img">
      <img src="${blog.imgSrc}" alt="blog image">
    </div>
    <div class="content-area">
      <h2>${blog.title}</h2>
      <p>${blog.description}</p>
      <a href="${blog.link}" style="text-decoration: none; color: inherit;">
        <button>
          Read More 
          <img style="height: 1rem; margin-left: 5px;" src="Icons/arrow-right.png" alt="Arrow">
        </button>
      </a>
    </div>
  `;

  root.appendChild(card);
});
