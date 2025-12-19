    <!-- JavaScript -->
    <script>
        // Premium Loading Animation
        window.addEventListener('load', () => {
            const loadingScreen = document.getElementById('loadingScreen');
            
            // Animate loading screen out
            gsap.to(loadingScreen, {
                opacity: 0,
                duration: 1,
                ease: "power2.inOut",
                delay: 2,
                onComplete: () => {
                    loadingScreen.style.display = 'none';
                    initAnimations();
                }
            });

            // Animate loading elements
            gsap.to(".loading-logo", {
                rotation: 360,
                duration: 20,
                repeat: -1,
                ease: "none"
            });

            gsap.to(".loading-dot", {
                y: -20,
                duration: 1,
                repeat: -1,
                yoyo: true,
                stagger: 0.2
            });
        });

        // Initialize HLS Video Streaming
        function initHLSVideo() {
            const video = document.getElementById('heroVideo');
            
            if (Hls.isSupported()) {
                const hls = new Hls({
                    maxBufferLength: 30,
                    maxMaxBufferLength: 60,
                    enableWorker: true,
                    lowLatencyMode: true,
                    backBufferLength: 90
                });
                
                // HLS stream URL (replace with your actual HLS stream)
                const hlsUrl = 'https://bitdash-a.akamaihd.net/s/content/media/video/hls/bbb/bbb_1080p_hls.m3u8';
                
                hls.loadSource(hlsUrl);
                hls.attachMedia(video);
                hls.on(Hls.Events.MANIFEST_PARSED, () => {
                    video.play().catch(e => console.log('Auto-play prevented:', e));
                });
                
                hls.on(Hls.Events.ERROR, (event, data) => {
                    if (data.fatal) {
                        switch(data.type) {
                            case Hls.ErrorTypes.NETWORK_ERROR:
                                hls.startLoad();
                                break;
                            case Hls.ErrorTypes.MEDIA_ERROR:
                                hls.recoverMediaError();
                                break;
                            default:
                                initFallbackVideo();
                                break;
                        }
                    }
                });
            } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                // For Safari
                video.src = 'https://bitdash-a.akamaihd.net/s/content/media/video/hls/bbb/bbb_1080p_hls.m3u8';
                video.addEventListener('loadedmetadata', () => {
                    video.play().catch(e => console.log('Auto-play prevented:', e));
                });
            } else {
                initFallbackVideo();
            }
        }

        function initFallbackVideo() {
            const video = document.getElementById('heroVideo');
            video.src = 'https://assets.codepen.io/4924623/education-hero-2.mp4';
            video.load();
            video.play().catch(e => console.log('Auto-play prevented:', e));
        }

        // Initialize all animations and interactions
        function initAnimations() {
            // Initialize GSAP with ScrollTrigger
            gsap.registerPlugin(ScrollTrigger);

            // Initialize HLS video
            initHLSVideo();

            // Header scroll effect
            const header = document.getElementById('header');
            let lastScroll = 0;
            
            window.addEventListener('scroll', () => {
                const currentScroll = window.pageYOffset;
                
                // Header effect
                if (currentScroll > 50) {
                    header.classList.add('scrolled');
                    
                    if (currentScroll > lastScroll && currentScroll > 200) {
                        gsap.to(header, { y: -100, duration: 0.3 });
                    } else {
                        gsap.to(header, { y: 0, duration: 0.3 });
                    }
                } else {
                    header.classList.remove('scrolled');
                    gsap.to(header, { y: 0, duration: 0.3 });
                }
                
                lastScroll = currentScroll;
                
                // Scroll progress bar
                const progress = (currentScroll / (document.body.scrollHeight - window.innerHeight)) * 100;
                document.getElementById('scrollProgress').style.width = `${progress}%`;
                
                // Update active nav link
                updateActiveNavLink();
            });

            // Tab system
            const tabBtns = document.querySelectorAll('.tab-btn');
            const tabContents = document.querySelectorAll('.tab-content');
            
            tabBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const tabId = btn.getAttribute('data-tab');
                    
                    // Update active button
                    tabBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    
                    // Update active content
                    tabContents.forEach(content => {
                        content.classList.remove('active');
                        if (content.id === tabId) {
                            content.classList.add('active');
                            gsap.fromTo(content,
                                { opacity: 0, y: 20 },
                                { opacity: 1, y: 0, duration: 0.5 }
                            );
                        }
                    });
                });
            });

            // Course card hover effects
            const courseCards = document.querySelectorAll('.course-card');
            courseCards.forEach(card => {
                card.addEventListener('mouseenter', () => {
                    gsap.to(card, {
                        y: -20,
                        rotationY: 5,
                        duration: 0.5,
                        ease: 'power2.out'
                    });
                    
                    const image = card.querySelector('.course-image');
                    gsap.to(image, {
                        scale: 1.1,
                        duration: 0.8,
                        ease: 'power2.out'
                    });
                });
                
                card.addEventListener('mouseleave', () => {
                    gsap.to(card, {
                        y: 0,
                        rotationY: 0,
                        duration: 0.5,
                        ease: 'power2.out'
                    });
                    
                    const image = card.querySelector('.course-image');
                    gsap.to(image, {
                        scale: 1,
                        duration: 0.8,
                        ease: 'power2.out'
                    });
                });
            });

            // Feature card animations
            const featureCards = document.querySelectorAll('.feature-card');
            featureCards.forEach(card => {
                gsap.fromTo(card,
                    {
                        opacity: 0,
                        y: 50,
                        scale: 0.9
                    },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.8,
                        ease: 'back.out(1.2)',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse'
                        }
                    }
                );
            });

            // Vision & Mission cards animation
            const vmCards = document.querySelectorAll('.vm-card');
            vmCards.forEach((card, i) => {
                gsap.fromTo(card,
                    {
                        opacity: 0,
                        y: 50,
                        scale: 0.95
                    },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.8,
                        delay: i * 0.2,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse'
                        }
                    }
                );
            });

            // Bento cards animation
            const bentoCards = document.querySelectorAll('.bento-card');
            bentoCards.forEach((card, i) => {
                gsap.fromTo(card,
                    {
                        opacity: 0,
                        y: 30,
                        scale: 0.98
                    },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.6,
                        delay: i * 0.1,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 90%',
                            toggleActions: 'play none none reverse'
                        }
                    }
                );
            });

            // Parallax effect for video
            gsap.to('.hero-video', {
                y: '20%',
                scale: 1.1,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.hero',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                }
            });

            // Floating elements animation
            const floatingElements = document.querySelectorAll('.floating-element');
            floatingElements.forEach((el, i) => {
                gsap.to(el, {
                    y: 'random(-40, 40)',
                    x: 'random(-30, 30)',
                    rotation: 'random(-20, 20)',
                    duration: 'random(4, 8)',
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut',
                    delay: i * 0.5
                });
            });

            // Button hover effects
            const buttons = document.querySelectorAll('.btn');
            buttons.forEach(btn => {
                btn.addEventListener('mouseenter', () => {
                    gsap.to(btn, {
                        scale: 1.05,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                });
                
                btn.addEventListener('mouseleave', () => {
                    gsap.to(btn, {
                        scale: 1,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                });
            });
        }

        // Update active navigation link
        function updateActiveNavLink() {
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('.nav-link');
            
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (scrollY >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        }

        // Mobile menu toggle
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navLinks = document.getElementById('navLinks');
        
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            if (navLinks.classList.contains('active')) {
                gsap.to(navLinks, {
                    x: 0,
                    duration: 0.5,
                    ease: 'power3.out'
                });
                document.body.style.overflow = 'hidden';
            } else {
                gsap.to(navLinks, {
                    x: 300,
                    duration: 0.5,
                    ease: 'power3.in'
                });
                document.body.style.overflow = '';
            }
        });

        // Close mobile menu on link click
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Smooth scrolling with offset
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const offset = 100;
                    const targetPosition = targetElement.offsetTop - offset;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Lazy loading images
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        const src = img.getAttribute('data-src');
                        
                        if (src) {
                            img.src = src;
                            img.removeAttribute('data-src');
                            
                            img.onload = () => {
                                gsap.fromTo(img,
                                    { opacity: 0, scale: 1.2 },
                                    { opacity: 1, scale: 1, duration: 1, ease: 'power2.out' }
                                );
                            };
                        }
                        
                        imageObserver.unobserve(img);
                    }
                });
            }, {
                rootMargin: '100px 0px',
                threshold: 0.1
            });
            
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }

        // Initialize everything when DOM is ready
        document.addEventListener('DOMContentLoaded', () => {
            // Start loading animation immediately
            const loadingScreen = document.getElementById('loadingScreen');
            gsap.set(loadingScreen, { opacity: 1 });
            
            // Initialize animations after slight delay to ensure DOM is ready
            setTimeout(() => {
                if (document.readyState === 'complete') {
                    // Page is already loaded
                    window.dispatchEvent(new Event('load'));
                }
            }, 100);
        });

        // Performance monitoring
        window.addEventListener('load', () => {
            const perfEntries = performance.getEntriesByType('navigation');
            if (perfEntries.length > 0) {
                const navTiming = perfEntries[0];
                const loadTime = navTiming.loadEventEnd - navTiming.loadEventStart;
                console.log(`Page loaded in ${loadTime}ms`);
                
                if (loadTime > 3000) {
                    console.log('Performance tip: Consider optimizing images and reducing animation complexity');
                }
            }
        });
    </script>