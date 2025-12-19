// Perfect Faculty Section Toggle
document.addEventListener('DOMContentLoaded', function() {
    const viewMoreBtn = document.getElementById('viewMoreBtn');
    const hiddenFacultyGrid = document.getElementById('hiddenFacultyGrid');
    const btnText = document.querySelector('.btn-text');
    
    if (viewMoreBtn && hiddenFacultyGrid) {
        viewMoreBtn.addEventListener('click', function() {
            if (hiddenFacultyGrid.classList.contains('hidden')) {
                // Show hidden faculty with smooth animation
                hiddenFacultyGrid.classList.remove('hidden');
                hiddenFacultyGrid.style.display = 'grid';
                hiddenFacultyGrid.style.animation = 'fadeInUp 0.6s ease forwards';
                viewMoreBtn.classList.add('active');
                btnText.textContent = 'Show Less';
                
                // Add animation delay for each new card
                const newCards = hiddenFacultyGrid.querySelectorAll('.faculty-card');
                newCards.forEach((card, index) => {
                    card.style.animationDelay = `${(index + 4) * 0.1}s`;
                    card.style.animation = 'fadeInUp 0.6s ease forwards';
                });
            } else {
                // Hide faculty with smooth animation
                hiddenFacultyGrid.classList.add('hidden');
                setTimeout(() => {
                    hiddenFacultyGrid.style.display = 'none';
                }, 300);
                viewMoreBtn.classList.remove('active');
                btnText.textContent = 'View All Faculty';
            }
        });
    }
    
    // Lazy loading for images
    const facultyImages = document.querySelectorAll('.card-image img');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        facultyImages.forEach(img => imageObserver.observe(img));
    }
});