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
});

// --- Matrix Code Rain Effect --- //
function initMatrixRain() {
    const canvas = document.getElementById('cyberCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Resize canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Matrix characters (Binary & hex characters for cybersecurity theme)
    const chars = '0123456789ABCDEF<>[]{}$%@#&*_+-=';
    const charArr = chars.split('');
    
    const fontSize = 14;
    let columns = canvas.width / fontSize;
    
    // Drops - y coordinate for each column
    let drops = [];
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }

    // Window resize rebuilds column array
    window.addEventListener('resize', () => {
        columns = canvas.width / fontSize;
        drops = [];
        for (let x = 0; x < columns; x++) {
            drops[x] = 1;
        }
    });

    // Draw function
    function draw() {
        const isDarkMode = document.body.classList.contains('dark-mode');
        
        // Background clear-wash based on active theme
        ctx.fillStyle = isDarkMode ? 'rgba(10, 15, 10, 0.15)' : 'rgba(244, 247, 250, 0.15)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = fontSize + 'px "Fira Code", monospace';

        // Loop over drops
        for (let i = 0; i < drops.length; i++) {
            const text = charArr[Math.floor(Math.random() * charArr.length)];
            
            // Text color based on active theme
            if (isDarkMode) {
                // Neon green code rain in dark mode
                ctx.fillStyle = Math.random() > 0.85 ? '#80ffb0' : '#00ff41';
            } else {
                // Cobalt blue and emerald green code rain in light mode
                ctx.fillStyle = Math.random() > 0.85 ? '#005ecb' : '#0d8a43';
            }
            
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            // Sending drop back to top randomly after it has crossed screen
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }

            drops[i]++;
        }
    }

    setInterval(draw, 33);
}

// --- Navigation Engine --- //
function initNavigation() {
    const navItems = document.querySelectorAll('.dock-item[href]');
    const sections = document.querySelectorAll('.hud-section');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.getAttribute('href').substring(1);
            
            // Update active state in nav
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            // Switch sections with smooth fade
            sections.forEach(section => {
                section.classList.remove('active-section');
                if (section.id === targetId) {
                    section.classList.add('active-section');
                }
            });
            

        });
    });
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
                content.classList.remove('active-content');
                if (content.id === targetId) {
                    content.classList.add('active-section', 'active-content'); // force show
                }
            });
        });
    });
}

// --- Certificate Database Search & Filter --- //
function initCertFilters() {
    const searchInput = document.getElementById('cert-search');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('#certs-grid .cert-card');

    if (!searchInput) return;

    let activeFilter = 'all';
    let searchQuery = '';

    // Search Query Listener
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase().trim();
        applyFilters();
    });

    // Tag Filter Toggles
    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeFilter = btn.getAttribute('data-filter') || 'all';
            applyFilters();
        });
    });

    function applyFilters() {
        cards.forEach(card => {
            const cardTags = card.getAttribute('data-tags') || '';
            const h4El = card.querySelector('h4');
            const descEl = card.querySelector('.cert-desc');
            
            const cardTitle = h4El ? h4El.textContent.toLowerCase() : '';
            const cardDesc = descEl ? descEl.textContent.toLowerCase() : '';
            
            const matchFilter = (activeFilter === 'all' || cardTags.includes(activeFilter));
            const matchSearch = (cardTitle.includes(searchQuery) || cardDesc.includes(searchQuery));

            if (matchFilter && matchSearch) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }
}

// --- Local HUD Variables (Clock, IP Mock) --- //
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

