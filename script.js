window.addEventListener("load", () => {
    const nav = document.querySelector("nav");
    const greetContainer = document.querySelector(".greet-container");
    const loadingScreen = document.querySelector(".loading-screen");
    const loading = document.querySelector(".loading");

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

        carousel.setAttribute("tabindex", "0");

        scroll();

        window.addEventListener("beforeunload", () => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        });
    });
});