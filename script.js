function toggleMenu() {
  const navLinks = document.getElementById("navLinks");
  navLinks.classList.toggle("active");
  
  // Prevent body scroll when menu is open on mobile
  if (navLinks.classList.contains("active")) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
}

// Smooth scrolling for anchor links
function smoothScrollTo(targetId) {
  const targetElement = document.getElementById(targetId);
  if (targetElement) {
    window.scrollTo({
      top: targetElement.offsetTop,
      behavior: 'smooth'
    });
  }
}

// Handle anchor links
document.addEventListener('DOMContentLoaded', function() {
  // Add click event listeners to all anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Get the target ID from href
      const targetId = this.getAttribute('href').substring(1);
      if (targetId) {
        e.preventDefault();
        smoothScrollTo(targetId);
      }
    });
  });
  
  // Add click event listeners to all nav links
  const navLinksItems = document.querySelectorAll(".nav-links li a");
  navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
      // Close the menu after clicking a link
      document.getElementById("navLinks").classList.remove("active");
      document.body.style.overflow = "";
    });
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', function(event) {
    const navLinks = document.getElementById("navLinks");
    const hamburger = document.querySelector('.hamburger');
    
    if (navLinks && navLinks.classList.contains("active") && 
        !navLinks.contains(event.target) && 
        !hamburger.contains(event.target)) {
      navLinks.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
});

