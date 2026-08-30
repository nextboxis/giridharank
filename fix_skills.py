import re

with open('j:/PROGRAM/protflio/index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the arsenal-grid content
new_arsenal = '''<div class="arsenal-grid">
                <!-- Skill Category: Frontend -->
                <div class="cyber-card glassmorphic skill-card">
                    <div class="card-header">
                        <span class="card-title font-mono"><i class="fa-brands fa-react text-cyan"></i> FRONTEND_DEVELOPMENT</span>
                    </div>
                    <div class="card-body skills-flex-grid">
                        <div class="skill-pill-card" title="React.js"><span class="skill-pill-icon text-cyan"><i class="fa-brands fa-react"></i></span><span class="skill-pill-name font-mono">React.js</span></div>
                        <div class="skill-pill-card" title="JavaScript (ES6+)"><span class="skill-pill-icon text-yellow"><i class="fa-brands fa-js"></i></span><span class="skill-pill-name font-mono">JavaScript (ES6+)</span></div>
                        <div class="skill-pill-card" title="HTML5 & CSS3"><span class="skill-pill-icon text-orange"><i class="fa-brands fa-html5"></i></span><span class="skill-pill-name font-mono">HTML5 & CSS3</span></div>
                        <div class="skill-pill-card" title="Responsive Design"><span class="skill-pill-icon text-purple"><i class="fa-solid fa-mobile-screen"></i></span><span class="skill-pill-name font-mono">Responsive Design</span></div>
                    </div>
                </div>

                <!-- Skill Category: Backend & Dev -->
                <div class="cyber-card glassmorphic skill-card">
                    <div class="card-header">
                        <span class="card-title font-mono"><i class="fa-solid fa-server text-green"></i> BACKEND_&_DEV</span>
                    </div>
                    <div class="card-body skills-flex-grid">
                        <div class="skill-pill-card" title="Python"><span class="skill-pill-icon text-green"><i class="fa-brands fa-python"></i></span><span class="skill-pill-name font-mono">Python</span></div>
                        <div class="skill-pill-card" title="Flask & REST APIs"><span class="skill-pill-icon text-green"><i class="fa-solid fa-pepper-hot"></i></span><span class="skill-pill-name font-mono">Flask & APIs</span></div>
                        <div class="skill-pill-card" title="MongoDB"><span class="skill-pill-icon text-green"><i class="fa-solid fa-database"></i></span><span class="skill-pill-name font-mono">MongoDB</span></div>
                        <div class="skill-pill-card" title="Linux CLI / Bash"><span class="skill-pill-icon text-green"><i class="fa-brands fa-linux"></i></span><span class="skill-pill-name font-mono">Linux CLI/Bash</span></div>
                    </div>
                </div>

                <!-- Skill Category: Cybersecurity Tools & OSINT -->
                <div class="cyber-card glassmorphic skill-card">
                    <div class="card-header">
                        <span class="card-title font-mono"><i class="fa-solid fa-user-ninja text-red"></i> CYBER_TOOLS_&_OSINT</span>
                    </div>
                    <div class="card-body skills-flex-grid">
                        <div class="skill-pill-card" title="Burp Suite"><span class="skill-pill-icon text-red"><i class="fa-solid fa-bug"></i></span><span class="skill-pill-name font-mono">Burp Suite</span></div>
                        <div class="skill-pill-card" title="Nmap / Masscan"><span class="skill-pill-icon text-red"><i class="fa-solid fa-network-wired"></i></span><span class="skill-pill-name font-mono">Nmap / Masscan</span></div>
                        <div class="skill-pill-card" title="Wireshark & PCAPs"><span class="skill-pill-icon text-red"><i class="fa-solid fa-magnifying-glass-chart"></i></span><span class="skill-pill-name font-mono">Wireshark/PCAPs</span></div>
                        <div class="skill-pill-card" title="Kali Linux"><span class="skill-pill-icon text-red"><i class="fa-brands fa-linux"></i></span><span class="skill-pill-name font-mono">Kali Linux</span></div>
                        <div class="skill-pill-card" title="Metasploit & OWASP ZAP"><span class="skill-pill-icon text-red"><i class="fa-solid fa-biohazard"></i></span><span class="skill-pill-name font-mono">Metasploit/ZAP</span></div>
                    </div>
                </div>

                <!-- Skill Category: Security Concepts & Exploitation -->
                <div class="cyber-card glassmorphic skill-card">
                    <div class="card-header">
                        <span class="card-title font-mono"><i class="fa-solid fa-shield-halved text-orange"></i> SEC_CONCEPTS_&_EXPLOITS</span>
                    </div>
                    <div class="card-body skills-flex-grid">
                        <div class="skill-pill-card" title="SQLi & Web Exploitation"><span class="skill-pill-icon text-orange"><i class="fa-solid fa-code"></i></span><span class="skill-pill-name font-mono">SQLi & Web Exp</span></div>
                        <div class="skill-pill-card" title="Active Directory Security"><span class="skill-pill-icon text-orange"><i class="fa-solid fa-sitemap"></i></span><span class="skill-pill-name font-mono">AD Security</span></div>
                        <div class="skill-pill-card" title="Buffer Overflow Principles"><span class="skill-pill-icon text-orange"><i class="fa-solid fa-memory"></i></span><span class="skill-pill-name font-mono">Buffer Overflow</span></div>
                        <div class="skill-pill-card" title="OWASP Top 10"><span class="skill-pill-icon text-orange"><i class="fa-solid fa-list-check"></i></span><span class="skill-pill-name font-mono">OWASP Top 10</span></div>
                        <div class="skill-pill-card" title="MITRE ATT&CK"><span class="skill-pill-icon text-orange"><i class="fa-solid fa-chess-knight"></i></span><span class="skill-pill-name font-mono">MITRE ATT&CK</span></div>
                        <div class="skill-pill-card" title="IAM & RBAC"><span class="skill-pill-icon text-orange"><i class="fa-solid fa-id-card"></i></span><span class="skill-pill-name font-mono">IAM & RBAC</span></div>
                        <div class="skill-pill-card" title="Incident Response & SET"><span class="skill-pill-icon text-orange"><i class="fa-solid fa-truck-fast"></i></span><span class="skill-pill-name font-mono">IR & SET</span></div>
                    </div>
                </div>

                <!-- Skill Category: Machine Learning -->
                <div class="cyber-card glassmorphic skill-card">
                    <div class="card-header">
                        <span class="card-title font-mono"><i class="fa-solid fa-brain text-purple"></i> MACHINE_LEARNING</span>
                    </div>
                    <div class="card-body skills-flex-grid">
                        <div class="skill-pill-card" title="scikit-learn"><span class="skill-pill-icon text-purple"><i class="fa-solid fa-robot"></i></span><span class="skill-pill-name font-mono">scikit-learn</span></div>
                        <div class="skill-pill-card" title="Shannon Entropy"><span class="skill-pill-icon text-purple"><i class="fa-solid fa-chart-line"></i></span><span class="skill-pill-name font-mono">Shannon Entropy</span></div>
                        <div class="skill-pill-card" title="Random Forest"><span class="skill-pill-icon text-purple"><i class="fa-solid fa-tree"></i></span><span class="skill-pill-name font-mono">Random Forest</span></div>
                        <div class="skill-pill-card" title="NVD CVE API"><span class="skill-pill-icon text-purple"><i class="fa-solid fa-shield-virus"></i></span><span class="skill-pill-name font-mono">NVD CVE API</span></div>
                    </div>
                </div>
            </div>'''

pattern = r'<div class="arsenal-grid">.*?</div>\s*</section>'
content_new = re.sub(pattern, new_arsenal + '\n        </section>', content, flags=re.DOTALL)

with open('j:/PROGRAM/protflio/index.html', 'w', encoding='utf-8') as f:
    f.write(content_new)
print("Skills updated!")
