// --- Cyber Sentinel Script --- //

document.addEventListener('DOMContentLoaded', () => {
    // 1. Matrix Background Effect
    initMatrixRain();

    // 2. HUD Section Navigation (SPA Toggles)
    initNavigation();

    // 4. Operations Tab Switching
    initOperationsTabs();

    // 4.5. Technical Arsenal Interactive Filters
    initArsenalFilter();

    // 5. Certification Database Filters
    initCertFilters();

    // 6. Clock and IP Initialization
    initHudData();

    // 7. Contact Packet Transmission
    initContactForm();

    // 8. Theme Toggle Switcher
    initThemeToggle();

    // 9. Tactical Control Panel Tabs
    initTacticalTabs();

    // 11. Contact Message Live Encryption preview
    initPayloadEncryption();

    // 12. Copy Toast Notification System
    initCopyToast();

    // 13. Interactive Project Modal Engine
    initProjectModal();

    // 14. Tactical Audio Synth SFX Engine
    initAudioSynth();

    // 15. Dynamic Stat Count-Up Engine
    initStatCounters();

    // 16. Background Wallpaper Switcher
    initBackgroundRotation();

    // 18. Operations Search & Category Filter Engine
    initOpsFilter();

    // 19. Certificate & Visual Feed Lightbox Engine
    initCertificateLightbox();

    // 20. Direct Certificate PDF Link Handler
    initPdfViewerModal();

    // 22. Top Neon Scroll Progress Bar Engine
    initScrollProgressBar();

    // 25. macOS Fluid Magnetic Dock Proximity Magnification
    initFluidDockMagnification();

    // 27. Konami Code Secret Red Team Override
    initKonamiCode();

    // 26. 120Hz Liquid-LERP Custom Cyber Cursor Engine
    initCustomCursor();

    // 28. Unified 60fps Bidirectional Card Reveal & Spotlight Engine
    initCardSmoothAnimations();

    // 25. Hero CV Download Toast & Chime Handler
    const heroCvBtn = document.getElementById('hero-cv-btn');
    if (heroCvBtn) {
        heroCvBtn.addEventListener('click', () => {
            if (typeof window.playAudioSuccess === 'function') window.playAudioSuccess();
            if (typeof window.showToast === 'function') window.showToast('[RESUME] Downloading Giridharan K verified CV (PDF)...');
        });
    }
});

// --- Performance Utilities --- //
function debounce(func, delay = 100) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(this, args), delay);
    };
}

// --- Matrix Code Rain Effect (Optimized requestAnimationFrame Loop) --- //
function initMatrixRain() {
    window.accelerateMatrixRain = function(durationMs = 5000) {
        window._matrixSpeedBoost = true;
        setTimeout(() => { window._matrixSpeedBoost = false; }, durationMs);
    };
    const canvas = document.getElementById('cyberCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const fontSize = 14;
    let columns = 0;
    let drops = [];

    // Resize & layout initialization
    function setupCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        columns = Math.floor(canvas.width / fontSize);
        drops = [];
        for (let x = 0; x < columns; x++) {
            drops[x] = Math.floor(Math.random() * -15);
        }
    }

    setupCanvas();
    window.addEventListener('resize', debounce(setupCanvas, 150));

    const chars = '0123456789ABCDEF<>[]{}$%@#&*_+-=';
    const charArr = chars.split('');
    
    let lastFrameTime = 0;
    const targetFps = 30;
    const frameInterval = 1000 / targetFps;

    // High performance draw cycle
    function draw() {
        const isDarkMode = document.body.classList.contains('dark-mode');
        
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = 'source-over';

        ctx.font = fontSize + 'px "Fira Code", monospace';

        for (let i = 0; i < drops.length; i++) {
            if (drops[i] < 0) {
                drops[i]++;
                continue;
            }

            const text = charArr[Math.floor(Math.random() * charArr.length)];
            
            if (document.body.classList.contains('redteam-override')) {
                ctx.fillStyle = Math.random() > 0.85 ? '#ff8099' : '#ff003c';
            } else if (isDarkMode) {
                ctx.fillStyle = Math.random() > 0.85 ? '#80ffb0' : '#00ff41';
            } else {
                ctx.fillStyle = Math.random() > 0.85 ? '#005ecb' : '#0d8a43';
            }
            
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }

            drops[i] += (window._matrixSpeedBoost ? 2 : 1);
        }
    }

    // Animation frame loop throttled to ~30 FPS with tab pause guard
    function renderLoop(currentTime) {
        requestAnimationFrame(renderLoop);

        // Pause rendering when browser tab is inactive to conserve GPU/battery
        if (document.hidden) return;

        const delta = currentTime - lastFrameTime;
        if (delta >= frameInterval) {
            draw();
            lastFrameTime = currentTime - (delta % frameInterval);
        }
    }

    requestAnimationFrame(renderLoop);
}

// --- Navigation & Section Scroll-Spy Engine (Continuous Vertical Scroll + HUD Corner Tracker) --- //
function initNavigation() {
    const navItems = document.querySelectorAll('.dock-item[href]');
    const sections = document.querySelectorAll('.hud-section');
    const trackerContainer = document.getElementById('hud-section-tracker');
    const trackerToggle = document.getElementById('hud-tracker-toggle');
    const trackerIndexEl = document.getElementById('tracker-index');
    const trackerTitleEl = document.getElementById('tracker-title');
    const trackerDots = document.querySelectorAll('.tracker-dot[data-target]');
    const trackerMenuItems = document.querySelectorAll('.tracker-menu-item[data-target]');

    const sectionRegistry = [
        { id: 'about', index: '01', label: 'SYS_INFO', dockHref: '#about' },
        { id: 'telemetry', index: '02', label: 'TELEMETRY', dockHref: '#about' },
        { id: 'arsenal', index: '03', label: 'ARSENAL', dockHref: '#arsenal' },
        { id: 'ops', index: '04', label: 'OPERATIONS', dockHref: '#ops' },
        { id: 'tryhackme', index: '05', label: 'TRYHACKME', dockHref: '#tryhackme' },
        { id: 'registry', index: '06', label: 'REGISTRY', dockHref: '#registry' },
        { id: 'contact', index: '07', label: 'COMMS_BRIDGE', dockHref: '#contact' }
    ];

    const totalCount = String(sectionRegistry.length).padStart(2, '0');
    let currentActiveId = 'about';

    function closeTrackerMenu() {
        if (!trackerContainer || !trackerToggle) return;
        trackerContainer.classList.remove('is-open');
        trackerToggle.setAttribute('aria-expanded', 'false');
    }

    function updateActiveSectionUI(sectionId) {
        const meta = sectionRegistry.find(s => s.id === sectionId);
        if (!meta) return;

        // Update HUD Corner Tracker index & title with smooth micro-transition
        if (trackerIndexEl) {
            trackerIndexEl.textContent = `${meta.index} / ${totalCount}`;
        }
        if (trackerTitleEl && currentActiveId !== sectionId) {
            trackerTitleEl.classList.add('is-switching');
            setTimeout(() => {
                trackerTitleEl.textContent = meta.label;
                trackerTitleEl.classList.remove('is-switching');
            }, 120);
        } else if (trackerTitleEl) {
            trackerTitleEl.textContent = meta.label;
        }

        currentActiveId = sectionId;

        // Sync mini progress dots
        trackerDots.forEach(dot => {
            dot.classList.toggle('active', dot.getAttribute('data-target') === sectionId);
        });

        // Sync quick-jump menu items
        trackerMenuItems.forEach(menuItem => {
            menuItem.classList.toggle('active', menuItem.getAttribute('data-target') === sectionId);
        });

        // Sync macOS dock highlight
        navItems.forEach(item => {
            item.classList.toggle('active', item.getAttribute('href') === meta.dockHref);
        });
    }

    function jumpToSection(targetId) {
        const targetSection = document.getElementById(targetId);
        if (!targetSection) return;

        updateActiveSectionUI(targetId);
        targetSection.classList.add('active-section', 'section-visible');

        // Trigger staggered cascade reveal wave for target section
        requestAnimationFrame(() => {
            targetSection.querySelectorAll('.hud-cascade-item').forEach((el, idx) => {
                el.style.setProperty('--cascade-index', idx % 8);
                el.classList.add('revealed');
            });
        });

        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Ensure initial above-the-fold hero section is visible on load
    const initialSection = document.getElementById('about') || sections[0];
    if (initialSection) {
        initialSection.classList.add('active-section', 'section-visible');
        updateActiveSectionUI(initialSection.id || 'about');
    }

    // 1. macOS Dock Navigation Clicks
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const href = item.getAttribute('href');
            if (!href || !href.startsWith('#')) return;
            e.preventDefault();
            closeTrackerMenu();
            jumpToSection(href.substring(1));
        });
    });

    // 2. HUD Tracker Mini Progress Dot Clicks
    trackerDots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            e.stopPropagation();
            const targetId = dot.getAttribute('data-target');
            closeTrackerMenu();
            if (targetId) {
                if (typeof window.playAudioChime === 'function') window.playAudioChime();
                jumpToSection(targetId);
            }
        });
    });

    // 3. HUD Tracker Quick-Jump Menu Item Clicks
    trackerMenuItems.forEach(menuItem => {
        menuItem.addEventListener('click', (e) => {
            e.stopPropagation();
            const targetId = menuItem.getAttribute('data-target');
            closeTrackerMenu();
            if (targetId) {
                if (typeof window.playAudioChime === 'function') window.playAudioChime();
                jumpToSection(targetId);
            }
        });
    });

    // 4. HUD Tracker Menu Toggle, Outside Click & Escape Key
    if (trackerToggle && trackerContainer) {
        trackerToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = trackerContainer.classList.toggle('is-open');
            trackerToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            if (typeof window.playAudioBlip === 'function') window.playAudioBlip(920, 0.03);
        });

        document.addEventListener('click', (e) => {
            if (!trackerContainer.contains(e.target)) {
                closeTrackerMenu();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && trackerContainer.classList.contains('is-open')) {
                closeTrackerMenu();
            }
        });
    }

    // 5. Section-Level IntersectionObserver: 60fps GPU Fade-In / Slide-Up
    if ('IntersectionObserver' in window && sections.length) {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const section = entry.target;
                if (entry.isIntersecting) {
                    section.classList.add('section-visible', 'active-section');
                }
            });
        }, {
            threshold: 0.05,
            rootMargin: '0px 0px -32px 0px'
        });

        sections.forEach(section => sectionObserver.observe(section));
    } else {
        sections.forEach(section => section.classList.add('section-visible', 'active-section'));
    }

    // 6. Precision Viewport Scroll-Spy for Active Section Tracking
    let spyTicking = false;
    function syncActiveSectionOnScroll() {
        const probeY = window.innerHeight * 0.35;
        let bestSectionId = currentActiveId;
        let minDistance = Infinity;

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= probeY && rect.bottom >= probeY) {
                bestSectionId = section.id;
                minDistance = 0;
            } else {
                const dist = Math.min(Math.abs(rect.top - probeY), Math.abs(rect.bottom - probeY));
                if (dist < minDistance) {
                    minDistance = dist;
                    bestSectionId = section.id;
                }
            }
        });

        if (bestSectionId && bestSectionId !== currentActiveId) {
            updateActiveSectionUI(bestSectionId);
        }
        spyTicking = false;
    }

    window.addEventListener('scroll', () => {
        if (!spyTicking) {
            requestAnimationFrame(syncActiveSectionOnScroll);
            spyTicking = true;
        }
    }, { passive: true });
}


