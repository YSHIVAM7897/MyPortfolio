  var tablinks = document.getElementsByClassName("tab-link");
  var tabcontents = document.getElementsByClassName("tab-contains");

  function opentab(tabname) {
    // Remove active class from all tab links
    for (var tablink of tablinks) {
       tablink.classList.remove("active-link");
    }
  
    // Hide all tab contents
    for (var tabcontent of tabcontents) {
      tabcontent.classList.remove("active-tab");
    }
  
    // Add active class to the clicked tab link
    event.currentTarget.classList.add("active-link");
  
    // Show the clicked tab content
    document.getElementById(tabname).classList.add("active-tab");
} 

 document.getElementById('privacy-link').addEventListener('click', function(event) {
  event.preventDefault();
  document.getElementById('privacy-popup').style.display = 'flex';
});

document.getElementById('terms-link').addEventListener('click', function(event) {
  event.preventDefault();
  document.getElementById('terms-popup').style.display = 'flex';
});

document.querySelectorAll('.close-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    this.closest('.popup-bg').style.display = 'none';
  });
});

document.querySelectorAll('.popup-bg').forEach(function(bg) {
  bg.addEventListener('click', function(event) {
    if (event.target === this) {
      this.style.display = 'none';
    }
  });
});
 
    // Function to show the popup
function showPopup(id) {
    document.getElementById(id).style.display = 'flex'; // Show the specific popup by id
}

// Function to hide the popup
function hidePopup(id) {
    document.getElementById(id).style.display = 'none'; // Hide the specific popup by id
}

// Event listener for the close buttons
document.querySelectorAll('.close-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        this.closest('.popup-bg').style.display = 'none'; // Hide the closest popup
    });
});
 