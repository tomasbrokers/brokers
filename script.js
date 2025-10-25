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
  // Check if there's a hash in the URL and scroll to that element
  if (window.location.hash) {
    const targetId = window.location.hash.substring(1);
    setTimeout(() => {
      smoothScrollTo(targetId);
    }, 100);
  }
  
  // Add click event listeners to all anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
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
    image: "Imagenes/1.jpg",
    url: "property1.html"
  },
  {
    id: 2,
    title: "Dos Ambientes en Pueblo Caamaño",
    price: 145000,
    specs: "2 Ambientes · 70 m² · 1 Cochera en subsuelo",
    description: "Relajado, y espacioso departamento al lateral del complejo, muy luminoso y tranquilo. Excelente opción para familias.",
    image: "Imagenes/2.jpg",
    url: "property2.html"
  },
  {
    id: 3,
    title: "Tres Ambientes en Caamaño Up",
    price: 105000,
    specs: "3 Ambientes · 45 m² · 1 Cochera incluida",
    description: "Ideal para jóvenes que buscan su primer departamento, o para algo cómodo en la mejor ubicación de Pilar.",
    image: "Imagenes/3.jpg",
    url: "property3.html"
  },
  {
    id: 4,
    title: "Local a la Calle en Caamaño Up",
    price: 120000,
    specs: "3 Ambientes · 80 m² · 1 Cochera incluida",
    description: "Local comercial, frente a la calle Blas Parera y Caamaño, muy bien ubicado y gran cantidad de tráfico durante la semana.",
    image: "Imagenes/4.jpg",
    url: "property4.html"
  }
];

// NEW: Rental property data
const rentalProperties = [
  {
    id: 5,
    title: "Tres Ambientes en Caamaño Up",
    price: 500,
    specs: "3 Ambientes · 45 m² · 1 Cochera Incluida",
    description: "Ideal para jóvenes que buscan su primer departamento, o para algo cómodo en la mejor ubicación de Pilar. Disponible para alquiler a precio competitivo.",
    image: "Imagenes/3.jpg",
    url: "property5.html"
  }
];

// Current sort order
let currentSort = 'relevant';
let currentRentalSort = 'relevant';

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
        <p class="title">USD ${property.price.toLocaleString('es-AR')}</p>
        <p class="specs">${property.specs}</p>
        <p class="description">${property.description}</p>
      </div>
    `;
    
    container.appendChild(propertyElement);
  });
}

// NEW: Render rental properties
function renderRentalProperties() {
  const container = document.getElementById('rentalPropertiesContainer');
  if (!container) return;
  
  container.innerHTML = '';
  
  rentalProperties.forEach(property => {
    const propertyElement = document.createElement('a');
    propertyElement.href = property.url;
    propertyElement.className = 'property-link';
    
    propertyElement.innerHTML = `
      <div class="property-card">
        <img src="${property.image}" alt="${property.title}" />
        <h2>${property.title}</h2>
        <p class="title">USD ${property.price.toLocaleString('es-AR')}</p>
        <p class="specs">${property.specs}</p>
        <p class="description">${property.description}</p>
      </div>
    `;
    
    container.appendChild(propertyElement);
  });
  
  // Only add placeholder cards on desktop (not mobile)
  if (window.innerWidth > 768) {
    for (let i = 0; i < 3; i++) {
      const placeholderElement = document.createElement('div');
      placeholderElement.className = 'placeholder-card';
      
      placeholderElement.innerHTML = `
        <div class="placeholder-icon">🏠</div>
        <h2>Proximamente</h2>
        <p>Nuevas propiedades en alquiler</p>
      `;
      
      container.appendChild(placeholderElement);
    }
  }
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
      sortedProperties.sort((a, b) => a.id - b.id);
      updateSortText('Más relevantes');
      break;
  }
  
  renderProperties(sortedProperties);
  
  const sortOptions = document.getElementById('sortOptions');
  if (sortOptions && sortOptions.style.display === 'block') {
    toggleSortOptions();
  }
}

// NEW: Sort rental properties
function sortRentalProperties(sortType) {
  currentRentalSort = sortType;
  let sortedProperties = [...rentalProperties];
  
  switch(sortType) {
    case 'low':
      sortedProperties.sort((a, b) => a.price - b.price);
      updateSortTextRental('Menor precio');
      break;
    case 'high':
      sortedProperties.sort((a, b) => b.price - a.price);
      updateSortTextRental('Mayor precio');
      break;
    case 'relevant':
    default:
      sortedProperties.sort((a, b) => a.id - b.id);
      updateSortTextRental('Más relevantes');
      break;
  }
  
  renderRentalProperties(sortedProperties);
  
  const sortOptions = document.getElementById('sortOptionsRental');
  if (sortOptions && sortOptions.style.display === 'block') {
    toggleSortOptionsRental();
  }
}

// Update sort text
function updateSortText(text) {
  const sortText = document.getElementById('currentSort');
  if (sortText) {
    sortText.textContent = text;
  }
}

// NEW: Update sort text for rental properties
function updateSortTextRental(text) {
  const sortText = document.getElementById('currentSortRental');
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

// NEW: Toggle sort options dropdown for rental properties
function toggleSortOptionsRental() {
  const sortOptions = document.getElementById('sortOptionsRental');
  if (sortOptions) {
    sortOptions.style.display = sortOptions.style.display === 'block' ? 'none' : 'block';
  }
}

// Close sort options when clicking outside
document.addEventListener('click', function(event) {
  const sortContainer = document.querySelector('.sort-dropdown');
  const sortOptions = document.getElementById('sortOptions');
  if (sortContainer && sortOptions && !sortContainer.contains(event.target)) {
    sortOptions.style.display = 'none';
  }
  
  const sortContainerRental = document.querySelector('#propiedades-alquiler .sort-dropdown');
  const sortOptionsRental = document.getElementById('sortOptionsRental');
  if (sortContainerRental && sortOptionsRental && !sortContainerRental.contains(event.target)) {
    sortOptionsRental.style.display = 'none';
  }
});

// Mobile Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
  let sortedProperties = [...properties];
  sortedProperties.sort((a, b) => a.id - b.id);
  renderProperties(sortedProperties);
  updateSortText('Más relevantes');
  
  renderRentalProperties();
  updateSortTextRental('Más relevantes');
  
  const sliderTrack = document.getElementById('sliderTrack');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const sliderCounter = document.getElementById('sliderCounter');
  
  if (!sliderTrack || !prevBtn || !nextBtn || !sliderCounter) return;
  
  const images = sliderTrack.querySelectorAll('.slider-image');
  let currentIndex = 0;
  const totalImages = images.length;
  
  function updateSlider() {
    const translateX = -currentIndex * 100;
    sliderTrack.style.transform = `translateX(${translateX}%)`;
    sliderCounter.textContent = `${currentIndex + 1}/${totalImages}`;
  }
  
  function nextImage() {
    currentIndex = (currentIndex + 1) % totalImages;
    updateSlider();
  }
  
  function prevImage() {
    currentIndex = (currentIndex - 1 + totalImages) % totalImages;
    updateSlider();
  }
  
  nextBtn.addEventListener('click', nextImage);
  prevBtn.addEventListener('click', prevImage);
  
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
    
    if (Math.abs(diffY) > Math.abs(diffX)) {
      isScrolling = true;
      return;
    }
    
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
    
    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        nextImage();
      } else {
        prevImage();
      }
    }
    
    startX = 0;
    startY = 0;
  });
  
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
  
  updateSlider();
});

// Handle window resize to re-render rental properties if needed
window.addEventListener('resize', function() {
  renderRentalProperties();
});