// --- Operations Tabs --- //
function initOperationsTabs() {
    const tabButtons = document.querySelectorAll('.ops-tabs .tab-btn');
    const contents = document.querySelectorAll('.ops-content');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            contents.forEach(content => {
                content.classList.remove('active-content', 'active-section');
                if (content.id === targetId) {
                    content.classList.add('active-section', 'active-content');
                    const childCards = content.querySelectorAll('.card-reveal-item');
                    childCards.forEach((card, idx) => {
                        card.classList.remove('is-card-visible');
                        card.style.setProperty('--card-reveal-delay', `${(idx % 3) * 55}ms`);
                        requestAnimationFrame(() => {
                            requestAnimationFrame(() => {
                                card.classList.add('is-card-visible');
                            });
                        });
                    });
                }
            });
        });
    });
}

// --- 4.5. Technical Arsenal Interactive Filters --- //
function initArsenalFilter() {
    const filterBtns = document.querySelectorAll('.arsenal-filter-btn');
    const skillCards = document.querySelectorAll('.arsenal-grid .skill-card');
    if (!filterBtns.length || !skillCards.length) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterVal = btn.getAttribute('data-filter') || 'all';
            let visibleIdx = 0;

            skillCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category') || '';
                if (filterVal === 'all' || cardCategory.includes(filterVal)) {
                    card.style.display = 'flex';
                    card.classList.remove('filter-enter', 'is-card-visible');
                    card.style.setProperty('--card-reveal-delay', `${(visibleIdx % 3) * 50}ms`);
                    visibleIdx++;
                    void card.offsetWidth;
                    card.classList.add('filter-enter', 'is-card-visible');
                } else {
                    card.classList.remove('filter-enter', 'is-card-visible');
                    card.style.display = 'none';
                }
            });

            if (typeof window.playAudioBlip === 'function') window.playAudioBlip(750, 0.03);
        });
    });
}

function initCertFilters() {
    const btns = document.querySelectorAll('.cert-filter-btn');
    const cards = document.querySelectorAll('.certs-grid .cert-card, .cert-grid .cert-card');
    const searchInput = document.getElementById('cert-search-input');
    if (!cards.length) return;

    let activeFilter = 'all';
    let searchQuery = '';

    function applyCertFiltering() {
        cards.forEach(card => {
            const tags = card.getAttribute('data-tags') || '';
            const title = card.querySelector('h4')?.textContent.toLowerCase() || '';
            const desc = card.querySelector('.cert-desc')?.textContent.toLowerCase() || '';
            const vendor = card.querySelector('.cert-vendor-tag')?.textContent.toLowerCase() || '';
            const pills = card.querySelector('.cert-tech-pills')?.textContent.toLowerCase() || '';

            const matchesCategory = (activeFilter === 'all' || tags.includes(activeFilter));
            const matchesSearch = !searchQuery || (title.includes(searchQuery) || desc.includes(searchQuery) || vendor.includes(searchQuery) || pills.includes(searchQuery));

            if (matchesCategory && matchesSearch) {
                card.classList.remove('hidden', 'filter-enter');
                card.style.display = '';
                void card.offsetWidth;
                card.classList.add('filter-enter');
            } else {
                card.classList.remove('filter-enter');
                card.style.display = 'none';
                card.classList.add('hidden');
            }
        });
    }

    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            activeFilter = btn.getAttribute('data-filter') || 'all';
            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            applyCertFiltering();
        });
    });

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.toLowerCase().trim();
            applyCertFiltering();
        });
    }
}

// --- Local HUD Variables (Clock, IP, Live Security Ping) --- //
function initHudData() {
    // Local ticking clock
    const clockEl = document.getElementById('local-time');
    
    function updateClock() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { hour12: false });
        if (clockEl) clockEl.textContent = `${timeString} (IST)`;
    }
    
    updateClock();
    setInterval(updateClock, 1000);

    // IP Fetch / Generate
    const ipEl = document.getElementById('user-ip');
    if (ipEl) {
        // Try fetching public IP, fall back to mock if off-line
        fetch('https://api.ipify.org?format=json')
            .then(res => res.json())
            .then(data => {
                if (data.ip) ipEl.textContent = data.ip;
            })
            .catch(() => {
                // Mock random IP address
                const randomIP = `103.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
                ipEl.textContent = randomIP;
            });
    }
}

// --- Contact Form Encryption Simulation --- //
function initContactForm() {
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('form-submit-btn');
    const responseEl = document.getElementById('form-response');

    if (!form || !submitBtn) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Show submission simulation
        submitBtn.disabled = true;
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> HASHING_PACKET...`;

        setTimeout(() => {
            submitBtn.innerHTML = `<i class="fa-solid fa-satellite-dish"></i> BROADCASTING...`;
            
            setTimeout(() => {
                // Dispatched successfully
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                responseEl.classList.remove('hidden');
                form.reset();

                // Fade status response
                setTimeout(() => {
                    responseEl.classList.add('hidden');
                }, 5000);

            }, 1200);
        }, 1200);
    });
}

