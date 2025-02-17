// Array of blog objects
const blogs = [
  {
      title: "Hosting a Web Page on GitHub Pages!",
      description: "Learn how to host your website for free using GitHub Pages. This guide covers setting up a repository, uploading your HTML, CSS, and JavaScript files, and making your site live with a GitHub Pages URL. Perfect for developers, students, and project showcases! 🚀",
      imgSrc: "https://www.spinxdigital.com/app/uploads/2024/03/Blog-Main-Image.jpg",
      link: "https://example.com/github-pages-guide"
  },
  {
      title: "Web Development Trends 2024",
      description: "Stay updated with the latest trends in web development.",
      imgSrc: "https://cdn-icons-png.flaticon.com/512/5969/5969113.png",
      link: "https://example.com/web-dev-trends-2024"
  },
  {
      title: "CSS Animation Guide",
      description: "Master CSS animations with this detailed guide.",
      imgSrc: "https://cdn-icons-png.flaticon.com/512/5969/5969113.png",
      link: "https://example.com/css-animation-guide"
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
