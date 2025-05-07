document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Toggle dark mode
    const toggleDarkMode = () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    };

    // Load theme from storage
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
    }

    // Create dark mode button
    const darkModeBtn = document.createElement('button');
    darkModeBtn.innerHTML = '<i class="fas fa-moon"></i>';
    darkModeBtn.className = 'btn btn-secondary position-fixed bottom-0 end-0 m-3';
    darkModeBtn.title = 'Toggle Dark Mode';
    darkModeBtn.onclick = toggleDarkMode;
    document.body.appendChild(darkModeBtn);

    // Car card interaction
    const cars = document.querySelectorAll('.cars .col-md-4');
    cars.forEach((car, index) => {
        car.style.cursor = 'pointer';
        car.addEventListener('mouseenter', () => {
            car.style.transform = 'scale(1.05)';
            car.style.transition = 'transform 0.3s';
        });
        car.addEventListener('mouseleave', () => {
            car.style.transform = 'scale(1)';
        });

        car.addEventListener('click', () => {
            const carName = car.querySelector('h4')?.textContent || 'Car';
            const price = car.querySelector('p')?.textContent || '';
            showModal(carName, price);
        });
    });

    // Navbar toggle fix with animation
    const navToggle = document.querySelector('.navbar-toggler');
    const navCollapse = document.getElementById('navbarNav');
    if (navToggle && navCollapse) {
        navToggle.addEventListener('click', () => {
            navCollapse.classList.toggle('show');
        });
    }

    // Modal generator
    function showModal(title, price) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-box text-center bg-white p-4 rounded shadow">
                <h3>${title}</h3>
                <p>Price: ${price}</p>
                <a href="login.html" class="btn btn-primary">Login to Book</a>
                <button class="btn btn-danger mt-2" id="closeModal">Close</button>
            </div>
        `;
        Object.assign(modal.style, {
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.7)', display: 'flex',
            justifyContent: 'center', alignItems: 'center', zIndex: 1000
        });

        document.body.appendChild(modal);
        document.getElementById('closeModal').onclick = () => modal.remove();
    }
});