// --- Theme Toggle Engine --- //
function initThemeToggle() {
    const themeBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-btn-icon');
    const themeText = document.getElementById('theme-btn-text');

    function applyThemeState(isDark) {
        document.body.classList.toggle('dark-mode', isDark);
        document.body.classList.toggle('light-mode', !isDark);
        localStorage.setItem('theme', isDark ? 'dark' : 'light');

        if (themeIcon) {
            themeIcon.className = isDark ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
        }
        if (themeText) {
            themeText.textContent = isDark ? 'DARK_HUD' : 'LIGHT_HUD';
        }
    }

    // Check localStorage preference (default to dark if not set)
    const savedTheme = localStorage.getItem('theme');
    const initialDark = savedTheme === 'dark' || !savedTheme;
    applyThemeState(initialDark);

    if (!themeBtn) return;

    themeBtn.addEventListener('click', () => {
        const isDark = !document.body.classList.contains('dark-mode');
        applyThemeState(isDark);
        if (typeof window.playAudioBlip === 'function') window.playAudioBlip(960, 0.04);
        if (typeof window.showToast === 'function') {
            window.showToast(isDark ? '[THEME] Obsidian Dark HUD engaged' : '[THEME] High-Contrast Light HUD engaged');
        }
    });
}

// --- Tactical Control Panel Tabs & Shell Engine --- //
function initTacticalTabs() {
    const tabBtns = document.querySelectorAll('.hud-tab-btn');
    const tabContents = document.querySelectorAll('.hud-tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');
            
            // Set active button & aria-selected
            tabBtns.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');

            // Toggle active content block
            tabContents.forEach(content => {
                content.classList.remove('active-tab-content');
                if (content.id === `tab-${targetTab}`) {
                    content.classList.add('active-tab-content');
                }
            });

            // Focus terminal input if Terminal CLI tab is clicked
            if (targetTab === 'terminal-cli') {
                const cliInput = document.getElementById('cli-input');
                if (cliInput) setTimeout(() => cliInput.focus(), 100);
            }
        });
    });

    // Start scanner simulation
    startScannerSimulation();
    
    // Start terminal shell
    startTerminalShell();
}

function startScannerSimulation() {
    const logsArea = document.getElementById('scanner-logs-area');
    if (!logsArea) return;

    const mockLogs = [
        "SYS_INIT: Accessing socket gateways...",
        "STATUS: AUDIT_PIPELINE_OK [SECURE]",
        "TARGET_SCAN: Ingesting routing maps...",
        "LOG: TCP port 80/http check... SECURED",
        "LOG: TCP port 443/https check... SECURED",
        "AUDIT: Checking TLS Certificate cipher strength...",
        "CIPHER: AES-GCM-256 integrity verified [100%]",
        "SECURITY: OWASP top-10 threat verification running...",
        "INJECTION_SHIELD: SQLi, XSS audit... ZERO_VULN",
        "RATE_LIMIT: API gateway overflow throttle... OK",
        "SURVEILLANCE: Shannon Entropy on DNS queries... SECURE",
        "LOG: Fetching threat feeds from NVD DB...",
        "ALERT: All target threat indices cleared [OK]",
        "RECON: Completing network node integrity pass...",
        "SYS_STATUS: Cyber sentinel online. System secure."
    ];

    let logIdx = 0;
    
    // Append initial logs once without continuous background DOM mutation
    for (let i = 0; i < 6; i++) {
        appendLog();
    }

    function appendLog() {
        const time = new Date().toLocaleTimeString('en-US', { hour12: false });
        const logItem = document.createElement('div');
        logItem.className = 'scanner-log-item';
        logItem.innerHTML = `<span style="color: var(--cyber-cyan); opacity: 0.85;">[${time}]</span> ${mockLogs[logIdx]}`;
        logsArea.appendChild(logItem);
        
        // Auto scroll to bottom
        logsArea.scrollTop = logsArea.scrollHeight;
        
        logIdx = (logIdx + 1) % mockLogs.length;

        // Keep maximum log rows count in DOM
        if (logsArea.children.length > 50) {
            logsArea.removeChild(logsArea.firstChild);
        }
    }
}

