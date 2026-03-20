document.addEventListener('DOMContentLoaded', () => {
    const cursorGlow = document.getElementById('cursor-glow');
    const scrollBg = document.querySelector('.scroll-bg');
    
    // Mouse move effect (interactive glow)
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let glowX = mouseX;
    let glowY = mouseY;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth pursuit for the glow effect
    function animateGlow() {
        // Offset by 150px to center the 300x300px glow div on the cursor
        glowX += (mouseX - glowX) * 0.1;
        glowY += (mouseY - glowY) * 0.1;
        
        cursorGlow.style.transform = `translate(${glowX - 150}px, ${glowY - 150}px)`;
        requestAnimationFrame(animateGlow);
    }
    animateGlow();

    // Scroll effect to slowly change background color
    window.addEventListener('scroll', () => {
        // Calculate scroll percentage
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? window.scrollY / docHeight : 0;
        
        // Define color states
        // Top: #0a0a1a (Deep dark blue/black)
        // Middle: #1e1b4b (Deep violet/indigo)
        // Bottom: #172554 (Deep royal blue)
        
        // Very basic linear interpolation for color progression
        // You can tweak these RGB values to get the exact dark blue/purple mix wanted
        const rTop = Math.floor(10 + (scrollPercent * 20));
        const gTop = Math.floor(10 + (scrollPercent * 10));
        const bTop = Math.floor(26 + (scrollPercent * 30));
        
        const rMid = Math.floor(30 + (scrollPercent * 110)); // Shifts more purple
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
});
