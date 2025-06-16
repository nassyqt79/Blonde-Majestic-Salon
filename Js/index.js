

  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('nav-links');
  const overlay = document.getElementById('overlay');

  burger.addEventListener('click', function(e) {
    e.stopPropagation();
    this.classList.toggle('active');
    navLinks.classList.toggle('show');
    overlay.classList.toggle('show');
    document.body.style.overflow = navLinks.classList.contains('show') ? 'hidden' : '';
  });

  
  overlay.addEventListener('click', function() {
    burger.classList.remove('active');
    navLinks.classList.remove('show');
    overlay.classList.remove('show');
    document.body.style.overflow = '';
  });

  document.querySelectorAll('#nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('show');
      burger.classList.remove('active');
      overlay.classList.remove('show');
      document.body.style.overflow = '';
    });
  });


  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('nav ul li a');

  function highlightNav() {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
        current = section.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${current}`) {
        item.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', highlightNav);
  highlightNav(); 


  document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  
  const servicesSlider = document.querySelector('.services-slider .slider-container');
  const serviceSlides = document.querySelectorAll('.services-slider .service-category');
  const serviceDots = document.querySelectorAll('.services-slider .dot');
  const servicePrevBtn = document.querySelector('.services-slider .prev');
  const serviceNextBtn = document.querySelector('.services-slider .next');
  
  let currentServiceIndex = 0;
  const serviceSlideCount = serviceSlides.length;
  
  function updateServiceSlider() {
    servicesSlider.style.transform = `translateX(-${currentServiceIndex * 100}%)`;
    
   
    serviceDots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentServiceIndex);
    });
  }
  
  serviceNextBtn.addEventListener('click', () => {
    currentServiceIndex = (currentServiceIndex + 1) % serviceSlideCount;
    updateServiceSlider();
  });

  servicePrevBtn.addEventListener('click', () => {
    currentServiceIndex = (currentServiceIndex - 1 + serviceSlideCount) % serviceSlideCount;
    updateServiceSlider();
  });

  serviceDots.forEach(dot => {
    dot.addEventListener('click', () => {
      currentServiceIndex = parseInt(dot.getAttribute('data-index'));
      updateServiceSlider();
    });
  });

  
  function setupSliderTouch(sliderElement, updateFunction, indexVariable, slideCount) {
    let touchStartX = 0;
    let touchEndX = 0;

    sliderElement.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    sliderElement.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    function handleSwipe() {
      if (touchEndX < touchStartX - 50) {
        indexVariable = (indexVariable + 1) % slideCount;
        updateFunction();
      }
      if (touchEndX > touchStartX + 50) {
        indexVariable = (indexVariable - 1 + slideCount) % slideCount;
        updateFunction();
      }
    }
  }

  setupSliderTouch(servicesSlider, updateServiceSlider, currentServiceIndex, serviceSlideCount);


  const fadeElements = document.querySelectorAll('.fade-in');
  
  function checkScroll() {
    fadeElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementTop < windowHeight - 100) {
        element.classList.add('visible');
      }
    })
  }
  

  checkScroll();
  

  window.addEventListener('scroll', checkScroll);


  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  const closeBtn = document.getElementsByClassName('close')[0];
  const testimonialCards = document.querySelectorAll('.testimonial-card');

  testimonialCards.forEach(card => {
    card.addEventListener('click', function() {
      const imageSrc = this.getAttribute('data-image');
      modalImg.src = imageSrc;
      modal.classList.add('show');
      document.body.style.overflow = 'hidden';
    });
  });

  closeBtn.addEventListener('click', function() {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  });

  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.classList.remove('show');
      document.body.style.overflow = '';
    }
  });


  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
      modal.classList.remove('show');
      document.body.style.overflow = '';
    }
  });