function startTerminalShell() {
    const cliInput = document.getElementById('cli-input');
    const cliOutput = document.getElementById('cli-output-area');
    if (!cliInput || !cliOutput) return;

    // Handle command submission
    cliInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const rawVal = cliInput.value;
            const cmd = rawVal.trim().toLowerCase();
            cliInput.value = '';

            // Echo command
            printLine(`<span style="color: #ffffff;">guest@cyber-hud:~$</span> ${rawVal}`);

            if (cmd) {
                executeCommand(cmd);
            }
        }
    });

    function printLine(htmlText) {
        const line = document.createElement('div');
        line.innerHTML = htmlText;
        cliOutput.appendChild(line);
        cliOutput.scrollTop = cliOutput.scrollHeight;
    }

    function executeCommand(cmd) {
        switch (cmd) {
            case 'help':
                printLine("Active Command Protocols:");
                printLine("  <span style='color: var(--cyber-cyan);'>whoami</span>    - Prints bio and sentinel profile trace.");
                printLine("  <span style='color: var(--cyber-cyan);'>skills</span>    - Prints visual ASCII stack chart (72 skills).");
                printLine("  <span style='color: var(--cyber-cyan);'>hack</span>      - Simulates automated adversary attack sequence.");
                printLine("  <span style='color: var(--cyber-cyan);'>scan</span>      - Executes simulated network port & defense audit.");
                printLine("  <span style='color: var(--cyber-cyan);'>matrix</span>    - Accelerates background Matrix rain stream.");
                printLine("  <span style='color: var(--cyber-cyan);'>ctf</span>       - Decodes encrypted token capture-the-flag payload.");
                printLine("  <span style='color: var(--cyber-cyan);'>shield</span>    - Deploys WAF defense rules & packet scrubber.");
                printLine("  <span style='color: var(--cyber-cyan);'>override</span>  - Toggles secret Red Team Exploit Mode.");
                printLine("  <span style='color: var(--cyber-cyan);'>events</span>    - Generates live random threat telemetry event.");
                printLine("  <span style='color: var(--cyber-cyan);'>redteam</span>   - Lists offensive toolchains & C2 capabilities.");
                printLine("  <span style='color: var(--cyber-cyan);'>thm</span>       - Displays TryHackMe operator telemetry.");
                printLine("  <span style='color: var(--cyber-cyan);'>certs</span>     - Displays cryptographically verified certs.");
                printLine("  <span style='color: var(--cyber-cyan);'>contact</span>   - Establishes connection bridge comms.");
                printLine("  <span style='color: var(--cyber-cyan);'>ip</span>        - Queries client node public IP.");
                printLine("  <span style='color: var(--cyber-cyan);'>clear</span>     - Clears CLI terminal output.");
                printLine("  <span style='color: var(--cyber-cyan);'>help</span>      - Prints this assistance matrix.");
                break;
            case 'clear':
                cliOutput.innerHTML = '';
                break;
            case 'whoami':
                printLine("IDENTITY TRACE //");
                printLine("  Name: GIRIDHARAN K");
                printLine("  Title: Cyber Security Engineer &amp; Full-Stack Specialist");
                printLine("  Focus: Offensive Red Teaming, Web AppSec, Threat Intel AI");
                printLine("  Node Status: VERIFIED_SECURE [TOP 11% TRYHACKME]");
                break;
            case 'skills':
                printLine("CAPABILITY METRICS (72 SKILLS LOGGED) //");
                printLine("  Offensive Hacking [████████████████░░] 85% (Burp, Mimikatz, Metasploit, Nmap)");
                printLine("  Binary &amp; RE       [██████████████░░░░] 78% (Ghidra, ROP Chains, GDB/PEDA)");
                printLine("  Web AppSec        [█████████████████░] 88% (OWASP Top 10, JWT, SQLi, SSRF)");
                printLine("  Network Attacks   [████████████████░░] 82% (Bettercap, Scapy, Aircrack-ng)");
                printLine("  Full-Stack Dev    [████████████████░░] 85% (React, Python 3.12, FastAPI, Node)");
                printLine("  Security AI       [████████████████░░] 80% (Shannon Entropy, XGBoost, CNN)");
                break;
            case 'hack':
            case 'exploit':
                printLine("<span style='color: var(--cyber-orange);'>[!] INITIATING ADVERSARY EMULATION SEQUENCE...</span>");
                setTimeout(() => printLine("  [1/4] Scanning target perimeter... 443/TCP [OPEN] | 88/TCP [KERBEROS]"), 300);
                setTimeout(() => printLine("  [2/4] Executing AS-REP Roasting on KRB5 SPN... <span style='color: var(--cyber-green);'>[TICKET_ACQUIRED]</span>"), 700);
                setTimeout(() => printLine("  [3/4] Cracking RC4-HMAC cipher with Hashcat mode 18200... <span style='color: var(--cyber-green);'>[CRACKED]</span>"), 1100);
                setTimeout(() => printLine("  [4/4] Elevating privileges via SeImpersonatePrivilege... <span style='color: #00ff41;'>[ROOT_SHELL_GRANTED]</span>"), 1500);
                break;
            case 'redteam':
                printLine("OFFENSIVE RED TEAM TOOLCHAINS //");
                printLine("  Active Directory: BloodHound, Mimikatz, Impacket, Certipy, CrackMapExec");
                printLine("  Exploit Tooling: Burp Suite Pro, Metasploit, SQLmap, OWASP ZAP");
                printLine("  Binary / RE: Ghidra, GDB-PEDA, Radare2, ROPgadget, x64dbg");
                printLine("  Network &amp; Wireless: Scapy, Bettercap, Aircrack-ng, Wireshark, Nmap");
                break;
            case 'thm':
            case 'tryhackme':
                printLine("TRYHACKME TELEMETRY //");
                printLine("  User: giridharank790 | Rank: TOP 11% GLOBAL");
                printLine("  Rooms Completed: 40+ Nodes Cleared");
                printLine("  Profile Link: <a href='https://tryhackme.com/p/giridharank790' target='_blank' style='color: var(--cyber-cyan); text-decoration: underline;'>tryhackme.com/p/giridharank790</a>");
                break;
            case 'certs':
            case 'credentials':
                printLine("VERIFIED CREDENTIAL NODES (23 VERIFIED) //");
                printLine("  • Google Cybersecurity Professional Certificate");
                printLine("  • Cisco Certified Ethical Hacker &amp; Cybersecurity Essentials");
                printLine("  • Fortinet Network Security Associate (NSE)");
                printLine("  • AWS Solutions Architecture &amp; Azure Tools");
                printLine("  • Future Interns Cyber Security Internship");
                printLine("  • JPMorgan &amp; Deloitte Technical Simulations");
                break;
            case 'ip':
                const ipVal = document.getElementById('user-ip') ? document.getElementById('user-ip').textContent : '127.0.0.1';
                printLine(`CLIENT_NODE_IP: <span style='color: var(--cyber-orange);'>${ipVal}</span>`);
                break;
            case 'matrix':
                printLine("<span style='color: #00ff41;'>[STREAM] Accelerating Matrix Code Rain stream for 6 seconds...</span>");
                if (window.accelerateMatrixRain) window.accelerateMatrixRain(6000);
                if (window.playAudioBlip) window.playAudioBlip(1200, 0.08);
                break;
            case 'ctf':
                printLine("<span style='color: var(--cyber-cyan);'>[CTF_CHALLENGE] Base64 Token Decoded:</span>");
                printLine("  Encrypted: <span style='color: var(--cyber-orange);'>ZmxhZ3tnMXJpX2N5YjNyX3MzbnQxbjNsXzIwMjZ9</span>");
                printLine("  Decoded Flag: <span style='color: #00ff41; font-weight: bold;'>flag{g1ri_cyb3r_s3nt1n3l_2026}</span>");
                printLine("  Status: 🏅 CTF_NODE_AUTHENTICATED (+100 PTS)");
                if (window.playAudioSuccess) window.playAudioSuccess();
                break;
            case 'scan':
            case 'nmap':
                printLine("<span style='color: var(--cyber-cyan);'>[NMAP] Initializing stealth SYN scan on portfolio perimeter...</span>");
                setTimeout(() => printLine("  PORT 80/TCP   OPEN   HTTP (Cloudflare WAF Proxied)"), 250);
                setTimeout(() => printLine("  PORT 443/TCP  OPEN   HTTPS (TLS 1.3 // AES-256-GCM)"), 500);
                setTimeout(() => printLine("  PORT 22/TCP   FILTERED SSH (mTLS Identity Verification)"), 750);
                setTimeout(() => printLine("  <span style='color: #00ff41;'>[AUDIT_PASS] 1 host up, 0 vulnerabilities detected. High security posture.</span>"), 1050);
                if (window.playAudioBlip) window.playAudioBlip(950, 0.05);
                break;
            case 'shield':
            case 'defend':
                printLine("<span style='color: #00ff41;'>[DEFENSE_GRID] Automated WAF rules synchronized. Packet scrubber active.</span>");
                if (window.triggerRandomCyberEvent) window.triggerRandomCyberEvent();
                break;
            case 'override':
            case 'redteam-mode':
                printLine("<span style='color: #ff003c; font-weight: bold;'>[OVERRIDE] Toggling Red Team / Exploit Mode...</span>");
                if (window.toggleRedTeamMode) window.toggleRedTeamMode();
                break;
            case 'events':
            case 'threat':
            case 'event':
                printLine("<span style='color: var(--cyber-cyan);'>[SIMULATION] Generating live threat telemetry broadcast...</span>");
                if (window.triggerRandomCyberEvent) window.triggerRandomCyberEvent();
                break;
            case 'sudo':
            case 'root':
                printLine("<span style='color: var(--cyber-orange);'>[ACCESS_DENIED] giridharank is not in the sudoers file. This incident has been logged.</span>");
                if (window.playAudioWarning) window.playAudioWarning();
                break;
            case 'contact':
                printLine("Establishing link... Redirecting to comms bridge.");
                const contactSection = document.getElementById('contact');
                const contactBtn = document.querySelector('a[href="#contact"]');
                if (contactBtn) {
                    contactBtn.click();
                } else if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                }
                break;
            default:
                printLine(`<span style='color: var(--cyber-orange);'>[ERROR]</span> Command not recognized: '${cmd}'. Type 'help' for support.`);
        }
    }
}

// --- Live message field encryption preview --- //
function initPayloadEncryption() {
    const formBody = document.getElementById('form-body');
    const preview = document.getElementById('payload-preview');
    if (!formBody || !preview) return;

    formBody.addEventListener('input', () => {
        const val = formBody.value;
        if (!val.trim()) {
            preview.textContent = "[WAITING_FOR_SENDER_PAYLOAD...]";
            preview.classList.remove('encrypted-state');
            return;
        }

        let hash = '';
        for (let i = 0; i < val.length; i++) {
            let charCode = val.charCodeAt(i);
            let shifted = charCode + 13;
            hash += shifted.toString(16).toUpperCase() + " ";
        }
        
        preview.textContent = `[CIPHERTEXT]: ${hash.trim()}`;
        preview.classList.add('encrypted-state');
    });
}

// --- 12. Toast & Interactive Copy Listener --- //
function initCopyToast() {
    const toast = document.getElementById('cyber-toast');
    const toastMsg = document.getElementById('toast-msg');
    let toastTimeout;

    window.showToast = function(msg) {
        if (!toast || !toastMsg) return;
        toastMsg.textContent = msg;
        toast.classList.remove('hidden');
        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toast.classList.add('hidden');
        }, 3200);
    };

    function copyTextToClipboard(text) {
        if (!text) return;
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(() => {
                window.showToast(`[COPIED] ${text} saved to clipboard!`);
            }).catch(() => {
                fallbackCopy(text);
            });
        } else {
            fallbackCopy(text);
        }
    }

    function fallbackCopy(text) {
        try {
            const ta = document.createElement('textarea');
            ta.value = text;
            ta.style.position = 'fixed';
            ta.style.opacity = '0';
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
        } catch (err) {}
        window.showToast(`[COPIED] ${text} saved to clipboard!`);
    }

    // Attach copy / action event to contact method items and copy badges
    const contactItems = document.querySelectorAll('.contact-method-item');
    contactItems.forEach(item => {
        const valLink = item.querySelector('.contact-val');
        const badge = item.querySelector('.copy-badge');
        if (!valLink) return;

        const href = valLink.getAttribute('href') || '';
        const rawText = valLink.textContent.trim();
        const isMapLink = href.startsWith('http');

        if (badge) {
            badge.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (isMapLink) {
                    valLink.click();
                } else {
                    copyTextToClipboard(rawText);
                }
            });
        }

        valLink.addEventListener('click', () => {
            if (!isMapLink && rawText) {
                copyTextToClipboard(rawText);
            }
        });

        item.addEventListener('click', (e) => {
            if (e.target.closest('a') || e.target.closest('.copy-badge')) return;
            if (isMapLink) {
                valLink.click();
            } else {
                copyTextToClipboard(rawText);
            }
        });
    });
}