// Property data
const properties = [
  {
    id: 1,
    title: "Monoambiente en Pueblo Caamaño",
    price: 115000,
    specs: "1 Ambiente · 40 m² · 1 Cochera en subsuelo",
    description: "Lujoso departamento, ubicado en el centro del complejo, con las mejores vistas a la Calle Caamaño.",
    image: "1.jpg",
    url: "property1.html"
  },
  {
    id: 2,
    title: "Dos Ambientes en Pueblo Caamaño",
    price: 145000,
    specs: "2 Ambientes · 70 m² · 1 Cochera en subsuelo",
    description: "Relajado, y espacioso departamento al lateral del complejo, muy luminoso y tranquilo. Excelente opción para familias.",
    image: "2.jpg",
    url: "property2.html"
  },
  {
    id: 3,
    title: "Duplex Tres Ambientes en Caamaño Up",
    price: 105000,
    specs: "3 Ambientes · 45 m² · 1 Cochera incluida",
    description: "Ideal para jóvenes que buscan su primer departamento, o para algo cómodo en la mejor ubicación de Pilar.",
    image: "3.jpg",
    url: "property3.html"
  },
  {
    id: 4,
    title: "Local Comercial a la Calle en Caamaño Up",
    price: 120000,
    specs: "3 Ambientes · 80 m² · 1 Cochera incluida",
    description: "Local comercial, frente a la calle Blas Parera y Caamaño, muy bien ubicado y gran cantidad de tráfico durante la semana.",
    image: "4.jpg",
    url: "property4.html"
  }
];
// Current sort order
let currentSort = 'relevant';
// Render properties
function renderProperties(propertyArray) {
  const container = document.getElementById('propertiesContainer');
  if (!container) return;
  
  container.innerHTML = '';
  
  propertyArray.forEach(property => {
    const propertyElement = document.createElement('a');
    propertyElement.href = property.url;
    propertyElement.className = 'property-link';
    
    propertyElement.innerHTML = `
      <div class="property-card">
        <img src="${property.image}" alt="${property.title}" />
        <h2>${property.title}</h2>
        <p class="title">USD ${property.price.toLocaleString()}</p>
        <p class="specs">${property.specs}</p>
        <p class="description">${property.description}</p>
      </div>
    `;
    
    container.appendChild(propertyElement);
  });
}
// Sort properties
function sortProperties(sortType) {
  currentSort = sortType;
  let sortedProperties = [...properties];
  
  switch(sortType) {
    case 'low':
      sortedProperties.sort((a, b) => a.price - b.price);
      updateSortText('Menor precio');
      break;
    case 'high':
      sortedProperties.sort((a, b) => b.price - a.price);
      updateSortText('Mayor precio');
      break;
    case 'relevant':
    default:
      // Keep original order (by ID)
      sortedProperties.sort((a, b) => a.id - b.id);
      updateSortText('Más relevantes');
      break;
  }
  
  renderProperties(sortedProperties);
  
  // Only close dropdown if it was already open (user made a selection)
  const sortOptions = document.getElementById('sortOptions');
  if (sortOptions && sortOptions.style.display === 'block') {
    toggleSortOptions(); // Close dropdown after selection
  }
}
// Update sort text (new function for the separated label/button)
function updateSortText(text) {
  const sortText = document.getElementById('currentSort');
  if (sortText) {
    sortText.textContent = text;
  }
}
// Toggle sort options dropdown
function toggleSortOptions() {
  const sortOptions = document.getElementById('sortOptions');
  if (sortOptions) {
    sortOptions.style.display = sortOptions.style.display === 'block' ? 'none' : 'block';
  }
}
// Close sort options when clicking outside
document.addEventListener('click', function(event) {
  const sortContainer = document.querySelector('.sort-dropdown'); // Updated selector
  const sortOptions = document.getElementById('sortOptions');
  
  if (sortContainer && sortOptions && !sortContainer.contains(event.target)) {
    sortOptions.style.display = 'none';
  }
});
// Mobile Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
  // Initialize properties on page load with default sorting (relevant)
  // But don't open the dropdown menu
  let sortedProperties = [...properties];
  sortedProperties.sort((a, b) => a.id - b.id); // Sort by relevance (ID order)
  renderProperties(sortedProperties);
  updateSortText('Más relevantes'); // Set button text to default
  
  const sliderTrack = document.getElementById('sliderTrack');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const sliderCounter = document.getElementById('sliderCounter');
  
  // Check if slider elements exist (only on property pages)
  if (!sliderTrack || !prevBtn || !nextBtn || !sliderCounter) return;
  
  const images = sliderTrack.querySelectorAll('.slider-image');
  let currentIndex = 0;
  const totalImages = images.length;
  
  // Update slider position and counter
  function updateSlider() {
    const translateX = -currentIndex * 100;
    sliderTrack.style.transform = `translateX(${translateX}%)`;
    sliderCounter.textContent = `${currentIndex + 1}/${totalImages}`;
  }
  
  // Next image
  function nextImage() {
    currentIndex = (currentIndex + 1) % totalImages;
    updateSlider();
  }
  
  // Previous image
  function prevImage() {
    currentIndex = (currentIndex - 1 + totalImages) % totalImages;
    updateSlider();
  }
  
  // Arrow button event listeners
  nextBtn.addEventListener('click', nextImage);
  prevBtn.addEventListener('click', prevImage);
  
  // Touch/Swipe functionality
  let startX = 0;
  let startY = 0;
  let isScrolling = false;
  
  sliderTrack.addEventListener('touchstart', function(e) {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    isScrolling = false;
  });
  
  sliderTrack.addEventListener('touchmove', function(e) {
    if (!startX || !startY) return;
    
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const diffX = startX - currentX;
    const diffY = startY - currentY;
    
    // Determine if user is scrolling vertically or swiping horizontally
    if (Math.abs(diffY) > Math.abs(diffX)) {
      isScrolling = true;
      return;
    }
    
    // Prevent default only for horizontal swipes
    if (Math.abs(diffX) > 10 && !isScrolling) {
      e.preventDefault();
    }
  });
  
  sliderTrack.addEventListener('touchend', function(e) {
    if (!startX || !startY || isScrolling) {
      startX = 0;
      startY = 0;
      return;
    }
    
    const endX = e.changedTouches[0].clientX;
    const diffX = startX - endX;
    
    // Minimum swipe distance
    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        // Swiped left - next image
        nextImage();
      } else {
        // Swiped right - previous image
        prevImage();
      }
    }
    
    startX = 0;
    startY = 0;
  });
  
  // Mouse drag functionality for desktop
  let isDragging = false;
  let dragStartX = 0;
  
  sliderTrack.addEventListener('mousedown', function(e) {
    isDragging = true;
    dragStartX = e.clientX;
    sliderTrack.style.cursor = 'grabbing';
    e.preventDefault();
  });
  
  document.addEventListener('mousemove', function(e) {
    if (!isDragging) return;
    e.preventDefault();
  });
  
  document.addEventListener('mouseup', function(e) {
    if (!isDragging) return;
    
    const dragEndX = e.clientX;
    const diffX = dragStartX - dragEndX;
    
    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        nextImage();
      } else {
        prevImage();
      }
    }
    
    isDragging = false;
    sliderTrack.style.cursor = 'grab';
  });
  
  // Initialize slider
  updateSlider();
  
  // Optional: Auto-play (uncomment if desired)
  // setInterval(nextImage, 4000);
});
