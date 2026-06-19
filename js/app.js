/* ============================================================
   BachatBeat — app.js
   Router, app state, navigation, initialization
   ============================================================ */

// ── App State ──────────────────────────────────────────────────
const App = {
  state: {
    role: null,
    firmName: '',
    currentScreen: null,
    currentClientId: null,
    sidebarCollapsed: false,
  },

  screens: {},

  init() {
    // Check if already onboarded
    const savedRole = sessionStorage.getItem('bb_role');
    const savedFirm = sessionStorage.getItem('bb_firm');
    const bbUser = localStorage.getItem('bb_user');

    if (savedRole) {
      this.state.role = savedRole;
      this.state.firmName = savedFirm || 'My Practice';
      this.showDashboard();
    } else if (bbUser) {
      // Auto-onboard if logged in from landing page
      this.state.role = 'advisor';
      this.state.firmName = bbUser;
      sessionStorage.setItem('bb_role', 'advisor');
      sessionStorage.setItem('bb_firm', bbUser);
      this.showDashboard();
    } else {
      this.showOnboarding();
    }

    this.bindGlobalEvents();
    this.renderTopbarPulse();
  },

  bindGlobalEvents() {
    // Sidebar toggle
    const toggleBtn = document.getElementById('sidebar-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => this.toggleSidebar());
    }

    // Profile dropdown toggle
    const profileBtn = document.getElementById('topbar-profile');
    if (profileBtn) {
      profileBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const dd = document.getElementById('profile-dropdown');
        dd.classList.toggle('open');
      });
    }

    // Close dropdown on outside click
    document.addEventListener('click', () => {
      const dd = document.getElementById('profile-dropdown');
      if (dd) dd.classList.remove('open');
    });

    // Change role from dropdown
    const changeRoleBtn = document.getElementById('change-role-btn');
    if (changeRoleBtn) {
      changeRoleBtn.addEventListener('click', () => {
        sessionStorage.clear();
        this.state.role = null;
        document.getElementById('profile-dropdown').classList.remove('open');
        this.showOnboarding();
      });
    }

    // Search bar
    const searchInput = document.getElementById('topbar-search');
    if (searchInput) {
      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && e.target.value.trim()) {
          this.navigate('clients');
        }
      });
    }

    // Mobile nav
    document.querySelectorAll('.mobile-nav-item').forEach(item => {
      item.addEventListener('click', () => {
        const screen = item.dataset.screen;
        if (screen) this.navigate(screen);
      });
    });
  },

  toggleSidebar() {
    this.state.sidebarCollapsed = !this.state.sidebarCollapsed;
    const sidebar = document.getElementById('sidebar');
    const topbar  = document.getElementById('topbar');
    const main    = document.getElementById('main-content');
    sidebar.classList.toggle('collapsed', this.state.sidebarCollapsed);
    topbar.classList.toggle('sidebar-collapsed', this.state.sidebarCollapsed);
    main.classList.toggle('sidebar-collapsed', this.state.sidebarCollapsed);
  },

  showOnboarding() {
    document.getElementById('app-shell').style.display = 'none';
    document.getElementById('onboarding-overlay').style.display = 'flex';
    if (window.OnboardingScreen) window.OnboardingScreen.render();
  },

  showDashboard() {
    document.getElementById('onboarding-overlay').style.display = 'none';
    document.getElementById('app-shell').style.display = 'flex';
    this.updateTopbar();
    this.updateNavLabels();
    this.navigate('dashboard');
  },

  completeOnboarding(role, firmName) {
    this.state.role = role;
    this.state.firmName = firmName || 'My Practice';
    sessionStorage.setItem('bb_role', role);
    sessionStorage.setItem('bb_firm', firmName);
    this.showDashboard();
  },

  updateTopbar() {
    const roleData = BB_DATA.roles.find(r => r.id === this.state.role);
    const shortRole = roleData ? this.getShortRoleLabel(this.state.role) : 'Advisor';

    const roleEl = document.getElementById('topbar-role-badge');
    if (roleEl) roleEl.textContent = shortRole;

    const nameEl  = document.getElementById('profile-name');
    const roleEl2 = document.getElementById('profile-role');
    if (nameEl)  nameEl.textContent  = this.state.firmName;
    if (roleEl2) roleEl2.textContent = shortRole;

    // Avatar — preserve the founder.jpg img tag if already present; don't overwrite with initials
    const avatarEl = document.getElementById('profile-avatar');
    if (avatarEl && !avatarEl.querySelector('img')) {
      const words = this.state.firmName.split(' ');
      avatarEl.textContent = words.length >= 2
        ? words[0][0].toUpperCase() + words[1][0].toUpperCase()
        : words[0].slice(0,2).toUpperCase();
    }

    // Date
    const dateEl = document.getElementById('topbar-date');
    if (dateEl) {
      const now = new Date();
      dateEl.textContent = now.toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' });
    }
  },

  getShortRoleLabel(role) {
    const map = {
      ria: 'SEBI RIA', ca: 'Chartered Accountant', cma: 'CMA',
      cs: 'Company Secretary', mfd: 'MFD', broker: 'Insurance Broker',
      bank_rm: 'Bank RM', advisor: 'Independent Advisor'
    };
    return map[role] || 'Advisor';
  },

  updateNavLabels() {
    const labels = BB_DATA.roleLabels[this.state.role] || BB_DATA.roleLabels.advisor;

    const portfolioEl = document.querySelector('[data-nav-label="portfolio"]');
    const taxEl       = document.querySelector('[data-nav-label="tax"]');

    if (portfolioEl) portfolioEl.textContent = labels.portfolioLabel;
    if (taxEl)       taxEl.textContent       = labels.taxLabel;

    // Add role-specific emphasis to a nav item
    const allNavItems = document.querySelectorAll('.nav-item');
    allNavItems.forEach(item => item.classList.remove('role-emphasis'));

    const emphasisMap = {
      ria:    'nav-dashboard',
      ca:     'nav-tax',
      mfd:    'nav-mf',
      broker: 'nav-insurance',
    };
    const emphId = emphasisMap[this.state.role];
    if (emphId) {
      const emphEl = document.getElementById(emphId);
      if (emphEl) emphEl.classList.add('role-emphasis');
    }
  },

  navigate(screen, params = {}) {
    this.state.currentScreen = screen;
    if (params.clientId) this.state.currentClientId = params.clientId;

    // Update nav active state
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    const navEl = document.querySelector(`.nav-item[data-screen="${screen}"]`);
    if (navEl) navEl.classList.add('active');

    // Update mobile nav
    document.querySelectorAll('.mobile-nav-item').forEach(el => el.classList.remove('active'));
    const mobileEl = document.querySelector(`.mobile-nav-item[data-screen="${screen}"]`);
    if (mobileEl) mobileEl.classList.add('active');

    const main = document.getElementById('screen-content');
    main.innerHTML = '';
    main.classList.add('page-enter');
    setTimeout(() => main.classList.remove('page-enter'), 300);

    // Route to screen
    const screenMap = {
      dashboard:  () => window.DashboardScreen?.render(main),
      clients:    () => window.ClientsScreen?.render(main),
      profile:    () => window.ProfileScreen?.render(main, this.state.currentClientId),
      alerts:     () => window.AlertsScreen?.render(main),
      report:     () => window.ReportScreen?.render(main, this.state.currentClientId),
      fd:         () => window.FDScreen?.render(main, this.state.currentClientId),
      loans:      () => window.LoanScreen?.render(main, this.state.currentClientId),
      mf:         () => window.MFScreen?.render(main, this.state.currentClientId),
      tax:        () => window.TaxScreen?.render(main, this.state.currentClientId),
      policy_add: () => window.PolicyScreen?.render(main, this.state.currentClientId),
      overlap:    () => window.OverlapScreen?.render(main, this.state.currentClientId),
    };

    const renderer = screenMap[screen];
    if (renderer) renderer();
    else main.innerHTML = `<div class="page-container"><p>Screen "${screen}" loading...</p></div>`;

    // Scroll to top
    main.scrollTop = 0;
    document.getElementById('main-content').scrollTop = 0;
  },

  // Utility: render score gauge SVG
  renderScoreGauge(score, size = 80) {
    const r = (size / 2) - 8;
    const circ = 2 * Math.PI * r;
    const offset = circ - (score / 100) * circ;
    const color = score >= 70 ? 'var(--color-green)' : score >= 50 ? 'var(--color-amber)' : 'var(--color-red)';
    const textSize = size > 100 ? '2rem' : size > 60 ? '1.1rem' : '0.85rem';
    const center = size / 2;
    return `
      <div class="score-gauge" style="width:${size}px;height:${size}px;" data-score="${score}">
        <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
          <circle cx="${center}" cy="${center}" r="${r}" fill="none"
            stroke="var(--color-sage-dark)" stroke-width="6"/>
          <circle cx="${center}" cy="${center}" r="${r}" fill="none"
            stroke="${color}" stroke-width="6"
            stroke-linecap="round"
            stroke-dasharray="${circ.toFixed(2)}"
            stroke-dashoffset="${offset.toFixed(2)}"
            class="gauge-circle"
            style="--target-offset:${offset.toFixed(2)}; transform-origin:center; transform:rotate(-90deg);"
          />
        </svg>
        <div class="score-gauge-value" style="font-size:${textSize}; color:${color}">
          ${score}<span>Score</span>
        </div>
      </div>`;
  },

  // Utility: render pulse SVG (ECG heartbeat line)
  renderPulseSVG(width = 300, height = 30, color = 'var(--color-teal)') {
    const mid = height / 2;
    const path = `M0,${mid} L${width*0.1},${mid} L${width*0.15},${mid - height*0.3} L${width*0.2},${mid + height*0.8} L${width*0.25},${mid - height*1.2} L${width*0.3},${mid + height*0.4} L${width*0.35},${mid} L${width*0.6},${mid} L${width*0.65},${mid - height*0.25} L${width*0.7},${mid + height*0.7} L${width*0.75},${mid - height*1.0} L${width*0.8},${mid + height*0.35} L${width*0.85},${mid} L${width},${mid}`;
    const pathLen = 800;
    return `
      <svg class="pulse-svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"
           aria-hidden="true" preserveAspectRatio="none">
        <path class="pulse-path animated-loop" d="${path}"
          stroke="${color}" stroke-width="1.5" fill="none"
          style="--dash-len:${pathLen}; stroke-dasharray:${pathLen}; stroke-dashoffset:${pathLen};"/>
      </svg>`;
  },

  // Format rupee in Indian style (e.g. ₹12,45,000)
  formatRupee(amount, compact = false) {
    if (compact) {
      if (amount >= 10000000) return `₹${(amount/10000000).toFixed(1)}Cr`;
      if (amount >= 100000)   return `₹${(amount/100000).toFixed(1)}L`;
      if (amount >= 1000)     return `₹${(amount/1000).toFixed(0)}K`;
      return `₹${amount}`;
    }
    return '₹' + amount.toLocaleString('en-IN');
  },

  renderTopbarPulse() {
    const container = document.getElementById('topbar-pulse');
    if (!container) return;
    const w = window.innerWidth;
    const mid = 1;
    const path = `M0,${mid} L${w*0.08},${mid} L${w*0.09},${mid-8} L${w*0.10},${mid+8} L${w*0.11},${mid-14} L${w*0.12},${mid+6} L${w*0.13},${mid} L${w*0.5},${mid} L${w*0.51},${mid-6} L${w*0.52},${mid+7} L${w*0.53},${mid-12} L${w*0.54},${mid+5} L${w*0.55},${mid} L${w},${mid}`;
    container.innerHTML = `
      <svg width="100%" height="2" viewBox="0 0 ${w} 2" preserveAspectRatio="none" aria-hidden="true">
        <path id="topbar-pulse-line" d="${path}"/>
      </svg>`;
  },
};

window.App = App;