// --- 13. Interactive Project Modal Engine --- //
function initProjectModal() {
    const modal = document.getElementById('cyber-modal');
    const closeBtn = document.getElementById('modal-close-btn');
    const heading = document.getElementById('modal-heading');
    const desc = document.getElementById('modal-desc');
    const tagsWrapper = document.getElementById('modal-tags');
    const demoBtn = document.getElementById('modal-demo-btn');

    if (!modal) return;

    // Attach click listeners to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Ignore click if clicking direct link button inside card
            if (e.target.closest('a') || e.target.closest('button')) return;

            const cardTitle = card.querySelector('h3, h4')?.textContent || 'TACTICAL_MODULE';
            const cardDesc = card.querySelector('.project-desc, p')?.textContent?.trim() || 'Detailed system specification and architectural documentation module.';
            const projectTag = card.querySelector('.project-tag')?.textContent?.trim() || 'FEATURED_MODULE';
            const projectId = card.querySelector('.project-id')?.textContent?.trim() || '0x00';
            const primaryLink = card.querySelector('.project-actions a')?.getAttribute('href') || 'https://github.com/nextboxis';
            const techSpans = Array.from(card.querySelectorAll('.project-tech span')).map(s => s.textContent.trim());

            if (heading) heading.textContent = `${cardTitle} [${projectId}]`;
            if (desc) desc.textContent = cardDesc;
            if (demoBtn) demoBtn.setAttribute('href', primaryLink);

            if (tagsWrapper) {
                const techBadges = techSpans.map(t => `<span class="cyber-badge font-mono" style="font-size: 0.7rem; border-color: var(--cyber-cyan); color: var(--cyber-cyan);">${t}</span>`).join('');
                tagsWrapper.innerHTML = `
                    <span class="cyber-badge font-mono" style="font-size: 0.7rem;">${projectTag}</span>
                    ${techBadges}
                `;
            }

            modal.classList.remove('hidden');
        });
    });

    // Close listeners
    if (closeBtn) {
        closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.add('hidden');
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            modal.classList.add('hidden');
        }
    });
}

// --- 14. Tactical Audio Synth SFX Engine (Multi-Pitch Profiles & LocalStorage) --- //
function initAudioSynth() {
    let audioCtx = null;
    let isSfxMuted = localStorage.getItem('cyber_sfx_muted') === 'true';

    const sfxBtn = document.getElementById('sfx-toggle-btn');
    const sfxIcon = document.getElementById('sfx-btn-icon');
    const sfxText = document.getElementById('sfx-btn-text');

    function updateSfxButtonUI() {
        if (!sfxBtn) return;
        if (isSfxMuted) {
            sfxBtn.classList.add('sfx-muted');
            if (sfxIcon) sfxIcon.className = 'fa-solid fa-volume-xmark';
            if (sfxText) sfxText.textContent = 'SFX_MUTED';
        } else {
            sfxBtn.classList.remove('sfx-muted');
            if (sfxIcon) sfxIcon.className = 'fa-solid fa-volume-high';
            if (sfxText) sfxText.textContent = 'SFX_ON';
        }
    }

    updateSfxButtonUI();

    function getAudioCtx() {
        if (!audioCtx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) audioCtx = new AudioContext();
        }
        if (audioCtx && audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        return audioCtx;
    }

    // Sound Profile 1: Standard Crisp Click Blip
    window.playAudioBlip = function (freq = 850, duration = 0.035) {
        if (isSfxMuted) return;
        try {
            const ctx = getAudioCtx();
            if (!ctx) return;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, ctx.currentTime);
            gain.gain.setValueAtTime(0.04, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + duration);
        } catch (e) {}
    };

    // Sound Profile 2: High-Pitch Dual Tone Section Navigation Chime
    window.playAudioChime = function () {
        if (isSfxMuted) return;
        try {
            const ctx = getAudioCtx();
            if (!ctx) return;
            const now = ctx.currentTime;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(1200, now);
            osc.frequency.exponentialRampToValueAtTime(1600, now + 0.08);
            gain.gain.setValueAtTime(0.05, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(now + 0.08);
        } catch (e) {}
    };

    // Sound Profile 3: Upward Frequency Slide Success Chime
    window.playAudioSuccess = function () {
        if (isSfxMuted) return;
        try {
            const ctx = getAudioCtx();
            if (!ctx) return;
            const now = ctx.currentTime;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(900, now);
            osc.frequency.exponentialRampToValueAtTime(1800, now + 0.1);
            gain.gain.setValueAtTime(0.06, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(now + 0.1);
        } catch (e) {}
    };

    // Sound Profile 4: Descending Close/Warning Tone
    window.playAudioWarning = function () {
        if (isSfxMuted) return;
        try {
            const ctx = getAudioCtx();
            if (!ctx) return;
            const now = ctx.currentTime;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(550, now);
            osc.frequency.exponentialRampToValueAtTime(350, now + 0.09);
            gain.gain.setValueAtTime(0.03, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(now + 0.09);
        } catch (e) {}
    };

    if (sfxBtn) {
        sfxBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (!isSfxMuted) {
                window.playAudioWarning();
            }
            isSfxMuted = !isSfxMuted;
            localStorage.setItem('cyber_sfx_muted', isSfxMuted);
            updateSfxButtonUI();

            if (window.showToast) {
                window.showToast(isSfxMuted ? '[AUDIO] Tactile SFX muted' : '[AUDIO] Tactile SFX enabled');
            }
            if (!isSfxMuted) {
                window.playAudioSuccess();
            }
        });
    }

    // Contextual Event Handler Bindings
    document.querySelectorAll('.dock-item').forEach(el => {
        el.addEventListener('click', () => window.playAudioChime());
    });

    document.querySelectorAll('.copy-badge, .contact-method-item').forEach(el => {
        el.addEventListener('click', () => window.playAudioSuccess());
    });

    document.querySelectorAll('.modal-close-btn, .hud-lightbox-close, #modal-close-btn, #lightbox-close-btn').forEach(el => {
        el.addEventListener('click', () => window.playAudioWarning());
    });

    document.querySelectorAll('.btn:not(.dock-item), .hud-tab-btn, .tab-btn, .ops-tag-btn, .cert-card, .thm-badge-pill').forEach(el => {
        el.addEventListener('click', () => window.playAudioBlip(850, 0.035));
    });
}

// --- 15. Dynamic Stat Count-Up Engine --- //
function initStatCounters() {
    const statVals = document.querySelectorAll('.thm-stat-val');
    let animated = false;

    function animateCounters() {
        if (animated) return;
        animated = true;

        statVals.forEach(el => {
            const text = el.textContent.trim();
            const match = text.match(/^(\D*)(\d+)(.*)$/);
            if (match) {
                const prefix = match[1] || '';
                const target = parseInt(match[2], 10);
                const suffix = match[3] || '';
                let current = 0;
                const increment = Math.max(1, Math.ceil(target / 24));
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    el.textContent = `${prefix}${current}${suffix}`;
                }, 32);
            }
        });
    }

    const thmSection = document.getElementById('tryhackme');
    if (thmSection) {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) animateCounters();
        }, { threshold: 0.2 });
        observer.observe(thmSection);
    }
}

