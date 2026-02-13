window.addEventListener("load", () => {
    const nav = document.querySelector("nav");
    const greetContainer = document.querySelector(".greet-container");
    const loadingScreen = document.querySelector(".loading-screen");
    const loading = document.querySelector(".loading");
    const particlesContainer = document.getElementById("particles");
    const returnToTop = document.getElementById("returnToTop");
    
    // Return to top button functionality
    if (returnToTop) {
        window.addEventListener("scroll", () => {
            if (window.pageYOffset > 300) {
                returnToTop.classList.add("visible");
            } else {
                returnToTop.classList.remove("visible");
            }
        });

        returnToTop.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
    
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
                        
                        const cards = entry.target.querySelectorAll('.card');
                        cards.forEach((card, cardIndex) => {
                            card.style.animation = `cardReveal 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${delay + cardIndex * 100}ms forwards`;
                        });
                        
                        observer.unobserve(entry.target);
                    }, delay);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.carousel, nav, .block-container').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(50px)';
            observer.observe(el);
        });
    }

    // View Information Modal System
    const infoModalData = {
        characters: {
            targaryan: [
                { name: "Viserys I Targaryen", title: "King of Westeros", image: "characters/targaryan/viserys-1.jpg", description: "Viserys I was the fifth king of the Targaryen dynasty, known for his peaceful reign and his decision to name his daughter Rhaenyra as heir, which would later lead to the Dance of the Dragons.", era: "House of the Dragon Era" },
                { name: "Daemon Targaryen", title: "Prince of the Driftmark", image: "characters/targaryan/daemon.jpeg", description: "Daemon Targaryen was the younger brother of Viserys I, a skilled warrior and dragonrider, known for his ambition and his bond with the dragon Caraxes.", era: "House of the Dragon Era" },
                { name: "Rhaenyra Targaryen", title: "The Half-Year Queen", image: "characters/targaryan/rhaenyra.jpg", description: "Rhaenyra Targaryen was the first female heir to the Iron Throne, known as the 'Half-Year Queen' after the Dance of the Dragons civil war.", era: "House of the Dragon Era" },
                { name: "Aegon II Targaryen", title: "King of Westeros", image: "characters/targaryan/aegon-ii.jpg", description: "Aegon II usurped the throne from his half-sister Rhaenyra, leading to the brutal Dance of the Dragons civil war.", era: "House of the Dragon Era" },
                { name: "Aemond Targaryen", title: "Prince of Westeros", image: "characters/targaryan/aemond.avif", description: "Aemond Targaryen was a dragonrider who claimed Vhagar after Laena Velaryon's death, becoming one of the most formidable warriors of his time.", era: "House of the Dragon Era" },
                { name: "Helaena Targaryen", title: "Queen of Westeros", image: "characters/targaryan/helaena.webp", description: "Helaena Targaryen was the wife of Aegon II and mother to Jaehaera and Jaehaerys. She possessed greensight abilities.", era: "House of the Dragon Era" },
                { name: "Baela Targaryen", title: "Dragonrider", image: "characters/targaryan/baela.jpg", description: "Baela Targaryen was a dragonrider who rode Moondancer, known for her bold personality and fierce loyalty to her family.", era: "House of the Dragon Era" },
                { name: "Rhaena Targaryen", title: "Princess of Westeros", image: "characters/targaryan/rhaena.webp", description: "Rhaena Targaryen was the twin sister of Baela, known for her quieter nature and her eventual bond with the dragon Morning.", era: "House of the Dragon Era" },
                { name: "Daenerys Targaryen", title: "Mother of Dragons", image: "characters/targaryan/daenerys.jpg", description: "Daenerys Targaryen, also known as Dany, was the youngest child of King Aerys II. She hatched three dragons and freed the slaves of Essos.", era: "Game of Thrones Era" },
                { name: "Viserys Targaryen", title: "The Beggar King", image: "characters/targaryan/viserys.jpg", description: "Viserys was Daenerys' older brother, obsessed with reclaiming the Iron Throne. He was known as 'the Beggar King' in Essos.", era: "Game of Thrones Era" },
                { name: "Rhaegar Targaryen", title: "The Last Dragon", image: "characters/targaryan/rhaegar.avif", description: "Rhaegar was the eldest son of Aerys II, a skilled warrior and musician. His abduction of Lyanna Stark sparked Robert's Rebellion.", era: "Game of Thrones Era" },
                { name: "Aerys II 'The Mad King'", title: "King of Westeros", image: "characters/targaryan/aerys-ii.jpg", description: "Aerys II was the last Targaryen king before Robert's Rebellion. His madness and cruelty earned him the nickname 'The Mad King'.", era: "Game of Thrones Era" },
                { name: "Jon Snow / Aegon Targaryen", title: "Lord Commander", image: "characters/targaryan/jon-snow.avif", description: "Jon Snow, later revealed to be Aegon Targaryen, was the Bastard of Winterfell who became Lord Commander of the Night's Watch and King in the North.", era: "Game of Thrones Era" }
            ],
            stark: [
                { name: "Eddard Stark", title: "Lord of Winterfell", image: "characters/stark/eddard.jpg", description: "Eddard Stark was the head of House Stark and Lord of Winterfell. Known for his unwavering honor, he served as Hand of the King and was executed for his principles.", era: "Main Character" },
                { name: "Catelyn Stark", title: "Lady of Winterfell", image: "characters/stark/catelyn.webp", description: "Catelyn Stark was the wife of Eddard Stark and mother to Robb, Sansa, Arya, Bran, and Rickon. A fierce protector of her family.", era: "Main Character" },
                { name: "Robb Stark", title: "The Young Wolf", image: "characters/stark/robb.webp", description: "Robb Stark was declared King in the North after his father's death. Known as 'The Young Wolf', he won every battle but lost the war.", era: "Main Character" },
                { name: "Sansa Stark", title: "Queen in the North", image: "characters/stark/sansa.webp", description: "Sansa Stark transformed from a naive girl into a shrewd political player, eventually becoming Queen in the North.", era: "Main Character" },
                { name: "Arya Stark", title: "No One", image: "characters/stark/arya.webp", description: "Arya Stark trained as an assassin with the Faceless Men. She avenged her family and chose her own destiny.", era: "Main Character" },
                { name: "Bran Stark", title: "The Three-Eyed Raven", image: "characters/stark/bran.webp", description: "Bran Stark became the Three-Eye Raven, gaining the ability to see through time and influence the past.", era: "Main Character" },
                { name: "Rickon Stark", title: "Lord of Winterfell", image: "characters/stark/rickon.webp", description: "Rickon Stark was the youngest son of Eddard and Catelyn. He was tragically killed by Ramsay Bolton.", era: "Supporting Character" },
                { name: "Benjen Stark", title: "First Ranger", image: "characters/stark/benjen.webp", description: "Benjen Stark was the First Ranger of the Night's Watch and Eddard's brother. He saved Bran and Jon Snow beyond the Wall.", era: "Supporting Character" }
            ],
            lannister: [
                { name: "Tywin Lannister", title: "Lord of Casterly Rock", image: "characters/lannister/tywin.webp", description: "Tywin Lannister was the head of House Lannister and Hand of the King. Known for his ruthlessness and political acumen.", era: "Main Character" },
                { name: "Jaime Lannister", title: "Kingslayer", image: "characters/lannister/jaime.webp", description: "Jaime Lannister was the Kingslayer, known for killing the Mad King Aerys II. His journey led him to become a more honorable man.", era: "Main Character" },
                { name: "Cersei Lannister", title: "Queen of Westeros", image: "characters/lannister/cersei.webp", description: "Cersei Lannister was the wife of Robert Baratheon and later Queen. She would do anything to protect her children and power.", era: "Main Character" },
                { name: "Tyrion Lannister", title: "Hand of the King", image: "characters/lannister/tyrion.webp", description: "Tyrion Lannister was the smallest of the Lannister siblings but the most cunning. He served as Hand of the King multiple times.", era: "Main Character" },
                { name: "Joffrey Baratheon", title: "King of Westeros", image: "characters/lannister/joffrey.png", description: "Joffrey Baratheon was the eldest son of Cersei and Jaime. A cruel and sadistic king who was eventually poisoned.", era: "Supporting Character" },
                { name: "Myrcella Baratheon", title: "Princess of Westeros", image: "characters/lannister/myrcella.jpg", description: "Myrcella Baratheon was sent to Dorne as a political marriage. She lost an ear and later died in Cersei's arms.", era: "Supporting Character" },
                { name: "Tommen Baratheon", title: "King of Westeros", image: "characters/lannister/tommen.jpg", description: "Tommen Baratheon was a gentle boy king manipulated by his mother. He tragically took his own life.", era: "Supporting Character" },
                { name: "Kevan Lannister", title: "Lord of Casterly Rock", image: "characters/lannister/kevan.webp", description: "Kevan Lannister was Tywin's brother who briefly served as Hand of the King. He was killed by Varys.", era: "Supporting Character" }
            ],
            velaryon: [
                { name: "Corlys Velaryon", title: "The Sea Snake", image: "characters/velaryon/corlys.webp", description: "Corlys Velaryon was the legendary Sea Snake, the most famed adventurer in Westerosi history. He married Rhaenys Targaryen.", era: "House of the Dragon Era" },
                { name: "Rhaenys Targaryen", title: "The Queen Who Never Was", image: "characters/velaryon/rhaenys.webp", description: "Rhaenys Targaryen was passed over for the throne in favor of her cousin Viserys. She became 'The Queen Who Never Was'.", era: "House of the Dragon Era" },
                { name: "Laenor Velaryon", title: "Ser Dragonrider", image: "characters/velaryon/laenor.jpg", description: "Laenor Velaryon was a dragonrider who rode Seasmoke. His marriage to Rhaenyra was complicated by his preferences.", era: "House of the Dragon Era" },
                { name: "Laena Velaryon", title: "Lady of Driftmark", image: "characters/velaryon/laena.avif", description: "Laena Velaryon was a dragonrider who rode Vhagar before Aemond. She married Daemon Targaryen.", era: "House of the Dragon Era" },
                { name: "Vaemond Velaryon", title: "Lord of Driftmark", image: "characters/velaryon/vaemond.webp", description: "Vaemond Velaryon challenged the legitimacy of Rhaenyra's sons. He was killed byDaemon Targaryen.", era: "House of the Dragon Era" }
            ],
            hightower: [
                { name: "Otto Hightower", title: "Hand of the King", image: "characters/hightower/otto.webp", description: "Otto Hightower was the Hand of the King to Viserys I. He was the father of Alicent and a key political figure.", era: "House of the Dragon Era" },
                { name: "Alicent Hightower", title: "Queen of Westeros", image: "characters/hightower/alicent.jpg", description: "Alicent Hightower was the second wife of Viserys I and mother to Aegon II. Her rivalry with Rhaenyra sparked the Dance.", era: "House of the Dragon Era" },
                { name: "Ser Criston Cole", title: "Lord Commander", image: "characters/hightower/criston.webp", description: "Criston Cole was a skilled knight who became Lord Commander of the Kingsguard. His actions helped ignite the Dance of the Dragons.", era: "House of the Dragon Era" }
            ],
            baratheon: [
                { name: "Robert Baratheon", title: "King of Westeros", image: "characters/baratheon/robert.webp", description: "Robert Baratheon won the Iron Throne in rebellion against the Targaryens. He was a great warrior but a poor king.", era: "Main Character" },
                { name: "Stannis Baratheon", title: "King of Westeros", image: "characters/baratheon/stannis.webp", description: "Stannis Baratheon was the second son of Steffon. He claimed the Iron Throne and turned to the Lord of Light.", era: "Main Character" },
                { name: "Renly Baratheon", title: "King of Westeros", image: "characters/baratheon/renly.avif", description: "Renly Baratheon was the youngest Baratheon brother. Charismatic and beloved, he claimed the throne before being assassinated.", era: "Supporting Character" },
                { name: "Shireen Baratheon", title: "Princess of Westeros", image: "characters/baratheon/shireen.webp", description: "Shireen Baratheon was Stannis's daughter. Despite her gentle nature, she was tragically burned by her own father.", era: "Supporting Character" },
                { name: "Borros Baratheon", title: "Lord of Storm's End", image: "characters/baratheon/borros.webp", description: "Borros Baratheon was the lord of Storm's End during the Dance of the Dragons. His allegiance shaped the war's early battles.", era: "House of the Dragon Era" }
            ],
            tyrell: [
                { name: "Olenna Tyrell", title: "Queen of Thorns", image: "characters/tyrell/olenna.webp", description: "Olenna Tyrell, known as the Queen of Thorns, was the matriarch of House Tyrell. Sharp-tongued and cunning.", era: "Supporting Character" },
                { name: "Margaery Tyrell", title: "Queen of Westeros", image: "characters/tyrell/margaery.jpg", description: "Margaery Tyrell was a beautiful and charming queen who married both Renly and Joffrey. She was loved by the people.", era: "Main Character" },
                { name: "Loras Tyrell", title: "Knight of the Flowers", image: "characters/tyrell/loras.webp", description: "Loras Tyrell was a famed knight known as the Knight of the Flowers. He was Renly's lover and a skilled warrior.", era: "Supporting Character" }
            ],
            tully: [
                { name: "Catelyn Stark (Tully)", title: "Lady of Winterfell", image: "characters/tully/catelyn.jpg", description: "Catelyn Stark was born a Tully. She was a fierce protector of her family and a skilled diplomat.", era: "Main Character" },
                { name: "Lysa Arryn", title: "Lady of the Vale", image: "characters/tully/lysa.webp", description: "Lysa Arryn was Catelyn's sister. She ruled the Vale and was manipulated by Petyr Baelish.", era: "Supporting Character" },
                { name: "Edmure Tully", title: "Lord of Riverrun", image: "characters/tully/edmure.webp", description: "Edmure Tully was the lord of Riverrun. Well-meaning but often underestimated.", era: "Supporting Character" },
                { name: "Brynden 'Blackfish' Tully", title: "Knight of the Vale", image: "characters/tully/blackfish.webp", description: "Brynden Tully was Catelyn's uncle and a legendary warrior. He escaped the Twins and defended Riverrun.", era: "Supporting Character" }
            ],
            arryn: [
                { name: "Jon Arryn", title: "Hand of the King", image: "characters/arryn/jon.webp", description: "Jon Arryn was the Hand of the King before Robert. His death sparked the events of Game of Thrones.", era: "Supporting Character" },
                { name: "Robin Arryn", title: "Lord of the Vale", image: "characters/arryn/robin.webp", description: "Robin Arryn was the sickly heir to the Vale. He was heavily influenced by his mother Lysa.", era: "Supporting Character" }
            ],
            mormont: [
                { name: "Jeor Mormont", title: "Lord Commander", image: "characters/mormont/jeor.webp", description: "Jeor Mormont was the Lord Commander of the Night's Watch. He treated Jon Snow like a son.", era: "Supporting Character" },
                { name: "Jorah Mormont", title: "Knight of the Watch", image: "characters/mormont/jorah.webp", description: "Jorah Mormont was a disgraced Night's Watch man who became Daenerys's loyal advisor.", era: "Supporting Character" },
                { name: "Lyanna Mormont", title: "Lady of Bear Island", image: "characters/mormont/lyanna.webp", description: "Lyanna Mormont was a young but fierce leader who united the North against Ramsay Bolton.", era: "Supporting Character" }
            ],
            frey: [
                { name: "Walder Frey", title: "Lord of the Twins", image: "characters/frey/walder.webp", description: "Walder Frey was the lord who controlled the Twins crossing. He orchestrated the Red Wedding.", era: "Villain" }
            ],
            martell: [
                { name: "Doran Martell", title: "Prince of Dorne", image: "characters/martell/doran.webp", description: "Doran Martell was the Prince of Dorne. Known for his patience and caution in seeking revenge.", era: "Supporting Character" },
                { name: "Oberyn Martell", title: "The Red Viper", image: "characters/martell/oberyn.jpg", description: "Oberyn Martell was the 'Red Viper', a deadly warrior seeking vengeance for his sister's death.", era: "Supporting Character" },
                { name: "Ellaria Sand", title: "Paramour of Oberyn", image: "characters/martell/ellaria.jpg", description: "Ellaria Sand was Oberyn's partner. After his death, she embraced ruthless revenge.", era: "Supporting Character" }
            ]
        }
    };

    // Dragon data
    const dragonData = [
        { name: "Balerion the Black Dread", title: "The Black Dread", description: "The largest and most feared Targaryen dragon; black scales, black fire, and wings that blocked out the sun. Ridden by Aegon the Conqueror.", image: "dragons/balerion/b1.webp", era: "Ancestor Era" },
        { name: "Vhagar", title: "The Titan", description: "A titan nearly as large as Balerion; bronze and green; lived for over 170 years. Ridden by Visenya, then Laena, then Aemond.", image: "dragons/vhagar/v1.jpg", era: "Ancestor Era" },
        { name: "Meraxes", title: "The Silver Dragon", description: "Massive silver dragon with golden eyes; ridden by Rhaenys Targaryen. Fell during the Dornish Wars.", image: "dragons/meraxes/m1.webp", era: "Ancestor Era" },
        { name: "Vermithor", title: "Bronze Fury", description: "Huge bronze dragon once ridden by King Jaehaerys I; one of the largest dragons ever after Balerion and Vhagar.", image: "dragons/vermithor/v1.webp", era: "Ancestor Era" },
        { name: "Silverwing", title: "The Silver Dragon", description: "A gentle silver dragon ridden by Queen Alysanne; known for her calm temperament.", image: "dragons/silverwing/s1.webp", era: "Ancestor Era" },
        { name: "Caraxes", title: "Blood Wyrm", description: "Long, serpentine, blood-red dragon with a piercing scream; ridden by Daemon Targaryen.", image: "dragons2/caraxes/c1.jpg", era: "Dance of the Dragons" },
        { name: "Syrax", title: "The Yellow Dragon", description: "Yellow-gold dragon ridden by Rhaenyra Targaryen; fast and aggressive, raised mostly in captivity.", image: "dragons2/syrax/s1.jpg", era: "Dance of the Dragons" },
        { name: "Sunfyre", title: "The Golden", description: "Brilliant golden scales; considered the most beautiful dragon in history; ridden by Aegon II.", image: "dragons2/sunfyre/s1.jpg", era: "Dance of the Dragons" },
        { name: "Meleys", title: "Red Queen", description: "Red and pink scaled, extremely fast; ridden by Rhaenys Targaryen.", image: "dragons2/meleys/m1.jpg", era: "Dance of the Dragons" },
        { name: "Moondancer", title: "The Swift Dragon", description: "Small but incredibly quick green dragon ridden by Baela Targaryen; built for agility rather than size.", image: "dragons2/moondancer/m1.jpg", era: "Dance of the Dragons" },
        { name: "Seasmoke", title: "The Grey Dragon", description: "Grey-white dragon, nimble and responsive; ridden first by Laenor Velaryon and later Addam of Hull.", image: "dragons2/seasmoke/s1.avif", era: "Dance of the Dragons" },
        { name: "Drogon", title: "The Black Dread", description: "Black-and-red, largest of Daenerys's dragons; fierce, intelligent, and the closest in spirit to Balerion.", image: "dragons3/drogon/d1.jpg", era: "Game of Thrones" },
        { name: "Rhaegal", title: "The Green Dragon", description: "Green-and-bronze dragon; aggressive but loyal; named after Rhaegar Targaryen.", image: "dragons3/rhaegal/r1.jpg", era: "Game of Thrones" },
        { name: "Viserion", title: "The White Dragon", description: "Cream-and-gold dragon; fiery and swift; becomes an undead ice dragon in the show.", image: "dragons3/viserion/v1.jpg", era: "Game of Thrones" }
    ];

    // Race data
    const raceData = [
        { name: "First Men", description: "The oldest human race in Westeros; strong ties to the Old Gods. Northerners like the Starks descend from them. They arrived thousands of years before the Andals and forged alliances with the Children of the Forest.", image: "races/firstmen.jpg", origin: "Westeros" },
        { name: "Andals", description: "Invaders who conquered most of Westeros after the First Men; followers of the Faith of the Seven. They brought knighthood and the feudal system to Westeros.", image: "races/andals.jpg", origin: "Essos (Andal Invasion)" },
        { name: "Valyrians", description: "Dragonlords from ancient Valyria with silver-gold hair and violet eyes; ancestors of the Targaryens and Velaryons. Their magical bloodline allows them to bond with dragons.", image: "races/valyrians.jpg", origin: "Valyria" },
        { name: "Children of the Forest", description: "Small, magical, ancient beings who lived in Westeros before humans; created the weirwoods. They have green skin and use powerful magic.", image: "races/children.jpg", origin: "Westeros (Ancient)" },
        { name: "Giants", description: "Large, near-extinct humanoids beyond the Wall; primitive but intelligent. They ride mammoths and are friendly to the Free Folk.", image: "races/giants.jpg", origin: "Beyond the Wall" },
        { name: "White Walkers", description: "Supernatural ice beings who command the dead; ancient enemies of the living. Created by the Children of the Forest to protect themselves.", image: "races/whitewalkers.jpg", origin: "Land of Always Winter" },
        { name: "Wights", description: "Reanimated corpses controlled by the White Walkers; not a race, but an undead force. They can be destroyed by fire or dragonglass.", image: "races/wights.jpg", origin: "White Walkers" },
        { name: "Free Folk", description: "Human tribes north of the Wall; fiercely independent and culturally unique. They reject the authority of the Seven Kingdoms.", image: "races/wildlings.jpg", origin: "Beyond the Wall" },
        { name: "Essosi Peoples", description: "Includes Dothraki (horse nomads), Ghiscari (slaver cities), Qartheen (merchant rulers), Braavosi, Lyseni, Volantenes, and more — each with distinct cultures and traditions.", image: "races/essosi.jpg", origin: "Essos" }
    ];

    // Location data
    const locationData = [
        { name: "King's Landing", description: "Capital of the Seven Kingdoms; home to the Red Keep and the Iron Throne. The largest city in Westeros, known for its politics and intrigue.", image: "location/kingslanding.webp", region: "Crownlands" },
        { name: "Dragonstone", description: "Volcanic island and ancestral Targaryen seat; major dragon-hatching site. A strategic fortress controlling the Blackwater Bay.", image: "location/dragonstone.jpg", region: "Crownlands" },
        { name: "Winterfell", description: "Ancient northern stronghold of House Stark; built atop hot springs. The seat of power in the North for thousands of years.", image: "location/winterfell.jpg", region: "The North" },
        { name: "The Wall", description: "A colossal frozen barrier defending the realms of men from the far North; home to the Night's Watch. 300 miles long and 700 feet tall.", image: "location/thewall.jpg", region: "The North" },
        { name: "Beyond the Wall", description: "Harsh wilderness inhabited by Free Folk, giants, and White Walkers. A dangerous and mysterious land beyond civilization.", image: "location/beyondthewall.jpg", region: "Far North" },
        { name: "Oldtown", description: "Seat of the Hightowers; home to the Citadel and the Faith's origins. The oldest city in Westeros and center of learning.", image: "location/oldtown.webp", region: "The Reach" },
        { name: "The Riverlands", description: "A central region often caught in wars; includes Riverrun and Harrenhal. Known for its fertile farmlands and many rivers.", image: "location/riverlands.jpg", region: "Riverlands" },
        { name: "The Vale of Arryn", description: "Mountainous, isolated region guarded by the Eyrie. Nearly impregnable due to its mountain passes.", image: "location/vale.webp", region: "The Vale" },
        { name: "The Iron Islands", description: "Harsh seafaring land ruled by House Greyjoy. The ironborn follow the 'Old Way' of raiding and reaving.", image: "location/ironislands.jpg", region: "Iron Islands" },
        { name: "Dorne", description: "Southern desert kingdom known for a hot climate and different customs. The only region never conquered by the Targaryens.", image: "location/dorne.avif", region: "Dorne" }
    ];

    // Organization data
    const orgData = [
        { name: "Night's Watch", description: "A sworn brotherhood protecting the Wall; vows of celibacy, loyalty, and service. They defend the realm from the threats beyond the Wall.", image: "org/nightwatch.jpg", type: "Military Order" },
        { name: "Kingsguard", description: "Elite white-armored knights who protect the king. The most prestigious and deadly knights in the Seven Kingdoms.", image: "org/kingsguard.jpg", type: "Royal Guard" },
        { name: "Small Council", description: "Ruling advisory council in King's Landing; handles royal governance. Includes the Hand, Master of Coin, and other advisors.", image: "org/smallcouncil.webp", type: "Government" },
        { name: "The Citadel", description: "Scholarly order in Oldtown where maesters train. They record history and provide education to the nobility.", image: "org/citadel.webp", type: "Educational" },
        { name: "Faith of the Seven", description: "Main religion of most Westerosi; includes septons, septas, and the Faith Militant. The dominant faith of the Seven Kingdoms.", image: "org/faith7.webp", type: "Religion" },
        { name: "Dothraki Khalsar", description: "Nomadic horse tribe led by a khal; structured around warfare and raiding. Fearless warriors who follow the strongest leaders.", image: "org/khalsar.webp", type: "Tribe" },
        { name: "Unsullied", description: "Elite slave-soldier army trained for discipline and obedience. Eunuch warriors who feel no pain in battle.", image: "org/unsullied.jpg", type: "Mercenary Army" },
        { name: "Iron Bank of Braavos", description: "The most powerful financial institution in the known world. They fund wars and always get their debts repaid.", image: "org/ironbank.jpg", type: "Bank" },
        { name: "Faceless Men", description: "An ancient assassin cult from Braavos who worship the Many-Faced God. The most feared assassins in the world.", image: "org/facelessmen.jpg", type: "Assassin Cult" },
        { name: "Golden Company", description: "A massive, elite sellsword army founded by exiled Westerosi. The most famous and successful mercenary company.", image: "org/goldencompany.jpg", type: "Mercenary Army" }
    ];

    // Magic data
    const magicData = [
        { name: "Dragons", description: "Fire-breathing reptiles born of Valyria; magic returns to the world when Daenerys hatches three eggs. The most powerful weapon in the world.", image: "magic/dragons/d1.jpg", type: "Creatures" },
        { name: "Warging / Skinchanging", description: "Ability to enter the minds of animals or other beings; strongest among the First Men and wildlings. Allows for communication and control.", image: "magic/skinchanging.jpg", type: "Magic Power" },
        { name: "Greensight", description: "Prophetic visions or dreams; sometimes linked to weirwoods or children of the forest. Allows seeing future events.", image: "magic/greensight.jpg", type: "Magic Power" },
        { name: "Weirwood Trees", description: "White-barked, red-leafed trees tied to ancient magic and memory. They are sacred to the Old Gods.", image: "magic/weirwoodtrees.webp", type: "Magical Objects" },
        { name: "Ice Magic", description: "Magic that raises the dead, controls cold, and empowers ice creatures. Used by the White Walkers.", image: "magic/icemagic.jpg", type: "Magic Power" },
        { name: "Fire Magic", description: "Miracles like resurrection (Beric, Jon Snow), shadowborn assassins, and prophetic flames. Followers of R'hllor.", image: "magic/firemagic.jpg", type: "Magic Power" },
        { name: "Valyrian Steel", description: "Magic-forged metal that can kill White Walkers; nearly lost art. More deadly than regular steel.", image: "magic/valyriansteel.jpg", type: "Weapons" },
        { name: "Glass Candles", description: "Obsidian artifacts used by the Valyrians for seeing across distances and influencing dreams. Extremely rare.", image: "magic/glasscandles.jpg", type: "Magical Objects" },
        { name: "Dragon glass", description: "Volcanic glass that kills White Walkers; found in abundance at Dragonstone. Essential weapon against the dead.", image: "magic/dragonglass.jpg", type: "Weapons" }
    ];

    // Create compact cards function
    function createCompactCards(data, container, cardClass, subtitleClass, modalData) {
        if (!container) return;
        
        container.innerHTML = '';
        
        data.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = cardClass;
            card.style.animationDelay = `${index * 0.05}s`;
            
            const subtitle = item.era || item.origin || item.region || item.type || '';
            
            card.innerHTML = `
                <h2>${item.name}</h2>
                ${subtitle ? `<span class="${subtitleClass}">${subtitle}</span>` : ''}
                <button class="view-info-btn" data-item-index="${index}" data-modal-type="${modalData}">View Information</button>
            `;
            
            container.appendChild(card);
        });

        // Add click handlers for view info buttons
        container.querySelectorAll('.view-info-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const index = parseInt(btn.dataset.itemIndex);
                const modalType = btn.dataset.modalType;
                showInfoModal(modalType, index);
            });
        });
    }

    // Show info modal function
    function showInfoModal(type, index) {
        let item, modalTitle;
        
        switch(type) {
            case 'characters':
                // This will be handled by specific character modals
                return;
            case 'dragons':
                item = dragonData[index];
                modalTitle = 'Dragon Information';
                break;
            case 'races':
                item = raceData[index];
                modalTitle = 'Race Information';
                break;
            case 'locations':
                item = locationData[index];
                modalTitle = 'Location Information';
                break;
            case 'organizations':
                item = orgData[index];
                modalTitle = 'Organization Information';
                break;
            case 'magic':
                item = magicData[index];
                modalTitle = 'Magic Information';
                break;
            default:
                return;
        }

        if (!item) return;

        const modal = document.createElement('div');
        modal.className = 'info-modal';
        modal.innerHTML = `
            <div class="info-modal-content">
                <button class="info-modal-close">&times;</button>
                <img class="info-modal-image" src="${item.image}" alt="${item.name}">
                <h2>${item.name}</h2>
                ${item.title ? `<p class="modal-subtitle">${item.title}</p>` : ''}
                <span class="modal-label">${type === 'dragons' ? 'Era' : type === 'races' ? 'Origin' : type === 'locations' ? 'Region' : 'Type'}</span>
                <p>${item.era || item.origin || item.region || item.type}</p>
                <span class="modal-label">Description</span>
                <p>${item.description}</p>
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
            }, 400);
        };
        
        modal.querySelector('.info-modal-close').addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeModal();
        });
    }

    // Initialize compact cards for dragons page
    const dragonCardsContainer = document.getElementById('dragonCardsContainer');
    if (dragonCardsContainer) {
        createCompactCards(dragonData, dragonCardsContainer, 'dragon-compact-card', 'dragon-origin', 'dragons');
    }

    // Initialize compact cards for races page
    const raceCardsContainer = document.getElementById('raceCardsContainer');
    if (raceCardsContainer) {
        createCompactCards(raceData, raceCardsContainer, 'race-compact-card', 'race-origin', 'races');
    }

    // Initialize compact cards for locations page
    const locationCardsContainer = document.getElementById('locationCardsContainer');
    if (locationCardsContainer) {
        createCompactCards(locationData, locationCardsContainer, 'location-compact-card', 'location-region', 'locations');
    }

    // Initialize compact cards for organizations page
    const orgCardsContainer = document.getElementById('orgCardsContainer');
    if (orgCardsContainer) {
        createCompactCards(orgData, orgCardsContainer, 'org-compact-card', 'org-type', 'organizations');
    }

    // Initialize compact cards for magic page
    const magicCardsContainer = document.getElementById('magicCardsContainer');
    if (magicCardsContainer) {
        createCompactCards(magicData, magicCardsContainer, 'magic-compact-card', 'magic-type', 'magic');
    }

    // Character compact cards - will be initialized per house
    function initCharacterCards(house, containerId) {
        const container = document.getElementById(containerId);
        if (!container || !infoModalData.characters[house]) return;
        
        const characters = infoModalData.characters[house];
        
        container.innerHTML = '';
        
        characters.forEach((char, index) => {
            const card = document.createElement('div');
            card.className = 'compact-card character-compact';
            card.style.animationDelay = `${index * 0.05}s`;
            
            card.innerHTML = `
                <h2>${char.name}</h2>
                <span class="house-origin">${char.era}</span>
                <button class="view-info-btn" data-house="${house}" data-char-index="${index}">View Information</button>
            `;
            
            container.appendChild(card);
        });

        // Add click handlers
        container.querySelectorAll('.view-info-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const house = btn.dataset.house;
                const index = parseInt(btn.dataset.charIndex);
                showCharacterModal(house, index);
            });
        });
    }

    // Initialize character cards for each house
    const characterHouses = [
        { id: 'targaryanChars', container: 'targaryanChars' },
        { id: 'starkChars', container: 'starkChars' },
        { id: 'lannisterChars', container: 'lannisterChars' },
        { id: 'velaryonChars', container: 'velaryonChars' },
        { id: 'hightowerChars', container: 'hightowerChars' },
        { id: 'baratheonChars', container: 'baratheonChars' },
        { id: 'tyrellChars', container: 'tyrellChars' },
        { id: 'tullyChars', container: 'tullyChars' },
        { id: 'arrynChars', container: 'arrynChars' },
        { id: 'mormontChars', container: 'mormontChars' },
        { id: 'freyChars', container: 'freyChars' },
        { id: 'martellChars', container: 'martellChars' }
    ];

    characterHouses.forEach(house => {
        initCharacterCards(house.id, house.container);
    });

    // Handle Targaryen GOT characters (separate from HotD)
    const targaryanGotContainer = document.getElementById('targaryanGotChars');
    if (targaryanGotContainer) {
        const gotChars = [
            infoModalData.characters.targaryan[8],
            infoModalData.characters.targaryan[9],
            infoModalData.characters.targaryan[10],
            infoModalData.characters.targaryan[11],
            infoModalData.characters.targaryan[12]
        ];
        
        targaryanGotContainer.innerHTML = '';
        
        gotChars.forEach((char, index) => {
            const card = document.createElement('div');
            card.className = 'compact-card character-compact';
            card.style.animationDelay = `${index * 0.05}s`;
            
            card.innerHTML = `
                <h2>${char.name}</h2>
                <span class="house-origin">${char.era}</span>
                <button class="view-info-btn" data-house="targaryan" data-char-index="${index + 8}">View Information</button>
            `;
            
            targaryanGotContainer.appendChild(card);
        });

        targaryanGotContainer.querySelectorAll('.view-info-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const house = btn.dataset.house;
                const index = parseInt(btn.dataset.charIndex);
                showCharacterModal(house, index);
            });
        });
    }

        // Add click handlers
        container.querySelectorAll('.view-info-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const house = btn.dataset.house;
                const index = parseInt(btn.dataset.charIndex);
                showCharacterModal(house, index);
            });
        });
    }

    // Show character modal
    function showCharacterModal(house, index) {
        const char = infoModalData.characters[house][index];
        if (!char) return;

        const modal = document.createElement('div');
        modal.className = 'info-modal';
        modal.innerHTML = `
            <div class="info-modal-content">
                <button class="info-modal-close">&times;</button>
                <img class="info-modal-image" src="${char.image}" alt="${char.name}">
                <h2>${char.name}</h2>
                <p class="modal-subtitle">${char.title}</p>
                <span class="modal-label">Era</span>
                <p>${char.era}</p>
                <span class="modal-label">Biography</span>
                <p>${char.description}</p>
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
            }, 400);
        };
        
        modal.querySelector('.info-modal-close').addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeModal();
        });
    }

    // Initialize character cards for each house
    const characterHouses = [
        { id: 'targaryanChars', container: 'targaryanChars' },
        { id: 'starkChars', container: 'starkChars' },
        { id: 'lannisterChars', container: 'lannisterChars' },
        { id: 'velaryonChars', container: 'velaryonChars' },
        { id: 'hightowerChars', container: 'hightowerChars' },
        { id: 'baratheonChars', container: 'baratheonChars' },
        { id: 'tyrellChars', container: 'tyrellChars' },
        { id: 'tullyChars', container: 'tullyChars' },
        { id: 'arrynChars', container: 'arrynChars' },
        { id: 'mormontChars', container: 'mormontChars' },
        { id: 'freyChars', container: 'freyChars' },
        { id: 'martellChars', container: 'martellChars' }
    ];

    characterHouses.forEach(house => {
        initCharacterCards(house.id, house.container);
    });

    // Add animation keyframes
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
