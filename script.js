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
            document.querySelector('#optimizer').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }

    // File upload functionality
    const uploadArea = document.getElementById('uploadArea');
    const uploadBtn = document.getElementById('uploadBtn');
    const fileInput = document.getElementById('fileInput');
    const analysisResults = document.getElementById('analysisResults');

    if (uploadBtn && fileInput) {
        uploadBtn.addEventListener('click', () => fileInput.click());
        
        fileInput.addEventListener('change', function(e) {
            if (e.target.files.length > 0) {
                handleFileUpload(e.target.files[0]);
            }
        });
    }

    if (uploadArea) {
        // Drag and drop functionality
        uploadArea.addEventListener('dragover', function(e) {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        });

        uploadArea.addEventListener('dragleave', function(e) {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
        });

        uploadArea.addEventListener('drop', function(e) {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                handleFileUpload(files[0]);
            }
        });

        uploadArea.addEventListener('click', () => fileInput.click());
    }

    // Optimization action buttons
    const applyBtn = document.getElementById('applyOptimizations');
    const downloadBtn = document.getElementById('downloadReport');
    const viewChangesBtn = document.getElementById('viewChanges');

    if (applyBtn) {
        applyBtn.addEventListener('click', function() {
            showOptimizationProgress();
        });
    }

    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            downloadAnalysisReport();
        });
    }

    if (viewChangesBtn) {
        viewChangesBtn.addEventListener('click', function() {
            showBeforeAfterComparison();
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

    // Slideshow functionality
    initializeSlideshows();

    // Initialize Slideshow Navigation
    function initializeSlideshows() {
        const slideshows = document.querySelectorAll('.demo-slideshow');
        
        slideshows.forEach(slideshow => {
            const slides = slideshow.querySelectorAll('.slide');
            const indicators = slideshow.querySelectorAll('.indicator');
            const prevBtn = slideshow.querySelector('.slide-btn.prev');
            const nextBtn = slideshow.querySelector('.slide-btn.next');
            let currentSlide = 0;

            function showSlide(index) {
                // Hide all slides
                slides.forEach(slide => slide.classList.remove('active'));
                indicators.forEach(indicator => indicator.classList.remove('active'));
                
                // Show selected slide
                slides[index].classList.add('active');
                indicators[index].classList.add('active');
                currentSlide = index;
            }

            function nextSlide() {
                const next = (currentSlide + 1) % slides.length;
                showSlide(next);
            }

            function prevSlide() {
                const prev = (currentSlide - 1 + slides.length) % slides.length;
                showSlide(prev);
            }

            // Event listeners
            if (prevBtn) prevBtn.addEventListener('click', prevSlide);
            if (nextBtn) nextBtn.addEventListener('click', nextSlide);

            indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', () => showSlide(index));
            });

            // Auto-advance slides every 5 seconds
            setInterval(nextSlide, 5000);
        });
    }

    // File Upload Handler
    function handleFileUpload(file) {
        if (!file) return;
        
        // Validate file type
        const validTypes = ['application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'application/pdf'];
        if (!validTypes.includes(file.type) && !file.name.match(/\.(ppt|pptx|pdf)$/i)) {
            alert('Please upload a valid PowerPoint (.ppt, .pptx) or PDF file.');
            return;
        }

        // Validate file size (50MB)
        if (file.size > 50 * 1024 * 1024) {
            alert('File size must be less than 50MB.');
            return;
        }

        // Show loading state
        uploadArea.innerHTML = `
            <div class="upload-content">
                <i class="fas fa-spinner fa-spin"></i>
                <h3>Analyzing your presentation...</h3>
                <p>Performing secure character-by-character verification</p>
                <div class="analysis-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: 0%"></div>
                    </div>
                    <div class="security-status">
                        <span class="status-item"><i class="fas fa-lock"></i> Encryption: Active</span>
                        <span class="status-item"><i class="fas fa-shield-check"></i> Threat Scan: In Progress</span>
                        <span class="status-item"><i class="fas fa-eye-slash"></i> Zero-Knowledge: Enabled</span>
                    </div>
                </div>
            </div>
        `;

        // Simulate analysis progress
        let progress = 0;
        const progressBar = document.querySelector('.progress-fill');
        const statusItems = document.querySelectorAll('.status-item');
        
        const progressInterval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress > 100) progress = 100;
            
            progressBar.style.width = progress + '%';
            
            // Activate status items progressively
            if (progress > 30) statusItems[1].style.color = '#38a169';
            if (progress > 60) statusItems[2].style.color = '#38a169';
            
            if (progress >= 100) {
                clearInterval(progressInterval);
                setTimeout(() => {
                    showAnalysisResults(file.name);
                }, 1000);
            }
        }, 200);
    }

    function showAnalysisResults(fileName) {
        // Hide upload area and show results
        uploadArea.style.display = 'none';
        analysisResults.style.display = 'block';
        
        // Update results with specific file info
        const fileNameDisplay = document.createElement('p');
        fileNameDisplay.textContent = `Analysis complete for: ${fileName}`;
        fileNameDisplay.style.textAlign = 'center';
        fileNameDisplay.style.color = 'var(--text-secondary)';
        fileNameDisplay.style.marginBottom = '30px';
        
        const resultsTitle = analysisResults.querySelector('h3');
        resultsTitle.insertAdjacentElement('afterend', fileNameDisplay);
    }

    function showOptimizationProgress() {
        const modal = document.createElement('div');
        modal.className = 'optimization-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3><i class="fas fa-cogs"></i> Applying Optimizations</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="optimization-progress">
                        <div class="optimization-step">
                            <div class="step-header">
                                <i class="fas fa-text-height"></i>
                                <span>Adjusting font sizes and readability</span>
                                <span class="step-status completed">✓</span>
                            </div>
                        </div>
                        <div class="optimization-step">
                            <div class="step-header">
                                <i class="fas fa-palette"></i>
                                <span>Improving color contrast ratios</span>
                                <span class="step-status completed">✓</span>
                            </div>
                        </div>
                        <div class="optimization-step">
                            <div class="step-header">
                                <i class="fas fa-layer-group"></i>
                                <span>Optimizing slide layouts</span>
                                <span class="step-status active">⟳</span>
                            </div>
                        </div>
                        <div class="optimization-step">
                            <div class="step-header">
                                <i class="fas fa-shield-alt"></i>
                                <span>Adding security content enhancements</span>
                                <span class="step-status pending">⏳</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary" id="downloadOptimized" disabled>Download Optimized Presentation</button>
                </div>
            </div>
        `;

        // Add modal styles for optimization progress
        const modalStyles = `
            <style>
                .optimization-progress {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }
                
                .optimization-step {
                    padding: 20px;
                    background: var(--bg-secondary);
                    border-radius: 10px;
                    border-left: 4px solid var(--border-color);
                }
                
                .optimization-step.active {
                    border-left-color: var(--accent-color);
                    background: rgba(0, 212, 255, 0.05);
                }
                
                .optimization-step.completed {
                    border-left-color: var(--success-color);
                    background: rgba(56, 161, 105, 0.05);
                }
                
                .step-header {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                }
                
                .step-header i {
                    width: 30px;
                    text-align: center;
                    color: var(--accent-color);
                }
                
                .step-header span:nth-child(2) {
                    flex: 1;
                    font-weight: 500;
                }
                
                .step-status {
                    font-weight: bold;
                    padding: 5px 10px;
                    border-radius: 15px;
                    font-size: 0.9rem;
                }
                
                .step-status.completed {
                    background: var(--success-color);
                    color: white;
                }
                
                .step-status.active {
                    background: var(--accent-color);
                    color: white;
                    animation: pulse 1s infinite;
                }
                
                .step-status.pending {
                    background: var(--warning-color);
                    color: white;
                }
                
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.6; }
                }
            </style>
        `;

        document.head.insertAdjacentHTML('beforeend', modalStyles);
        document.body.appendChild(modal);

        // Simulate optimization steps
        const steps = modal.querySelectorAll('.optimization-step');
        const downloadBtn = modal.querySelector('#downloadOptimized');
        let currentStep = 2; // Start from step 3 (0-indexed)

        const stepInterval = setInterval(() => {
            if (currentStep < steps.length) {
                // Complete current step
                steps[currentStep].classList.remove('active');
                steps[currentStep].classList.add('completed');
                steps[currentStep].querySelector('.step-status').textContent = '✓';
                steps[currentStep].querySelector('.step-status').className = 'step-status completed';

                currentStep++;
                
                // Start next step if available
                if (currentStep < steps.length) {
                    steps[currentStep].classList.add('active');
                    steps[currentStep].querySelector('.step-status').textContent = '⟳';
                    steps[currentStep].querySelector('.step-status').className = 'step-status active';
                } else {
                    // All steps completed
                    downloadBtn.disabled = false;
                    downloadBtn.textContent = 'Download Optimized Presentation';
                }
            } else {
                clearInterval(stepInterval);
            }
        }, 2000);

        // Modal close functionality
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => modal.remove());
        
        downloadBtn.addEventListener('click', function() {
            if (!this.disabled) {
                // Simulate file download
                const link = document.createElement('a');
                link.href = '#';
                link.download = 'optimized_presentation.pptx';
                link.click();
                
                modal.remove();
                alert('Your optimized presentation has been downloaded with enhanced cybersecurity formatting and improved readability!');
            }
        });
    }

    function downloadAnalysisReport() {
        // Simulate report download
        const reportData = `