// --- 16. Background Wallpaper Switcher (Manual Trigger Only) --- //
function initBackgroundRotation() {
    const bgImages = [
        './bg images/ascii-magic-5.webp',
        './bg images/ascii-magic-7.webp',
        './bg images/ascii-magic-8.webp',
        './bg images/ascii-magic-12.webp',
        './bg images/ascii-magic-15.webp',
        './bg images/ascii-magic-16.webp',
        './bg images/ChatGPT Image Jun 30, 2026, 10_04_35 PM.webp'
    ];

    const layer1 = document.getElementById('bg-layer-1');
    const layer2 = document.getElementById('bg-layer-2');

    if (!layer1 || !layer2) return;

    let currentIdx = 0;
    let activeLayer = 1;
    let isTransitioning = false;
    let autoRotateTimer = null;
    let cleanupTimer = null;

    function buildBgValue(path) {
        return `linear-gradient(var(--bg-wash), var(--bg-wash)), url("${encodeURI(path)}")`;
    }

    // Preload and pre-decode all wallpapers in GPU memory so transitions never flash
    const decodedCache = new Map();
    function ensureDecoded(src) {
        const encoded = encodeURI(src);
        if (decodedCache.has(encoded)) {
            return decodedCache.get(encoded);
        }
        const promise = new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
                if (typeof img.decode === 'function') {
                    img.decode().then(() => resolve(img)).catch(() => resolve(img));
                } else {
                    resolve(img);
                }
            };
            img.onerror = () => resolve(null);
            img.src = encoded;
        });
        decodedCache.set(encoded, promise);
        return promise;
    }

    bgImages.forEach(src => ensureDecoded(src));

    // Set initial background images and solid base layer state
    layer1.style.backgroundImage = buildBgValue(bgImages[0]);
    layer2.style.backgroundImage = buildBgValue(bgImages[1]);
    layer1.classList.add('active-bg', 'base-layer');
    layer2.classList.remove('active-bg', 'base-layer', 'top-layer');

    function transitionToNext() {
        if (isTransitioning) return;
        isTransitioning = true;

        const nextIdx = (currentIdx + 1) % bgImages.length;
        const targetSrc = bgImages[nextIdx];
        const targetCss = buildBgValue(targetSrc);

        ensureDecoded(targetSrc).then(() => {
            currentIdx = nextIdx;

            const outgoingLayer = activeLayer === 1 ? layer1 : layer2;
            const incomingLayer = activeLayer === 1 ? layer2 : layer1;
            activeLayer = activeLayer === 1 ? 2 : 1;

            if (cleanupTimer) clearTimeout(cleanupTimer);

            // 1. Keep outgoing layer 100% opaque underneath (base-layer) so zero background ever bleeds through
            outgoingLayer.classList.remove('top-layer');
            outgoingLayer.classList.add('active-bg', 'base-layer');

            // 2. Stage incoming layer at opacity 0 on top without transition while texture is committed
            incomingLayer.classList.add('no-transition', 'top-layer');
            incomingLayer.classList.remove('active-bg', 'base-layer');
            incomingLayer.style.backgroundImage = targetCss;
            void incomingLayer.offsetHeight;

            // 3. Wait 2 animation frames so GPU texture is painted, then smoothly fade incoming layer 0 -> 1 over top
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    incomingLayer.classList.remove('no-transition');
                    incomingLayer.classList.add('active-bg');

                    // 4. Only after incoming layer reaches 100% opacity, promote it to base-layer and hide old layer
                    cleanupTimer = setTimeout(() => {
                        incomingLayer.classList.remove('top-layer');
                        incomingLayer.classList.add('base-layer');

                        outgoingLayer.classList.add('no-transition');
                        outgoingLayer.classList.remove('active-bg', 'base-layer', 'top-layer');
                        void outgoingLayer.offsetHeight;
                        outgoingLayer.classList.remove('no-transition');

                        isTransitioning = false;
                    }, 920);
                });
            });
        });
    }

    function startAutoRotation() {
        if (autoRotateTimer) clearInterval(autoRotateTimer);
        autoRotateTimer = setInterval(() => {
            if (!document.hidden) {
                transitionToNext();
            }
        }, 8000);
    }

    startAutoRotation();

    const bgBtn = document.getElementById('bg-toggle-btn');
    if (bgBtn) {
        bgBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            if (cleanupTimer) {
                clearTimeout(cleanupTimer);
                cleanupTimer = null;
            }
            isTransitioning = false;

            const nextPreviewNum = ((currentIdx + 1) % bgImages.length) + 1;
            transitionToNext();
            startAutoRotation();

            bgBtn.classList.add('is-switching-bg');
            setTimeout(() => bgBtn.classList.remove('is-switching-bg'), 450);

            if (typeof window.playAudioBlip === 'function') window.playAudioBlip(880, 0.035);
            if (typeof window.showToast === 'function') {
                window.showToast(`[WALLPAPER] Switched backdrop (${nextPreviewNum}/${bgImages.length})`);
            }
        });
    }
}

// --- 18. Operations Search & Category Filter Engine --- //
function initOpsFilter() {
    const filterBtns = document.querySelectorAll('.ops-tag-btn');
    const searchInput = document.getElementById('ops-search-input');
    const projectCards = document.querySelectorAll('.project-card');
    const simRows = document.querySelectorAll('.sim-row');
    const countNum = document.getElementById('ops-count-num');

    let currentFilter = 'all';
    let currentSearch = '';

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.getAttribute('data-filter') || 'all';
            applyOpsFiltering();
        });
    });

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentSearch = e.target.value.toLowerCase().trim();
            applyOpsFiltering();
        });
    }

    function applyOpsFiltering() {
        let visibleCount = 0;
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category') || 'all';
            const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
            const desc = card.querySelector('p')?.textContent.toLowerCase() || '';
            const tech = card.querySelector('.project-tech')?.textContent.toLowerCase() || '';

            const matchesCategory = (currentFilter === 'all' || category === currentFilter);
            const matchesSearch = !currentSearch || (title.includes(currentSearch) || desc.includes(currentSearch) || tech.includes(currentSearch));

            if (matchesCategory && matchesSearch) {
                card.classList.remove('hidden', 'filter-enter', 'is-card-visible');
                card.style.display = '';
                card.style.setProperty('--card-reveal-delay', `${(visibleCount % 3) * 50}ms`);
                void card.offsetWidth;
                card.classList.add('filter-enter', 'is-card-visible');
                visibleCount++;
            } else {
                card.classList.remove('filter-enter', 'is-card-visible');
                card.style.display = 'none';
                card.classList.add('hidden');
            }
        });

        if (countNum) {
            countNum.textContent = String(visibleCount);
        }

        let simIdx = 0;
        simRows.forEach(row => {
            const text = row.textContent.toLowerCase();
            const matchesQuery = !currentSearch || text.includes(currentSearch);

            if (matchesQuery) {
                row.classList.remove('hidden', 'filter-enter', 'is-card-visible');
                row.style.display = '';
                row.style.setProperty('--card-reveal-delay', `${(simIdx % 3) * 45}ms`);
                simIdx++;
                void row.offsetWidth;
                row.classList.add('filter-enter', 'is-card-visible');
            } else {
                row.classList.remove('filter-enter', 'is-card-visible');
                row.style.display = 'none';
                row.classList.add('hidden');
            }
        });
    }
}

// --- 19. Unified Certificate & PDF Credential Lightbox Engine --- //
function initCertificateLightbox() {
    const modal = document.getElementById('cert-lightbox-modal');
    const modalImg = document.getElementById('lightbox-img');
    const modalPdf = document.getElementById('lightbox-pdf');
    const modalTitle = document.getElementById('lightbox-title');
    const externalLink = document.getElementById('lightbox-external-link');
    const closeBtn = document.getElementById('lightbox-close-btn');

    if (!modal || !modalImg) return;

    window.openCredentialPreview = function(src, title) {
        if (!src) return;
        const isPdf = src.toLowerCase().endsWith('.pdf');

        if (modalTitle) {
            modalTitle.innerHTML = `<i class="fa-solid fa-certificate"></i> [${(title || 'CREDENTIAL_NODE').toUpperCase()}]`;
        }
        if (externalLink) {
            externalLink.setAttribute('href', src);
            externalLink.style.display = 'inline-flex';
        }

        if (isPdf && modalPdf) {
            modalImg.classList.add('hidden');
            modalImg.src = '';
            modalPdf.classList.remove('hidden');
            modalPdf.src = src;
        } else {
            if (modalPdf) {
                modalPdf.classList.add('hidden');
                modalPdf.src = '';
            }
            modalImg.classList.remove('hidden');
            modalImg.src = src;
        }

        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
    };

    function closeLightbox() {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        setTimeout(() => {
            modalImg.src = '';
            if (modalPdf) modalPdf.src = '';
        }, 300);
    }

    // Attach click listeners to image certificate links
    const certCards = document.querySelectorAll('.cert-card');
    certCards.forEach(card => {
        const link = card.querySelector('a');
        if (link) {
            const href = link.getAttribute('href');
            if (href && (href.endsWith('.png') || href.endsWith('.jpg') || href.endsWith('.webp'))) {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const titleText = card.querySelector('h4')?.textContent || 'CREDENTIAL_NODE';
                    window.openCredentialPreview(href, titleText);
                });
            }
        }
    });

    // Also attach to visual feed avatar image
    const cyberImg = document.querySelector('.visual-feed-card .cyber-img');
    if (cyberImg) {
        cyberImg.addEventListener('click', () => {
            window.openCredentialPreview(cyberImg.getAttribute('src'), 'TACTICAL_VISUAL_FEED // GIRIDHARAN K');
        });
    }

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeLightbox();
        }
    });
}

