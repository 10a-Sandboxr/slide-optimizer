document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger
            const bars = navToggle.querySelectorAll('.bar');
            bars.forEach((bar, index) => {
                if (navMenu.classList.contains('active')) {
                    if (index === 0) bar.style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                    if (index === 1) bar.style.opacity = '0';
                    if (index === 2) bar.style.transform = 'rotate(45deg) translate(-5px, -6px)';
                } else {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                }
            });
        });
    }

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            const bars = navToggle.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            });
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(26, 54, 93, 0.98)';
        } else {
            navbar.style.background = 'rgba(26, 54, 93, 0.95)';
        }
    });

    // Optimize button functionality
    const optimizeBtn = document.getElementById('optimizeBtn');
    if (optimizeBtn) {
        optimizeBtn.addEventListener('click', function() {
            showOptimizationDemo();
        });
    }

    // Learn more button
    const learnMoreBtn = document.getElementById('learnMoreBtn');
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', function() {
            document.querySelector('#features').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }

    // Template preview buttons
    const templateBtns = document.querySelectorAll('.template-card .btn');
    templateBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const templateCard = this.closest('.template-card');
            const templateName = templateCard.querySelector('h3').textContent;
            showTemplatePreview(templateName);
        });
    });

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleContactFormSubmission(this);
        });
    }

    // Optimization Demo Function
    function showOptimizationDemo() {
        // Create modal overlay
        const modal = document.createElement('div');
        modal.className = 'optimization-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3><i class="fas fa-shield-alt"></i> AI-Powered Optimization Demo</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="demo-step active" data-step="1">
                        <h4>Step 1: Secure Content Analysis</h4>
                        <p>Analyzing presentation content with character-by-character verification...</p>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: 0%"></div>
                        </div>
                        <div class="security-indicators">
                            <span class="indicator active"><i class="fas fa-lock"></i> Encryption Active</span>
                            <span class="indicator active"><i class="fas fa-eye-slash"></i> Zero-Knowledge Processing</span>
                            <span class="indicator active"><i class="fas fa-shield-check"></i> Threat Detection</span>
                        </div>
                    </div>
                    
                    <div class="demo-step" data-step="2">
                        <h4>Step 2: Context Classification</h4>
                        <p>AI algorithms identifying cybersecurity domain and content type...</p>
                        <div class="classification-results">
                            <div class="classification-item">
                                <span class="domain">Network Security</span>
                                <span class="confidence">95% confidence</span>
                            </div>
                            <div class="classification-item">
                                <span class="domain">Incident Response</span>
                                <span class="confidence">87% confidence</span>
                            </div>
                            <div class="classification-item">
                                <span class="domain">Compliance Framework</span>
                                <span class="confidence">73% confidence</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="demo-step" data-step="3">
                        <h4>Step 3: Template Optimization</h4>
                        <p>Matching optimal templates from secure cybersecurity library...</p>
                        <div class="template-recommendations">
                            <div class="recommendation">
                                <div class="template-thumb">
                                    <i class="fas fa-network-wired"></i>
                                </div>
                                <div class="template-info">
                                    <h5>Enterprise Network Security</h5>
                                    <p>Optimized for technical briefings</p>
                                    <span class="match-score">98% match</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" id="prevStep">Previous</button>
                    <button class="btn btn-primary" id="nextStep">Next Step</button>
                    <button class="btn btn-primary" id="completeDemo" style="display: none;">Complete Demo</button>
                </div>
            </div>
        `;

        // Add modal styles
        const modalStyles = `
            <style>
                .optimization-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.8);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 10000;
                    backdrop-filter: blur(5px);
                }
                
                .modal-content {
                    background: white;
                    border-radius: 15px;
                    max-width: 600px;
                    width: 90%;
                    max-height: 80vh;
                    overflow-y: auto;
                    animation: modalSlideIn 0.3s ease;
                }
                
                @keyframes modalSlideIn {
                    from { transform: translateY(-50px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                
                .modal-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 25px 30px;
                    border-bottom: 1px solid #e2e8f0;
                    background: linear-gradient(135deg, #1a365d, #2d5a87);
                    color: white;
                    border-radius: 15px 15px 0 0;
                }
                
                .modal-header h3 {
                    margin: 0;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                
                .modal-close {
                    background: none;
                    border: none;
                    color: white;
                    font-size: 24px;
                    cursor: pointer;
                    padding: 5px;
                    border-radius: 50%;
                    transition: background 0.3s ease;
                }
                
                .modal-close:hover {
                    background: rgba(255, 255, 255, 0.2);
                }
                
                .modal-body {
                    padding: 30px;
                    min-height: 300px;
                }
                
                .demo-step {
                    display: none;
                }
                
                .demo-step.active {
                    display: block;
                    animation: stepFadeIn 0.5s ease;
                }
                
                @keyframes stepFadeIn {
                    from { opacity: 0; transform: translateX(20px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                
                .demo-step h4 {
                    color: #1a365d;
                    margin-bottom: 15px;
                    font-size: 1.3rem;
                }
                
                .progress-bar {
                    width: 100%;
                    height: 8px;
                    background: #e2e8f0;
                    border-radius: 4px;
                    margin: 20px 0;
                    overflow: hidden;
                }
                
                .progress-fill {
                    height: 100%;
                    background: linear-gradient(90deg, #00d4ff, #00b8e6);
                    border-radius: 4px;
                    transition: width 2s ease;
                }
                
                .security-indicators {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    margin-top: 20px;
                }
                
                .indicator {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 10px;
                    background: #f7fafc;
                    border-radius: 8px;
                    opacity: 0.5;
                    transition: all 0.5s ease;
                }
                
                .indicator.active {
                    opacity: 1;
                    background: #e6fffa;
                    border-left: 4px solid #38a169;
                }
                
                .indicator i {
                    color: #38a169;
                }
                
                .classification-results {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                    margin-top: 20px;
                }
                
                .classification-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 15px;
                    background: #f7fafc;
                    border-radius: 8px;
                    border-left: 4px solid #00d4ff;
                }
                
                .domain {
                    font-weight: 600;
                    color: #1a365d;
                }
                
                .confidence {
                    color: #38a169;
                    font-weight: 500;
                }
                
                .template-recommendations {
                    margin-top: 20px;
                }
                
                .recommendation {
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    padding: 20px;
                    background: #f7fafc;
                    border-radius: 10px;
                    border: 2px solid #00d4ff;
                }
                
                .template-thumb {
                    width: 60px;
                    height: 60px;
                    background: linear-gradient(135deg, #1a365d, #2d5a87);
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-size: 1.5rem;
                }
                
                .template-info h5 {
                    margin: 0 0 5px 0;
                    color: #1a365d;
                }
                
                .template-info p {
                    margin: 0 0 10px 0;
                    color: #4a5568;
                }
                
                .match-score {
                    background: #38a169;
                    color: white;
                    padding: 4px 12px;
                    border-radius: 20px;
                    font-size: 0.9rem;
                    font-weight: 600;
                }
                
                .modal-footer {
                    padding: 20px 30px;
                    border-top: 1px solid #e2e8f0;
                    display: flex;
                    justify-content: space-between;
                    gap: 15px;
                }
            </style>
        `;

        document.head.insertAdjacentHTML('beforeend', modalStyles);
        document.body.appendChild(modal);

        // Modal functionality
        let currentStep = 1;
        const totalSteps = 3;

        const nextBtn = modal.querySelector('#nextStep');
        const prevBtn = modal.querySelector('#prevStep');
        const completeBtn = modal.querySelector('#completeDemo');
        const closeBtn = modal.querySelector('.modal-close');

        function updateStep() {
            modal.querySelectorAll('.demo-step').forEach((step, index) => {
                step.classList.toggle('active', index + 1 === currentStep);
            });

            prevBtn.style.display = currentStep === 1 ? 'none' : 'inline-block';
            nextBtn.style.display = currentStep === totalSteps ? 'none' : 'inline-block';
            completeBtn.style.display = currentStep === totalSteps ? 'inline-block' : 'none';

            // Animate progress bar on first step
            if (currentStep === 1) {
                setTimeout(() => {
                    const progressFill = modal.querySelector('.progress-fill');
                    if (progressFill) {
                        progressFill.style.width = '100%';
                    }
                }, 500);
            }
        }

        nextBtn.addEventListener('click', () => {
            if (currentStep < totalSteps) {
                currentStep++;
                updateStep();
            }
        });

        prevBtn.addEventListener('click', () => {
            if (currentStep > 1) {
                currentStep--;
                updateStep();
            }
        });

        function closeModal() {
            modal.remove();
        }

        closeBtn.addEventListener('click', closeModal);
        completeBtn.addEventListener('click', closeModal);

        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        updateStep();
    }

    // Template Preview Function
    function showTemplatePreview(templateName) {
        alert(`Template Preview: ${templateName}\n\nThis would show a detailed preview of the ${templateName} template with cybersecurity-focused layouts and security compliance features.`);
    }

    // Contact Form Handler
    function handleContactFormSubmission(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Simulate form submission
        setTimeout(() => {
            alert('Thank you for your interest in CyberSlide Pro! Our security team will contact you within 24 hours to discuss your cybersecurity presentation optimization needs.');
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe feature cards and other elements
    document.querySelectorAll('.feature-card, .template-card, .doc-section').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Security badge animation
    const securityBadge = document.querySelector('.security-badge');
    if (securityBadge) {
        setInterval(() => {
            securityBadge.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.5)';
            setTimeout(() => {
                securityBadge.style.boxShadow = 'none';
            }, 1000);
        }, 3000);
    }
});