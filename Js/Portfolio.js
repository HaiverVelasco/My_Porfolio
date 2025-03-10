// Variables globales para el carrusel
let currentSlide = 0;
let slideInterval;

// Funciones para controlar modales
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'block';
    
    // Inicializar el carrusel al abrir el modal
    currentSlide = 0;
    initializeCarousel(modal);
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'none';
    clearInterval(slideInterval); // Detener el autoplay al cerrar
}

// Funciones para el carrusel
function initializeCarousel(modal) {
    createDots(modal);
    showSlides(modal);
    startAutoPlay(modal);
    
    // Configurar eventos de mouse para el modal actual
    const modalContent = modal.querySelector('.modal-content');
    if (modalContent) {
        modalContent.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        modalContent.addEventListener('mouseleave', () => {
            startAutoPlay(modal);
        });
    }
}

function createDots(modal) {
    const slides = modal.querySelectorAll('.Carrusel_Preview, .Carrusel_Preview2,.Carrusel_Preview3');
    const dotsContainer = modal.querySelector('.carousel-dots');
    
    if (!dotsContainer || slides.length === 0) return;
    
    dotsContainer.innerHTML = '';
    
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `dot ${index === currentSlide ? 'active' : ''}`;
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlides(modal);
            resetTimer(modal);
        });
        dotsContainer.appendChild(dot);
    });
}

function showSlides(modal) {
    const slides = modal.querySelectorAll('.Carrusel_Preview, .Carrusel_Preview2,.Carrusel_Preview3');
    const dots = modal.querySelectorAll('.dot');
    
    if (slides.length === 0) return;
    
    // Asegurarse de que currentSlide esté dentro del rango válido
    if (currentSlide >= slides.length) {
        currentSlide = 0;
    }
    
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function moveSlide(direction, modal) {
    const slides = modal.querySelectorAll('.Carrusel_Preview, .Carrusel_Preview2,.Carrusel_Preview3');
    
    if (slides.length === 0) return;
    
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    showSlides(modal);
}

function resetTimer(modal) {
    clearInterval(slideInterval);
    startAutoPlay(modal);
}

function startAutoPlay(modal) {
    slideInterval = setInterval(() => {
        moveSlide(1, modal);
    }, 4000);
}

// Inicializar cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    // Configura el evento para cerrar modales al hacer clic fuera
    window.onclick = function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
            clearInterval(slideInterval);
        }
    };
    
    // Inicializar carruseles si hay modales ya abiertos
    const openModals = document.querySelectorAll('.modal[style*="display: block"]');
    openModals.forEach(modal => {
        initializeCarousel(modal);
    });
});