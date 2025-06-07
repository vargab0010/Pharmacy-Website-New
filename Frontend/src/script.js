const navDialog =document.getElementById('nav-dialog');

function handleMenu(){
  navDialog.classList.toggle('hidden');
    
}




// slider coursel  logic

const slider = document.getElementById('slider');
const slides = slider.children;
const totalSlides = slides.length;
let index = 0;

function autoSlide() {
  index = (index + 1) % totalSlides;
  slider.style.transform = `translateX(-${index * 100}%)`;
}

setInterval(autoSlide, 3000); // Change slide every 3 seconds



  const slider2 = document.getElementById("slider2");
  const leftArrow = document.getElementById("left-arrow");
  const rightArrow = document.getElementById("right-arrow");

  leftArrow.addEventListener("click", () => {
    slider2.scrollBy({ left: -200, behavior: "smooth" });
  });

  rightArrow.addEventListener("click", () => {
    slider2.scrollBy({ left: 200, behavior: "smooth" });
  });

// Refer To Login Page 
function goToLoginPage() {
  window.location.href = "./login.html"; // Adjust the path if necessary
}


// Refer between login  & profile
document.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = localStorage.getItem('userId');

    const authButtons = document.getElementById('auth-buttons');
    const userButtons = document.getElementById('user-buttons');

    if (isLoggedIn) {
      authButtons.classList.add('hidden');
      userButtons.classList.remove('hidden');
    } else {
      authButtons.classList.remove('hidden');
      userButtons.classList.add('hidden');
    }
    });
  
 
   // Correct (works with live backend)
fetch("https://pharmacy-website-new-backend.onrender.com/api/products")
  .then(response => response.json())
  .then(data => {
    console.log("Fetched Products:", data);
    // You can now show them on the page
  })
  .catch(error => {
    console.error("Error fetching products:", error);
  });