CYBERSECURITY PRESENTATION ANALYSIS REPORT
==========================================

File Analysis Summary:
- Total Slides: 15
- Security Content: Network Security Focus
- Overall Score: 78/100

Optimization Recommendations:
1. Visual Design (8 issues found)
   - Font size adjustments needed on slides 3, 7, 12
   - Color contrast improvements required
   
2. Security Content (3 enhancements)
   - Add threat model diagrams
   - Include compliance framework mapping
   
3. Engagement (5 improvements)
   - Add interactive elements
   - Replace text-heavy slides with infographics

Generated by CyberSlide Pro AI Engine
Character-by-character verification completed
        `;
        
        const blob = new Blob([reportData], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'slideshow_analysis_report.txt';
        link.click();
        URL.revokeObjectURL(url);
    }

    function showBeforeAfterComparison() {
        showSlideComparison();
    }

    function showSlideComparison() {
        const modal = document.createElement('div');
        modal.className = 'optimization-modal';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 1000px;">
                <div class="modal-header">
                    <h3><i class="fas fa-balance-scale"></i> Before vs After Comparison</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="slide-comparison">
                        <div class="comparison-section">
                            <h4>Before Optimization</h4>
                            <div class="slide-mockup before">
                                <div class="slide-content">
                                    <div class="slide-title small-text">Network Security Overview</div>
                                    <div class="slide-bullets">
                                        <div class="bullet-point small-text">• Firewall configurations and rules management</div>
                                        <div class="bullet-point small-text">• Intrusion detection and prevention systems</div>
                                        <div class="bullet-point small-text">• Network segmentation strategies</div>
                                        <div class="bullet-point small-text">• VPN implementation and monitoring</div>
                                        <div class="bullet-point small-text">• Access control policies</div>
                                        <div class="bullet-point small-text">• Threat intelligence integration</div>
                                        <div class="bullet-point small-text">• Incident response procedures</div>
                                        <div class="bullet-point small-text">• Compliance requirements</div>
                                    </div>
                                </div>
                            </div>
                            <div class="issues-list">
                                <h5>Issues Identified:</h5>
                                <ul>
                                    <li>Text too small (12pt)</li>
                                    <li>Too many bullet points (8)</li>
                                    <li>Poor contrast ratio</li>
                                    <li>Cluttered layout</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div class="comparison-section">
                            <h4>After Optimization</h4>
                            <div class="slide-mockup after">
                                <div class="slide-content">
                                    <div class="slide-title large-text">Network Security Overview</div>
                                    <div class="slide-bullets">
                                        <div class="bullet-point large-text">🔥 Firewall & Access Control</div>
                                        <div class="bullet-point large-text">🛡️ Intrusion Detection Systems</div>
                                        <div class="bullet-point large-text">🔗 Network Segmentation</div>
                                        <div class="bullet-point large-text">⚡ Threat Response & Compliance</div>
                                    </div>
                                    <div class="slide-footer">
                                        <div class="security-badge-small">🔒 Enterprise Security</div>
                                    </div>
                                </div>
                            </div>
                            <div class="improvements-list">
                                <h5>Improvements Applied:</h5>
                                <ul>
                                    <li>Increased font size to 18pt+</li>
                                    <li>Reduced to 4 key points</li>
                                    <li>Enhanced color contrast</li>
                                    <li>Added visual icons</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary" id="applyThisSlide">Apply to All Similar Slides</button>
                    <button class="btn btn-secondary" id="nextComparison">View Next Slide</button>
                </div>
            </div>
        `;

        // Add comparison styles
        const comparisonStyles = `
            <style>
                .slide-comparison {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 30px;
                    margin-bottom: 20px;
                }
                
                .comparison-section h4 {
                    text-align: center;
                    margin-bottom: 20px;
                    color: var(--primary-color);
                }
                
                .slide-mockup {
                    width: 100%;
                    height: 300px;
                    border-radius: 10px;
                    padding: 20px;
                    margin-bottom: 15px;
                    position: relative;
                    overflow: hidden;
                }
                
                .slide-mockup.before {
                    background: linear-gradient(135deg, #f0f0f0, #e0e0e0);
                    border: 2px solid #ccc;
                }
                
                .slide-mockup.after {
                    background: linear-gradient(135deg, #1a365d, #2d5a87);
                    border: 2px solid var(--accent-color);
                    color: white;
                }
                
                .slide-content {
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                }
                
                .slide-title {
                    font-weight: bold;
                    margin-bottom: 20px;
                    border-bottom: 2px solid;
                    padding-bottom: 10px;
                }
                
                .slide-title.small-text {
                    font-size: 14px;
                    color: #333;
                    border-color: #ccc;
                }
                
                .slide-title.large-text {
                    font-size: 22px;
                    color: var(--accent-color);
                    border-color: var(--accent-color);
                }
                
                .slide-bullets {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }
                
                .bullet-point.small-text {
                    font-size: 11px;
                    color: #555;
                    line-height: 1.2;
                }
                
                .bullet-point.large-text {
                    font-size: 16px;
                    color: white;
                    line-height: 1.5;
                    padding: 8px 0;
                }
                
                .slide-footer {
                    margin-top: auto;
                    text-align: right;
                }
                
                .security-badge-small {
                    background: var(--accent-color);
                    color: var(--primary-color);
                    padding: 5px 15px;
                    border-radius: 15px;
                    font-size: 12px;
                    font-weight: bold;
                    display: inline-block;
                }
                
                .issues-list, .improvements-list {
                    background: var(--bg-secondary);
                    padding: 15px;
                    border-radius: 8px;
                }
                
                .issues-list h5 {
                    color: var(--danger-color);
                    margin-bottom: 10px;
                }
                
                .improvements-list h5 {
                    color: var(--success-color);
                    margin-bottom: 10px;
                }
                
                .issues-list ul, .improvements-list ul {
                    margin: 0;
                    padding-left: 20px;
                }
                
                .issues-list li {
                    color: var(--danger-color);
                    margin-bottom: 5px;
                }
                
                .improvements-list li {
                    color: var(--success-color);
                    margin-bottom: 5px;
                }
            </style>
        `;

        document.head.insertAdjacentHTML('beforeend', comparisonStyles);
        document.body.appendChild(modal);

        // Modal functionality
        const closeBtn = modal.querySelector('.modal-close');
        const applyBtn = modal.querySelector('#applyThisSlide');
        const nextBtn = modal.querySelector('#nextComparison');

        closeBtn.addEventListener('click', () => modal.remove());
        
        applyBtn.addEventListener('click', function() {
            alert('Optimization pattern applied to 3 similar slides with layout improvements!');
            modal.remove();
        });
        
        nextBtn.addEventListener('click', function() {
            alert('This would show the next slide comparison. Demo shows slide 1 of 5 comparisons.');
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
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