
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('navLinks');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

      
        window.addEventListener('scroll', () => {
            const header = document.getElementById('header');
            if (window.scrollY > 100) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
        });

      
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
                
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });

        
        const filterButtons = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');

        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                
                filterButtons.forEach(b => b.classList.remove('active'));
                
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        item.style.animation = 'fadeIn 0.5s ease forwards';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });

        
        const lightbox = document.getElementById('lightbox');
        const lightboxTitle = document.getElementById('lightboxTitle');
        const lightboxDescription = document.getElementById('lightboxDescription');
        const lightboxClose = document.getElementById('lightboxClose');
        const lightboxPrev = document.getElementById('lightboxPrev');
        const lightboxNext = document.getElementById('lightboxNext');

        let currentItemIndex = 0;
        const portfolioData = [
            {
                title: "E-Commerce Platform",
                description: "A comprehensive e-commerce solution built with React and Node.js, featuring advanced search, payment integration, and inventory management. The platform serves over 10,000 users and processes hundreds of transactions daily."
            },
            {
                title: "Healthcare Mobile App",
                description: "Cross-platform mobile application developed using React Native for healthcare management. Features include appointment scheduling, medical records, telemedicine integration, and real-time health monitoring."
            },
            {
                title: "AI Chatbot Solution",
                description: "Intelligent chatbot powered by natural language processing and machine learning algorithms. Capable of handling customer inquiries, processing orders, and providing 24/7 support with 95% accuracy."
            },
            {
                title: "Cloud Migration Project",
                description: "Complete enterprise cloud migration from on-premises infrastructure to AWS. Resulted in 40% cost reduction, improved scalability, and enhanced security with zero downtime migration strategy."
            },
            {
                title: "Corporate Website",
                description: "Modern, responsive corporate website built with advanced CMS capabilities. Features include multi-language support, SEO optimization, and analytics integration for improved digital presence."
            },
            {
                title: "Finance Tracking App",
                description: "Personal finance management application with advanced analytics, budget tracking, and investment insights. Uses AI to provide personalized financial advice and spending recommendations."
            }
        ];

        portfolioItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                currentItemIndex = index;
                showLightbox();
            });
        });

        function showLightbox() {
            const data = portfolioData[currentItemIndex];
            lightboxTitle.textContent = data.title;
            lightboxDescription.textContent = data.description;
            lightbox.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }

        lightboxClose.addEventListener('click', closeLightbox);

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        lightboxPrev.addEventListener('click', () => {
            currentItemIndex = (currentItemIndex - 1 + portfolioData.length) % portfolioData.length;
            showLightbox();
        });

        lightboxNext.addEventListener('click', () => {
            currentItemIndex = (currentItemIndex + 1) % portfolioData.length;
            showLightbox();
        });

        
        document.addEventListener('keydown', (e) => {
            if (lightbox.style.display === 'flex') {
                switch(e.key) {
                    case 'Escape':
                        closeLightbox();
                        break;
                    case 'ArrowLeft':
                        lightboxPrev.click();
                        break;
                    case 'ArrowRight':
                        lightboxNext.click();
                        break;
                }
            }
        });

    
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                }
            });
        }, observerOptions);

        
        document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
            el.style.animationPlayState = 'paused';
            observer.observe(el);
        });

        
        portfolioItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
            item.classList.add('fade-in');
        });

        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            if (hero) {
                hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });

        
        const heroTitle = document.querySelector('.hero h1');
        const titleText = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeTimer = setInterval(() => {
            if (i < titleText.length) {
                heroTitle.textContent += titleText.charAt(i);
                i++;
            } else {
                clearInterval(typeTimer);
            }
        }, 100);
