// --- Cyber Sentinel Script --- //

document.addEventListener('DOMContentLoaded', () => {
    // 1. Matrix Background Effect
    initMatrixRain();

    // 2. HUD Section Navigation (SPA Toggles)
    initNavigation();

    // 4. Operations Tab Switching
    initOperationsTabs();

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

    // 16. Dynamic Background Image Rotation Engine (5s interval)
    initBackgroundRotation();

    // 17. Real-Time FPS Diagnostics
    initFpsCounter();

    // 18. Operations Search & Category Filter Engine
    initOpsFilter();

    // 19. Certificate & Visual Feed Lightbox Engine
    initCertificateLightbox();

    // 20. Direct Certificate PDF Link Handler
    initPdfViewerModal();

    // 21. Futuristic Staggered Cascade Scroll-Reveals
    initStaggeredCascadeReveals();

    // 22. Top Neon Scroll Progress Bar Engine
    initScrollProgressBar();

    // 23. 3D Interactive Card Tilt & Cursor Spotlight Engine
    init3DCardTilt();

    // 24. Click-Triggered Liquid Ripple Waves Engine
    initLiquidRippleEffect();

    // 25. macOS Fluid Magnetic Dock Proximity Magnification
    initFluidDockMagnification();

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
            
            if (isDarkMode) {
                ctx.fillStyle = Math.random() > 0.85 ? '#80ffb0' : '#00ff41';
            } else {
                ctx.fillStyle = Math.random() > 0.85 ? '#005ecb' : '#0d8a43';
            }
            
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }

            drops[i]++;
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

// --- Navigation Engine --- //
function initNavigation() {
    const navItems = document.querySelectorAll('.dock-item[href]');
    const sections = document.querySelectorAll('.hud-section');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const href = item.getAttribute('href');
            if (!href || !href.startsWith('#')) return;
            
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);

            // Update active state in nav
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            if (targetSection) {
                sections.forEach(section => {
                    if (section !== targetSection) {
                        section.classList.remove('active-section');
                        section.querySelectorAll('.cyber-card, .cert-card, .project-card, .sim-row, .hud-cascade-item').forEach(el => {
                            el.classList.remove('revealed');
                        });
                    }
                });

                targetSection.classList.add('active-section');

                // Trigger staggered cascade reveal wave for newly activated section
                requestAnimationFrame(() => {
                    targetSection.querySelectorAll('.hud-cascade-item, .cyber-card, .skill-card, .cert-card, .project-card, .sim-row, .thm-stat-box').forEach((el, idx) => {
                        el.style.setProperty('--cascade-index', idx % 10);
                        el.classList.add('revealed');
                    });
                });

                // Smooth scroll into view
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }

            setTimeout(() => {
                if (window.refreshCascadeReveals) window.refreshCascadeReveals();
            }, 60);
        });
    });

    // Dynamic Dock Highlight on Scroll
    if ('IntersectionObserver' in window && sections.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navItems.forEach(item => {
                        item.classList.toggle('active', item.getAttribute('href') === `#${id}`);
                    });
                }
            });
        }, { threshold: 0.25 });

        sections.forEach(section => observer.observe(section));
    }
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
                    requestAnimationFrame(() => {
                        content.querySelectorAll('.project-card, .sim-row, .hud-cascade-item').forEach((el, idx) => {
                            el.style.setProperty('--cascade-index', idx % 8);
                            el.classList.add('revealed');
                        });
                    });
                }
            });

            if (window.refreshCascadeReveals) window.refreshCascadeReveals();
        });
    });
}

