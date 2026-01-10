window.addEventListener("load", () => {
    const nav = document.querySelector("nav");
    const greetContainer = document.querySelector(".greet-container");
    const loadingScreen = document.querySelector(".loading-screen");
    const loading = document.querySelector(".loading");
    const particlesContainer = document.getElementById("particles");
    
    // Create particle effects
    function createParticles() {
        if (!particlesContainer) return;
        
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 8 + 's';
                particle.style.width = Math.random() * 3 + 1 + 'px';
                particle.style.height = particle.style.width;
                particle.style.background = `hsl(${30 + Math.random() * 30}, 70%, ${50 + Math.random() * 20}%)`;
                particlesContainer.appendChild(particle);
            }, i * 100);
        }
        
        // Create fire particles around greeting area
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const fireParticle = document.createElement('div');
                fireParticle.className = 'fire-particle';
                fireParticle.style.left = (40 + Math.random() * 20) + '%';
                fireParticle.style.bottom = '10%';
                fireParticle.style.animationDelay = Math.random() * 3 + 's';
                fireParticle.style.width = Math.random() * 4 + 2 + 'px';
                fireParticle.style.height = fireParticle.style.width;
                particlesContainer.appendChild(fireParticle);
            }, i * 150);
        }
    }
    
    createParticles();

    if (!greetContainer || !loadingScreen || !loading) {
        console.warn("Loading elements not found; skipping loading sequence.");
        document.body.style.overflow = "auto";
        return;
    }

    const greets = [
        document.getElementById("greet1"),
        document.getElementById("greet2"),
        document.getElementById("greet3")
    ].filter(g => g);

    const loadingScreenH2 = loadingScreen.querySelector("h2");
    const bar = document.querySelector(".loading-bar");

    const GREET_DURATION = 3000;
    const LOADING_BAR_TIME = 15000;
    let greetIndex = 0;

    document.body.style.overflow = "hidden";

    function showNextGreet() {
        greets.forEach(g => g.style.opacity = 0);

        if (greetIndex < greets.length) {
            const current = greets[greetIndex];
            current.style.opacity = 1;
            greetIndex++;
            setTimeout(showNextGreet, GREET_DURATION);
        } else {
            setTimeout(startLoadingScreen, GREET_DURATION);
        }
    }

    function startLoadingScreen() {
        loadingScreen.style.display = "flex";
        setTimeout(() => {
            loadingScreen.style.opacity = 1;
            loadingScreen.style.pointerEvents = "auto";
        }, 50);

        greetContainer.style.opacity = 0;
        setTimeout(() => greetContainer.style.display = "none", 500);

        if (bar) {
            bar.style.transition = `width ${LOADING_BAR_TIME}ms linear`;
            bar.style.width = "100%";
        }

        if (loadingScreenH2) {
            setTimeout(() => loadingScreenH2.style.opacity = 0, LOADING_BAR_TIME - 1000);
        }

        setTimeout(() => {
            loadingScreen.style.opacity = 0;
            loadingScreen.style.pointerEvents = "none";
        }, LOADING_BAR_TIME - 500);

        setTimeout(() => {
            loading.style.display = "none";
            document.body.style.overflow = "auto";
        }, LOADING_BAR_TIME + 500);
    }

    showNextGreet();

    const carousels = document.querySelectorAll('.carousel');

    carousels.forEach(carousel => {
        const group = carousel.querySelector('.group');

        if (!group) {
            console.warn("Carousel group not found.");
            return;
        }

        const clonedGroup = group.cloneNode(true);
        group.appendChild(clonedGroup);

        const totalContentWidth = group.scrollWidth;
        const originalContentWidth = totalContentWidth / 2;

        const scrollSpeed = 1;
        let position = 0;
        let isPaused = false;
        let animationFrameId;
        let touchStartX = 0;
        let touchEndX = 0;

        carousel.setAttribute("role", "region");
        carousel.setAttribute("aria-label", "Image carousel");

        function scroll() {
            if (!isPaused) {
                position += scrollSpeed;
                if (position >= originalContentWidth) position = 0;
                group.style.transform = `translateX(-${position}px)`;
            }
            animationFrameId = requestAnimationFrame(scroll);
        }

        function pauseScroll() {
            isPaused = true;
        }

        function resumeScroll() {
            isPaused = false;
        }

        carousel.addEventListener('mouseenter', pauseScroll);
        carousel.addEventListener('mouseleave', resumeScroll);
        carousel.addEventListener('focusin', pauseScroll);
        carousel.addEventListener('focusout', resumeScroll);
        carousel.addEventListener('keydown', (e) => {
            if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                isPaused ? resumeScroll() : pauseScroll();
            }
        });

        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            pauseScroll();
        });
        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            if (Math.abs(touchEndX - touchStartX) < 50) {
                resumeScroll();
            }
        });

        // Add click to expand functionality
        const cards = carousel.querySelectorAll('.card');
        cards.forEach(card => {
            card.addEventListener('click', (e) => {
                e.stopPropagation();
                expandCard(card);
            });
        });
        
        function expandCard(card) {
            const img = card.querySelector('img');
            const title = card.dataset.title || 'Image';
            const overlay = card.querySelector('.card-overlay');
            
            if (card.dataset.expanded === 'true') {
                card.dataset.expanded = 'false';
                return;
            }
            
            card.dataset.expanded = 'true';
            
            const modal = document.createElement('div');
            modal.className = 'image-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <img src="${img.src}" alt="${title}">
                    <h3>${title}</h3>
                </div>
            `;
            document.body.appendChild(modal);
            document.body.style.overflow = 'hidden';
            
            setTimeout(() => modal.classList.add('active'), 10);
            
            const closeModal = () => {
                modal.classList.remove('active');
                setTimeout(() => {
                    document.body.removeChild(modal);
                    document.body.style.overflow = '';
                    card.dataset.expanded = 'false';
                }, 300);
            };
            
            modal.querySelector('.close-modal').addEventListener('click', closeModal);
            modal.addEventListener('click', (e) => {
                if (e.target === modal) closeModal();
            });
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') closeModal();
            });
        }

        carousel.setAttribute("tabindex", "0");

        scroll();

        window.addEventListener("beforeunload", () => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        });
    });

    // Parallax scrolling effect
    function initParallax() {
        const carousels = document.querySelectorAll('.carousel');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            carousels.forEach((carousel, index) => {
                const speed = 0.5 + (index * 0.1);
                const yPos = -(scrolled * speed);
                carousel.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    // Enhanced smooth reveal animations
    function initRevealAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    const delay = index * 150;
                    setTimeout(() => {
                        entry.target.style.animation = `revealUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards`;
                        
                        // Add staggered animation for cards within
                        const cards = entry.target.querySelectorAll('.card');
                        cards.forEach((card, cardIndex) => {
                            card.style.animation = `cardReveal 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${delay + cardIndex * 100}ms forwards`;
                        });
                        
                        observer.unobserve(entry.target);
                    }, delay);
                }
            });
        }, observerOptions);

        // Observe all interactive elements
        document.querySelectorAll('.carousel, nav, .block-container').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(50px)';
            observer.observe(el);
        });
    }

    // Add enhanced reveal animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes revealUp {
            0% {
                opacity: 0;
                transform: translateY(50px) scale(0.95);
                filter: blur(5px);
            }
            50% {
                opacity: 0.8;
                transform: translateY(-10px) scale(1.02);
                filter: blur(2px);
            }
            100% {
                opacity: 1;
                transform: translateY(0) scale(1);
                filter: blur(0);
            }
        }
        
        @keyframes cardReveal {
            0% {
                opacity: 0;
                transform: translateY(30px) rotateX(15deg) scale(0.8);
            }
            100% {
                opacity: 1;
                transform: translateY(0) rotateX(0) scale(1);
            }
        }
        
        .smooth-scroll {
            scroll-behavior: smooth;
        }
        
        body {
            scroll-behavior: smooth;
        }
    `;
    document.head.appendChild(style);

    initParallax();
    initRevealAnimations();
});