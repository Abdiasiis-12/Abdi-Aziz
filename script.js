document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // 1. Theme Toggle (Dark / Light Mode)
    // ----------------------------------------------------
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check saved theme or system preference
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (theme === 'light') {
            themeIcon.className = 'fa-solid fa-sun';
        } else {
            themeIcon.className = 'fa-solid fa-moon';
        }
    }

    // ----------------------------------------------------
    // 2. Mobile Navigation Menu Toggle
    // ----------------------------------------------------
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    const menuIcon = mobileMenuBtn.querySelector('i');

    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Toggle burger/cross icon
        if (navMenu.classList.contains('active')) {
            menuIcon.className = 'fa-solid fa-xmark';
        } else {
            menuIcon.className = 'fa-solid fa-bars-staggered';
        }
    });

    // Close menu when a link is clicked
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuIcon.className = 'fa-solid fa-bars-staggered';
        });
    });

    // ----------------------------------------------------
    // 3. Navigation Highlight on Scroll (ScrollSpy)
    // ----------------------------------------------------
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Trigger 100px before reaching section
            if (window.scrollY >= (sectionTop - 150)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    // ----------------------------------------------------
    // 4. Skills Animation (Intersection Observer)
    // ----------------------------------------------------
    const skillsSection = document.getElementById('skills');
    const progressFills = document.querySelectorAll('.progress-fill');

    // Initially clear widths to animate them on scroll
    progressFills.forEach(fill => {
        const targetWidth = fill.style.width;
        fill.setAttribute('data-width', targetWidth);
        fill.style.width = '0%';
    });

    const skillsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                progressFills.forEach(fill => {
                    const targetWidth = fill.getAttribute('data-width');
                    fill.style.width = targetWidth;
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }

    // ----------------------------------------------------
    // 5. Projects Filter
    // ----------------------------------------------------
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');

                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.classList.remove('fade-out');
                    card.classList.add('fade-in');
                } else {
                    card.classList.remove('fade-in');
                    card.classList.add('fade-out');
                }
            });
        });
    });

    // ----------------------------------------------------
    // 6. Contact Form Validation & Fake Submit
    // ----------------------------------------------------
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nameInput = document.getElementById('name').value.trim();
            const emailInput = document.getElementById('email').value.trim();
            const subjectInput = document.getElementById('subject').value.trim();
            const messageInput = document.getElementById('message').value.trim();

            if (!nameInput || !emailInput || !subjectInput || !messageInput) {
                showStatus('Fadlan wada buuxi dhamaan meelaha banaan.', 'error');
                return;
            }

            // Fake loading status
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Gudbinayaa... <i class="fa-solid fa-spinner fa-spin"></i>';

            setTimeout(() => {
                // Success message
                showStatus('Mahadsanid! Fariintaada si guul leh ayaa loo diray. Waan kula soo xiriiri doonaa dhowaan.', 'success');
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }, 1500);
        });
    }

    function showStatus(message, type) {
        formStatus.textContent = message;
        formStatus.className = `form-status ${type}`;
        
        // Auto hide message after 5 seconds
        setTimeout(() => {
            formStatus.style.display = 'none';
        }, 5000);
    }
});