function initCertFilters() {
    const btns = document.querySelectorAll('.cert-filter-btn');
    const cards = document.querySelectorAll('.certs-grid .cert-card');
    if (!btns.length || !cards.length) return;

    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');

            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            cards.forEach(card => {
                const tags = card.getAttribute('data-tags') || '';
                const matches = filter === 'all' || tags.includes(filter);

                if (matches) {
                    card.classList.remove('is-leaving', 'hidden');
                    card.style.display = '';
                    requestAnimationFrame(() => {
                        card.classList.add('revealed');
                    });
                } else {
                    card.classList.add('is-leaving');
                    setTimeout(() => {
                        if (card.classList.contains('is-leaving')) {
                            card.style.display = 'none';
                            card.classList.add('hidden');
                            card.classList.remove('revealed', 'is-leaving');
                        }
                    }, 220);
                }
            });

            if (window.refreshCascadeReveals) window.refreshCascadeReveals();
        });
    });
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
    if (!themeBtn) return;

    // Check localStorage preference (default to dark if not set)
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || !savedTheme) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('dark-mode');
    }

    // Toggle click event
    themeBtn.addEventListener('click', () => {
        const isDark = document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}

// --- Tactical Control Panel Tabs & Shell Engine --- //
function initTacticalTabs() {
    const tabBtns = document.querySelectorAll('.hud-tab-btn');
    const tabContents = document.querySelectorAll('.hud-tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');
            
            // Set active button
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

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
    
    // Append initial logs immediately
    for (let i = 0; i < 6; i++) {
        appendLog();
    }

    // Interval to append new logs periodically
    setInterval(() => {
        appendLog();
    }, 1800);

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
                printLine("  <span style='color: var(--cyber-cyan);'>whoami</span>   - Prints bio and sentinel profile trace.");
                printLine("  <span style='color: var(--cyber-cyan);'>skills</span>   - Prints visual ASCII stack chart.");
                printLine("  <span style='color: var(--cyber-cyan);'>contact</span>  - Establishes connection bridge comms.");
                printLine("  <span style='color: var(--cyber-cyan);'>ip</span>       - Queries client node public IP.");
                printLine("  <span style='color: var(--cyber-cyan);'>clear</span>    - Clears CLI terminal output.");
                printLine("  <span style='color: var(--cyber-cyan);'>help</span>     - Prints this assistance matrix.");
                break;
            case 'clear':
                cliOutput.innerHTML = '';
                break;
            case 'whoami':
                printLine("IDENTITY TRACE //");
                printLine("  Name: GIRIDHARAN K");
                printLine("  Title: Front-End Developer & Web Security Specialist");
                printLine("  Specialization: React.js, Web Application Security, Threat Hunting");
                printLine("  Node Status: VERIFIED_SECURE");
                break;
            case 'skills':
                printLine("CAPABILITY METRICS [ASCII_RENDER] //");
                printLine("  React.js   [████████████████░░] 85%");
                printLine("  JavaScript [████████████████░░] 80%");
                printLine("  HTML/CSS   [██████████████████] 90%");
                printLine("  Python     [████████████████░░] 80%");
                printLine("  Security   [████████████████░░] 82%");
                break;
            case 'ip':
                const ipVal = document.getElementById('user-ip') ? document.getElementById('user-ip').textContent : '127.0.0.1';
                printLine(`CLIENT_NODE_IP: <span style='color: var(--cyber-orange);'>${ipVal}</span>`);
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

    // Attach copy event to emails & phone links
    const copyableLinks = document.querySelectorAll('a[href^="mailto:"], a[href^="tel:"], .contact-val');
    copyableLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const rawText = link.textContent.trim();
            if (rawText) {
                navigator.clipboard.writeText(rawText).then(() => {
                    showToast(`[COPIED] ${rawText} saved to clipboard!`);
                }).catch(() => {});
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

    if (!modal) return;

    // Attach click listeners to project cards
    const projectCards = document.querySelectorAll('.project-card, .sim-row');
    projectCards.forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', (e) => {
            // Ignore click if clicking direct link button inside card
            if (e.target.closest('a') || e.target.closest('button')) return;

            const cardTitle = card.querySelector('h3, h4')?.textContent || 'TACTICAL_MODULE';
            const cardDesc = card.querySelector('p')?.textContent || 'Detailed system specification and architectural documentation module.';
            
            if (heading) heading.textContent = cardTitle;
            if (desc) desc.textContent = cardDesc;
            
            if (tagsWrapper) {
                tagsWrapper.innerHTML = `
                    <span class="cyber-badge font-mono" style="font-size: 0.7rem;">FEATURED_MODULE</span>
                    <span class="cyber-badge font-mono" style="font-size: 0.7rem; border-color: var(--cyber-cyan); color: var(--cyber-cyan);">OWASP_AUDITED</span>
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
    const statVals = document.querySelectorAll('.thm-stat-val, .hud-stat-box .stat-val');
    let animated = false;

    function animateCounters() {
        if (animated) return;
        animated = true;

        statVals.forEach(el => {
            const text = el.textContent.trim();
            const match = text.match(/^(\d+)(.*)$/);
            if (match) {
                const target = parseInt(match[1], 10);
                const suffix = match[2] || '';
                let current = 0;
                const increment = Math.max(1, Math.floor(target / 30));
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    el.textContent = current + suffix;
                }, 35);
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

// --- 16. Dynamic Background Image Rotation & Cinematic Crossfade Engine --- //
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

    let currentIdx = 0;
    let activeLayer = 1;
    let isPaused = false;
    let intervalTimer = null;

    if (layer1) layer1.style.backgroundImage = `linear-gradient(var(--bg-wash), var(--bg-wash)), url("${bgImages[0]}")`;
    if (layer2) layer2.style.backgroundImage = `linear-gradient(var(--bg-wash), var(--bg-wash)), url("${bgImages[1]}")`;

    // Preload only the initial 2 background images into memory
    [bgImages[0], bgImages[1]].forEach(src => {
        const img = new Image();
        img.src = src;
    });

    function transitionToNext() {
        if (isPaused || !layer1 || !layer2) return;
        
        currentIdx = (currentIdx + 1) % bgImages.length;
        const nextUpcomingIdx = (currentIdx + 1) % bgImages.length;

        // Preload next upcoming image right before layer update
        const preloadImg = new Image();
        preloadImg.src = bgImages[nextUpcomingIdx];

        if (activeLayer === 1) {
            layer2.style.backgroundImage = `linear-gradient(var(--bg-wash), var(--bg-wash)), url("${bgImages[currentIdx]}")`;
            layer2.classList.add('active-bg');
            layer1.classList.remove('active-bg');
            activeLayer = 2;
        } else {
            layer1.style.backgroundImage = `linear-gradient(var(--bg-wash), var(--bg-wash)), url("${bgImages[currentIdx]}")`;
            layer1.classList.add('active-bg');
            layer2.classList.remove('active-bg');
            activeLayer = 1;
        }
    }

    intervalTimer = setInterval(transitionToNext, 6000);

    const bgBtn = document.getElementById('bg-toggle-btn');
    const bgIcon = document.getElementById('bg-btn-icon');
    const bgText = document.getElementById('bg-btn-text');

    if (bgBtn) {
        bgBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            isPaused = !isPaused;
            if (isPaused) {
                bgBtn.classList.add('bg-paused');
                if (bgIcon) bgIcon.className = 'fa-solid fa-play';
                if (bgText) bgText.textContent = 'BG_PAUSED';
                if (window.showToast) window.showToast('[BACKGROUND] Rotation paused');
            } else {
                bgBtn.classList.remove('bg-paused');
                if (bgIcon) bgIcon.className = 'fa-solid fa-pause';
                if (bgText) bgText.textContent = 'BG_ROTATE';
                if (window.showToast) window.showToast('[BACKGROUND] Rotation active');
            }
        });
    }
}

// --- 17. Real-Time FPS Diagnostics --- //
function initFpsCounter() {
    const fpsEl = document.getElementById('fps-counter');
    if (!fpsEl) return;

    let frameCount = 0;
    let lastTime = performance.now();

    function fpsLoop(now) {
        frameCount++;
        if (now - lastTime >= 1000) {
            const currentFps = Math.round((frameCount * 1000) / (now - lastTime));
            fpsEl.innerHTML = `<i class="fa-solid fa-bolt text-orange"></i> ${currentFps} FPS`;
            frameCount = 0;
            lastTime = now;
        }
        requestAnimationFrame(fpsLoop);
    }

    requestAnimationFrame(fpsLoop);
}

// --- 18. Operations Search & Category Filter Engine --- //
function initOpsFilter() {
    const filterBtns = document.querySelectorAll('.ops-tag-btn');
    const searchInput = document.getElementById('ops-search-input');
    const projectCards = document.querySelectorAll('.project-card');
    const simRows = document.querySelectorAll('.sim-row');

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
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category') || 'all';
            const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
            const desc = card.querySelector('p')?.textContent.toLowerCase() || '';
            const tech = card.querySelector('.project-tech')?.textContent.toLowerCase() || '';

            const matchesCategory = (currentFilter === 'all' || category === currentFilter);
            const matchesSearch = !currentSearch || (title.includes(currentSearch) || desc.includes(currentSearch) || tech.includes(currentSearch));

            if (matchesCategory && matchesSearch) {
                card.classList.remove('is-leaving', 'hidden');
                card.style.display = '';
                requestAnimationFrame(() => {
                    card.classList.add('revealed');
                });
            } else {
                card.classList.add('is-leaving');
                setTimeout(() => {
                    if (card.classList.contains('is-leaving')) {
                        card.style.display = 'none';
                        card.classList.add('hidden');
                        card.classList.remove('revealed', 'is-leaving');
                    }
                }, 220);
            }
        });

        // Filter Simulation Rows
        simRows.forEach(row => {
            const text = row.textContent.toLowerCase();
            const matchesQuery = !currentSearch || text.includes(currentSearch);
            if (matchesQuery) {
                row.classList.remove('is-leaving', 'hidden');
                row.style.display = '';
                requestAnimationFrame(() => {
                    row.classList.add('revealed');
                });
            } else {
                row.classList.add('is-leaving');
                setTimeout(() => {
                    if (row.classList.contains('is-leaving')) {
                        row.style.display = 'none';
                        row.classList.add('hidden');
                        row.classList.remove('revealed', 'is-leaving');
                    }
                }, 220);
            }
        });
    }
}

// --- 19. Certificate & Visual Feed Lightbox Engine --- //
function initCertificateLightbox() {
    const modal = document.getElementById('cert-lightbox-modal');
    const modalImg = document.getElementById('lightbox-img');
    const modalTitle = document.getElementById('lightbox-title');
    const closeBtn = document.getElementById('lightbox-close-btn');

    if (!modal || !modalImg) return;

    // Attach click listeners to certification cards
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
                    openLightbox(href, titleText);
                });
            }
        }
    });

    // Also attach to visual feed avatar image
    const cyberImg = document.querySelector('.visual-feed-card .cyber-img');
    if (cyberImg) {
        cyberImg.style.cursor = 'pointer';
        cyberImg.addEventListener('click', () => {
            openLightbox(cyberImg.getAttribute('src'), 'TACTICAL_VISUAL_FEED // GIRIDHARAN K');
        });
    }

    function openLightbox(src, title) {
        modalImg.src = src;
        if (modalTitle) modalTitle.innerHTML = `<i class="fa-solid fa-certificate"></i> [${title.toUpperCase()}]`;
        modal.classList.add('active');
    }

    function closeLightbox() {
        modal.classList.remove('active');
        setTimeout(() => {
            modalImg.src = '';
        }, 300);
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

// --- 20. Direct Certificate PDF Link Handler --- //
function initPdfViewerModal() {
    // Enable full card clickability opening raw PDF directly in a new browser tab
    const certCards = document.querySelectorAll('.cert-card, .sim-row, .academic-timeline .timeline-item');

    certCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Allow natural browser navigation if the user clicked directly on an <a> element
            if (e.target.closest('a')) return;

            const link = card.querySelector('a[href$=".pdf"], a[href$=".png"], a.cert-link, .sim-action a');
            if (link) {
                const href = link.getAttribute('href');
                if (href) {
                    window.open(href, '_blank');
                    if (window.playAudioBlip) window.playAudioBlip();
                }
            }
        });
    });
}

// --- 21. Futuristic Staggered Cascade Scroll-Reveals Engine --- //
function initStaggeredCascadeReveals() {
    const containers = document.querySelectorAll('.arsenal-grid, .certs-grid, .skills-grid, .projects-grid, .sim-grid, .thm-grid, .academic-timeline, .contact-container');

    function applyCascadeIndices() {
        containers.forEach(container => {
            const children = Array.from(container.children).filter(child => !child.classList.contains('hidden'));
            children.forEach((child, idx) => {
                child.classList.add('hud-cascade-item');
                child.style.setProperty('--cascade-index', idx % 8);
            });
        });
    }

    applyCascadeIndices();

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, {
        threshold: 0.02,
        rootMargin: '100px 0px 100px 0px'
    });

    document.querySelectorAll('.hud-cascade-item').forEach(item => {
        observer.observe(item);
    });

    // Expose refresh function to re-calculate indices when filters or sections change
    window.refreshCascadeReveals = function () {
        applyCascadeIndices();
        document.querySelectorAll('.active-section .hud-cascade-item, .hud-cascade-item').forEach(item => {
            observer.observe(item);
            const rect = item.getBoundingClientRect();
            if (rect.top < window.innerHeight + 300 && rect.bottom > -300) {
                item.classList.add('revealed');
            }
        });
    };
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

// --- 23. 3D Interactive Card Tilt & Cursor Spotlight Engine (60fps Optimized) --- //
function init3DCardTilt() {
    // Disable heavy 3D calculations on touch/mobile devices to avoid lag
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    const cards = document.querySelectorAll('.cyber-card, .cert-card, .thm-badge-pill');

    cards.forEach(card => {
        let ticking = false;
        let mouseX = 0, mouseY = 0;

        card.addEventListener('mouseenter', () => {
            card.classList.add('is-tilting');
        });

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;

            if (!ticking) {
                requestAnimationFrame(() => {
                    card.style.setProperty('--mouse-x', `${mouseX}px`);
                    card.style.setProperty('--mouse-y', `${mouseY}px`);

                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const rotateX = -((mouseY - centerY) / centerY) * 6;
                    const rotateY = ((mouseX - centerX) / centerX) * 6;

                    card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
                    ticking = false;
                });
                ticking = true;
            }
        });

        card.addEventListener('mouseleave', () => {
            card.classList.remove('is-tilting');
            card.style.transform = 'none';
        });
    });
}



// --- 24. Click-Triggered Liquid Ripple Waves Engine --- //
function initLiquidRippleEffect() {
    const clickableTargets = document.querySelectorAll('.cyber-card, .btn, .dock-item, .cert-card, .thm-badge-pill, .hud-bg-btn');

    clickableTargets.forEach(target => {
        target.classList.add('cyber-ripple-container');

        target.addEventListener('click', (e) => {
            const rect = target.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const diameter = Math.max(rect.width, rect.height) * 1.5;

            const ripple = document.createElement('span');
            ripple.className = 'cyber-ripple';
            ripple.style.width = `${diameter}px`;
            ripple.style.height = `${diameter}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;

            target.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 650);
        });
    });
}
// --- 25. macOS Fluid Magnetic Dock Proximity Magnification --- //
function initFluidDockMagnification() {
    const dock = document.querySelector('.mac-dock');
    if (!dock) return;

    const items = dock.querySelectorAll('.dock-item');

    dock.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;

        items.forEach(item => {
            const itemRect = item.getBoundingClientRect();
            const itemCenterX = itemRect.left + itemRect.width / 2;
            const distance = Math.abs(mouseX - itemCenterX);
            const maxDistance = 140;

            if (distance < maxDistance) {
                const power = Math.cos((distance / maxDistance) * (Math.PI / 2));
                const scale = 1 + power * 0.35;
                const translateY = -power * 10;
                item.style.transform = `scale(${scale.toFixed(3)}) translateY(${translateY.toFixed(1)}px)`;
            } else {
                item.style.transform = 'scale(1) translateY(0px)';
            }
        });
    }, { passive: true });

    dock.addEventListener('mouseleave', () => {
        items.forEach(item => {
            item.style.transform = 'scale(1) translateY(0px)';
        });
    }, { passive: true });
}
