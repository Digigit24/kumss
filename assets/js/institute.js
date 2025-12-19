// Faculty Section View More Toggle
document.addEventListener('DOMContentLoaded', function() {
    const viewMoreBtn = document.getElementById('viewMoreBtn');
    const hiddenFacultyGrid = document.getElementById('hiddenFacultyGrid');
    
    if (viewMoreBtn && hiddenFacultyGrid) {
        viewMoreBtn.addEventListener('click', function() {
            if (hiddenFacultyGrid.style.display === 'none' || hiddenFacultyGrid.style.display === '') {
                // Show hidden faculty
                hiddenFacultyGrid.style.display = 'grid';
                viewMoreBtn.classList.add('show-less');
                viewMoreBtn.querySelector('.btn-text').textContent = 'Show Less';
            } else {
                // Hide faculty
                hiddenFacultyGrid.style.display = 'none';
                viewMoreBtn.classList.remove('show-less');
                viewMoreBtn.querySelector('.btn-text').textContent = 'View All Faculty';
            }
        });
    }
});