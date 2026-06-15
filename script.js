document.addEventListener('DOMContentLoaded', () => {
    // 1. Setup Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));

    // 2. Load PDF pages dynamically
    const pagesContainer = document.getElementById('pages-container');
    const totalPages = 14;
    
    // Zoom icon SVG
    const zoomIconSVG = `
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
    `;

    for (let i = 1; i <= totalPages; i++) {
        // Format number to be two digits e.g. 01, 02
        const pageNum = i.toString().padStart(2, '0');
        const imgSrc = `pdf_pages/page_${pageNum}.png`;

        const pageItem = document.createElement('div');
        pageItem.className = `page-item fade-in`;
        // Adding a staggered delay for a cascading load effect
        pageItem.style.transitionDelay = `${(i % 3) * 0.1}s`;

        pageItem.innerHTML = `
            <img src="${imgSrc}" alt="Página ${i} - Morfología Floral" loading="lazy">
            <div class="page-overlay">
                <div class="zoom-icon">${zoomIconSVG}</div>
            </div>
        `;

        // Click event to open lightbox
        pageItem.addEventListener('click', () => {
            openLightbox(imgSrc);
        });

        pagesContainer.appendChild(pageItem);
        observer.observe(pageItem); // observe the new element
    }

    // 3. Lightbox functionality
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-image');
    const closeLightboxBtn = document.querySelector('.close-lightbox');

    function openLightbox(src) {
        lightboxImg.src = src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling in background
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        // Reset src slightly after animation finishes to avoid flash
        setTimeout(() => { lightboxImg.src = ''; }, 300);
        document.body.style.overflow = 'auto'; // Restore scrolling
    }

    closeLightboxBtn.addEventListener('click', closeLightbox);
    
    // Close lightbox on clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Close lightbox on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
});
