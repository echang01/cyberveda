document.addEventListener('DOMContentLoaded', () => {
    const cursorGlow = document.getElementById('cursor-glow');
    const scrollBg = document.querySelector('.scroll-bg');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    
    // Mobile Menu Toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.replace('fa-bars', 'fa-xmark');
            } else {
                icon.classList.replace('fa-xmark', 'fa-bars');
            }
        });
    }

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.replace('fa-xmark', 'fa-bars');
        });
    });

    // Mouse move effect (interactive glow) - only on desktop
    if (window.innerWidth > 768) {
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let glowX = mouseX;
        let glowY = mouseY;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateGlow() {
            glowX += (mouseX - glowX) * 0.1;
            glowY += (mouseY - glowY) * 0.1;
            
            cursorGlow.style.transform = `translate(${glowX - 150}px, ${glowY - 150}px)`;
            requestAnimationFrame(animateGlow);
        }
        animateGlow();
    }

    // Scroll effect to slowly change background color
    window.addEventListener('scroll', () => {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? window.scrollY / docHeight : 0;
        
        const rTop = Math.floor(10 + (scrollPercent * 20));
        const gTop = Math.floor(10 + (scrollPercent * 10));
        const bTop = Math.floor(26 + (scrollPercent * 30));
        
        const rMid = Math.floor(30 + (scrollPercent * 110)); 
        const gMid = Math.floor(27 + (scrollPercent * 10));
        const bMid = Math.floor(75 + (scrollPercent * 60));
        
        const rBot = Math.floor(23 + (scrollPercent * 10));
        const gBot = Math.floor(37 + (scrollPercent * -10));
        const bBot = Math.floor(84 + (scrollPercent * -50));
        
        scrollBg.style.background = `linear-gradient(180deg, 
            rgb(${rTop}, ${gTop}, ${bTop}) 0%, 
            rgb(${rMid}, ${gMid}, ${bMid}) 50%, 
            rgb(${rBot}, ${gBot}, ${bBot}) 100%)`;
    });

    // Smooth scroll for internal navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Contact Form Submission (Real submission via Formspree AJAX)
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            formStatus.textContent = "Sending...";
            formStatus.className = "form-status";
            
            const data = new FormData(contactForm);
            
            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: data,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    formStatus.textContent = "Message sent successfully! We'll be in touch soon.";
                    formStatus.className = "form-status success";
                    contactForm.style.display = 'none'; // Hide the form fields
                } else {
                    const result = await response.json();
                    if (Object.hasOwn(result, 'errors')) {
                        formStatus.textContent = result.errors.map(error => error.message).join(", ");
                    } else {
                        formStatus.textContent = "Oops! There was a problem submitting your form.";
                    }
                    formStatus.className = "form-status error";
                }
            } catch (error) {
                formStatus.textContent = "Oops! There was a problem submitting your form.";
                formStatus.className = "form-status error";
            }

            // Message now stays on screen permanently per user request
        });
    }
});