// --- 20. Direct Certificate & Simulation Card Preview Handler --- //
function initPdfViewerModal() {
    const certCards = document.querySelectorAll('.cert-card, .sim-row');

    certCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Allow natural browser navigation if the user clicked directly on the VERIFY_CREDENTIAL <a> element
            if (e.target.closest('a') || e.target.closest('button')) return;

            const link = card.querySelector('a[href$=".pdf"], a[href$=".png"], a.cert-link, .sim-action a');
            if (link) {
                const href = link.getAttribute('href');
                const titleText = card.querySelector('h4')?.textContent || 'VERIFIED_CREDENTIAL';
                if (href && typeof window.openCredentialPreview === 'function') {
                    window.openCredentialPreview(href, titleText);
                    if (window.playAudioBlip) window.playAudioBlip();
                }
            }
        });
    });
}

// --- 22. Top Neon Scroll Progress Bar Engine --- //
function initScrollProgressBar() {
    const progressBar = document.getElementById('hud-scroll-progress');
    if (!progressBar) return;

    let ticking = false;

    function updateProgress() {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
        progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateProgress);
            ticking = true;
        }
    }, { passive: true });

    updateProgress();
}

// --- 25. macOS Fluid Magnetic Dock Proximity Magnification (Cached-Center + Delta-Time Smooth) --- //
function initFluidDockMagnification() {
    const dock = document.querySelector('.mac-dock');
    if (!dock) return;

    const items = Array.from(dock.querySelectorAll('.dock-item'));
    let mouseX = null;
    let animId = null;
    let lastTime = 0;

    const itemStates = items.map(item => ({
        el: item,
        centerX: 0,
        currentScale: 1,
        targetScale: 1,
        currentY: 0,
        targetY: 0
    }));

    function cacheItemCenters() {
        itemStates.forEach(state => {
            const rect = state.el.getBoundingClientRect();
            state.centerX = rect.left + rect.width / 2;
        });
    }

    window.addEventListener('resize', cacheItemCenters, { passive: true });

    function updateDockPhysics(now) {
        const dt = lastTime ? Math.min((now - lastTime) / 1000, 0.05) : (1 / 60);
        lastTime = now;
        const alpha = 1 - Math.exp(-18 * dt);
        let active = false;

        itemStates.forEach(state => {
            if (mouseX !== null && state.centerX > 0) {
                const distance = Math.abs(mouseX - state.centerX);
                const maxDistance = 150;

                if (distance < maxDistance) {
                    const power = Math.cos((distance / maxDistance) * (Math.PI / 2));
                    state.targetScale = 1 + power * 0.36;
                    state.targetY = -power * 11;
                } else {
                    state.targetScale = 1;
                    state.targetY = 0;
                }
            } else {
                state.targetScale = 1;
                state.targetY = 0;
            }

            state.currentScale += (state.targetScale - state.currentScale) * alpha;
            state.currentY += (state.targetY - state.currentY) * alpha;

            if (Math.abs(state.currentScale - state.targetScale) > 0.001 || Math.abs(state.currentY - state.targetY) > 0.01) {
                active = true;
            }

            state.el.style.setProperty(
                'transform',
                `translate3d(0, ${state.currentY.toFixed(2)}px, 0) scale(${state.currentScale.toFixed(3)})`,
                'important'
            );
        });

        if (active || mouseX !== null) {
            animId = requestAnimationFrame(updateDockPhysics);
        } else {
            itemStates.forEach(state => state.el.style.removeProperty('transform'));
            dock.classList.remove('is-dock-active');
            animId = null;
            lastTime = 0;
        }
    }

    dock.addEventListener('pointerenter', (e) => {
        if (e.pointerType === 'touch') return;
        dock.classList.add('is-dock-active');
        cacheItemCenters();
        mouseX = e.clientX;
        if (!animId) {
            lastTime = 0;
            animId = requestAnimationFrame(updateDockPhysics);
        }
    }, { passive: true });

    dock.addEventListener('pointermove', (e) => {
        if (e.pointerType === 'touch') return;
        dock.classList.add('is-dock-active');
        mouseX = e.clientX;
        if (!animId) {
            lastTime = 0;
            animId = requestAnimationFrame(updateDockPhysics);
        }
    }, { passive: true });

    dock.addEventListener('pointerleave', () => {
        mouseX = null;
        if (!animId) {
            lastTime = 0;
            animId = requestAnimationFrame(updateDockPhysics);
        }
    }, { passive: true });
}

// --- 26. 120Hz+ Zero-Latency Centered Cyber HUD Custom Cursor Engine --- //
function initCustomCursor() {
    const dot = document.getElementById('cyber-cursor-dot');
    const ring = document.getElementById('cyber-cursor-ring');
    if (!dot || !ring) return;

    const hasFinePointer = window.matchMedia && window.matchMedia('(pointer: fine)').matches;
    if (!hasFinePointer && ('ontouchstart' in window)) return;

    document.body.classList.add('has-custom-cursor');

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    let ringScale = 1;
    let targetRingScale = 1;
    let dotScale = 1;
    let targetDotScale = 1;

    let isHoveringAction = false;
    let isHoveringCard = false;
    let isClicking = false;
    let isVisible = false;
    let animId = null;
    let lastTime = 0;

    function computeTargetScales() {
        if (isClicking) {
            targetRingScale = 0.76;
            targetDotScale = 1.25;
        } else if (isHoveringAction) {
            targetRingScale = 1.5;
            targetDotScale = 0.75;
        } else if (isHoveringCard) {
            targetRingScale = 1.65;
            targetDotScale = 1.3;
        } else {
            targetRingScale = 1;
            targetDotScale = 1;
        }
    }

    function ensureLoopRunning() {
        if (!animId && isVisible) {
            lastTime = 0;
            animId = requestAnimationFrame(renderCursorLoop);
        }
    }

    function renderCursorLoop(now) {
        if (!isVisible) {
            animId = null;
            lastTime = 0;
            return;
        }

        const dt = lastTime ? Math.min((now - lastTime) / 1000, 0.05) : (1 / 120);
        lastTime = now;

        // Frame-rate independent exponential smoothing (22 rad/s position, 20 rad/s scale)
        const posAlpha = 1 - Math.exp(-22 * dt);
        const scaleAlpha = 1 - Math.exp(-20 * dt);

        ringX += (mouseX - ringX) * posAlpha;
        ringY += (mouseY - ringY) * posAlpha;
        ringScale += (targetRingScale - ringScale) * scaleAlpha;
        dotScale += (targetDotScale - dotScale) * scaleAlpha;

        dot.style.transform = `translate3d(${mouseX.toFixed(2)}px, ${mouseY.toFixed(2)}px, 0) scale(${dotScale.toFixed(3)})`;
        ring.style.transform = `translate3d(${ringX.toFixed(2)}px, ${ringY.toFixed(2)}px, 0) scale(${ringScale.toFixed(3)})`;

        const distRemaining = Math.hypot(mouseX - ringX, mouseY - ringY);
        const scaleRemaining = Math.abs(targetRingScale - ringScale) + Math.abs(targetDotScale - dotScale);

        if (distRemaining > 0.04 || scaleRemaining > 0.003) {
            animId = requestAnimationFrame(renderCursorLoop);
        } else {
            ringX = mouseX;
            ringY = mouseY;
            ringScale = targetRingScale;
            dotScale = targetDotScale;
            dot.style.transform = `translate3d(${mouseX.toFixed(2)}px, ${mouseY.toFixed(2)}px, 0) scale(${dotScale.toFixed(3)})`;
            ring.style.transform = `translate3d(${ringX.toFixed(2)}px, ${ringY.toFixed(2)}px, 0) scale(${ringScale.toFixed(3)})`;
            animId = null;
            lastTime = 0;
        }
    }

    window.addEventListener('pointermove', (e) => {
        if (e.pointerType === 'touch') return;

        if (!document.body.classList.contains('has-custom-cursor')) {
            document.body.classList.add('has-custom-cursor');
        }

        mouseX = e.clientX;
        mouseY = e.clientY;

        if (!isVisible) {
            isVisible = true;
            ringX = mouseX;
            ringY = mouseY;
            dot.classList.add('is-active');
            ring.classList.add('is-active');
        }

        // Instant zero-latency hardware update for the precision core dot
        dot.style.transform = `translate3d(${mouseX.toFixed(2)}px, ${mouseY.toFixed(2)}px, 0) scale(${dotScale.toFixed(3)})`;
        ensureLoopRunning();
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
        isVisible = false;
        dot.classList.remove('is-active');
        ring.classList.remove('is-active');
    }, { passive: true });

    document.addEventListener('mouseenter', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        isVisible = true;
        dot.classList.add('is-active');
        ring.classList.add('is-active');
        ensureLoopRunning();
    }, { passive: true });

    // Interactive Target & Card Hover Custom Cursor Feedback Engine
    const cardSelector = '.cyber-card, .cert-card, .project-card, .sim-row, .thm-stat-box, .thm-badge-pill, .skill-card, .terminal-card, .visual-feed-card, .hero-card, .timeline-item, .contact-method-item, .hud-stat-box, .hud-telemetry-item, .ops-card, .threat-item';
    const actionSelector = 'a, button, input, textarea, select, .btn, .dock-item, .ops-tag-btn, .arsenal-filter-btn, .cert-filter-btn, .skill-pill-card, .copy-badge, .hud-tab-btn, .tab-btn, .hud-tracker-toggle, .tracker-dot, .tracker-menu-item';

    document.addEventListener('mouseover', (e) => {
        const actionTarget = e.target.closest(actionSelector);
        const cardTarget = e.target.closest(cardSelector);

        isHoveringAction = Boolean(actionTarget);
        isHoveringCard = !isHoveringAction && Boolean(cardTarget);

        dot.classList.toggle('is-hovering', isHoveringAction);
        ring.classList.toggle('is-hovering', isHoveringAction);
        dot.classList.toggle('is-card-hover', isHoveringCard);
        ring.classList.toggle('is-card-hover', isHoveringCard);

        computeTargetScales();
        ensureLoopRunning();
    }, { passive: true });

    document.addEventListener('mouseout', (e) => {
        const related = e.relatedTarget;
        if (!related) {
            isHoveringAction = false;
            isHoveringCard = false;
            dot.classList.remove('is-hovering', 'is-card-hover');
            ring.classList.remove('is-hovering', 'is-card-hover');
            computeTargetScales();
            ensureLoopRunning();
        }
    }, { passive: true });

    // Tactile Click Feedback
    window.addEventListener('pointerdown', (e) => {
        if (e.pointerType === 'touch') return;
        isClicking = true;
        ring.classList.add('is-clicking');
        computeTargetScales();
        ensureLoopRunning();
    }, { passive: true });

    window.addEventListener('pointerup', () => {
        isClicking = false;
        ring.classList.remove('is-clicking');
        computeTargetScales();
        ensureLoopRunning();
    }, { passive: true });
}


// =========================================================================
// 27. Konami Code ("Red Team Exploit Mode" Secret Override)
// =========================================================================
function initKonamiCode() {
    const konamiSequence = [
        'ArrowUp', 'ArrowUp',
        'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight',
        'ArrowLeft', 'ArrowRight',
        'b', 'a'
    ];
    let currentIndex = 0;

    window.toggleRedTeamMode = function() {
        const isRed = document.body.classList.toggle('redteam-override');

        if (isRed) {
            if (typeof window.playAudioWarning === 'function') window.playAudioWarning();
            if (typeof window.showToast === 'function') {
                window.showToast('[RED TEAM OVERRIDE] Offensive toolchains & crimson theme engaged.');
            }
        } else {
            if (typeof window.playAudioSuccess === 'function') window.playAudioSuccess();
            if (typeof window.showToast === 'function') {
                window.showToast('[BLUE TEAM RESTORED] Defensive sentinel protocol online.');
            }
        }
    };

    document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

        const expectedKey = konamiSequence[currentIndex];
        if (e.key.toLowerCase() === expectedKey.toLowerCase()) {
            currentIndex++;
            if (currentIndex === konamiSequence.length) {
                currentIndex = 0;
                window.toggleRedTeamMode();
            }
        } else {
            currentIndex = 0;
        }
    });
}

// =========================================================================
// 28. Unified 60fps Bidirectional Card Reveal & Cursor-Tracked Spotlight
// =========================================================================
function initCardSmoothAnimations() {
    const cardSelector = [
        '.hero-card',
        '.visual-feed-card',
        '.terminal-card',
        '.arsenal-grid .skill-card',
        '.projects-container .project-card',
        '.simulations-container .sim-row',
        '.github-telemetry-card',
        '.telemetry-box',
        '.timeline-item',
        '.certs-grid .cert-card',
        '.thm-stat-box',
        '.thm-badge-pill',
        '.contact-info-card',
        '.contact-form-card',
        '.contact-method-item'
    ].join(', ');

    const allCards = Array.from(document.querySelectorAll(cardSelector));
    if (!allCards.length) return;

    // Assign column-aware stagger indices per parent container
    const parentGroups = new Map();
    allCards.forEach(card => {
        card.classList.add('card-reveal-item');
        const parent = card.parentElement;
        if (!parentGroups.has(parent)) {
            parentGroups.set(parent, []);
        }
        const siblings = parentGroups.get(parent);
        const colCycle = parent.classList.contains('github-telemetry-grid') ? 4
            : (parent.classList.contains('arsenal-grid') || parent.classList.contains('certs-grid')) ? 3
            : 2;
        const staggerIdx = siblings.length % colCycle;
        card.dataset.staggerDelay = String(staggerIdx * 55);
        siblings.push(card);
    });

    // 1. Bidirectional IntersectionObserver (Replays smoothly scrolling down & up)
    if ('IntersectionObserver' in window) {
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const card = entry.target;
                if (entry.isIntersecting) {
                    const delayMs = card.dataset.staggerDelay || '0';
                    card.style.setProperty('--card-reveal-delay', `${delayMs}ms`);
                    card.classList.add('is-card-visible');

                    // Clear delay after entrance finishes so hover elevation has zero lag
                    if (card._revealTimer) clearTimeout(card._revealTimer);
                    card._revealTimer = setTimeout(() => {
                        card.style.setProperty('--card-reveal-delay', '0ms');
                    }, 560 + Number(delayMs));
                } else {
                    if (card._revealTimer) clearTimeout(card._revealTimer);
                    card.style.setProperty('--card-reveal-delay', '0ms');
                    card.classList.remove('is-card-visible');
                }
            });
        }, {
            threshold: 0.06,
            rootMargin: '20px 0px -20px 0px'
        });

        allCards.forEach(card => cardObserver.observe(card));
    } else {
        allCards.forEach(card => card.classList.add('is-card-visible'));
    }

    // 2. 60fps rAF-Throttled Cursor-Tracked Surface & Border Spotlight
    const hasFinePointer = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!hasFinePointer) return;

    const spotlightSelector = `${cardSelector}, .skill-pill-card`;
    let pendingEvent = null;
    let rafId = null;

    function updateCardSpotlight() {
        rafId = null;
        if (!pendingEvent) return;

        const e = pendingEvent;
        pendingEvent = null;

        const targetCard = e.target.closest(spotlightSelector);
        if (!targetCard) return;

        const rect = targetCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        targetCard.style.setProperty('--mouse-x', `${x.toFixed(1)}px`);
        targetCard.style.setProperty('--mouse-y', `${y.toFixed(1)}px`);

        // If hovering a nested pill inside a parent .cyber-card, update parent spotlight too
        const parentCard = targetCard.parentElement?.closest('.cyber-card');
        if (parentCard && parentCard !== targetCard) {
            const pRect = parentCard.getBoundingClientRect();
            parentCard.style.setProperty('--mouse-x', `${(e.clientX - pRect.left).toFixed(1)}px`);
            parentCard.style.setProperty('--mouse-y', `${(e.clientY - pRect.top).toFixed(1)}px`);
        }
    }

    document.addEventListener('pointermove', (e) => {
        if (e.pointerType === 'touch') return;
        pendingEvent = e;
        if (!rafId) {
            rafId = requestAnimationFrame(updateCardSpotlight);
        }
    }, { passive: true });
}

