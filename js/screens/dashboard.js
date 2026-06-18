/* ============================================================
   BachatBeat — screens/dashboard.js
   Screen 2: Main Dashboard Overview
   ============================================================ */

const DashboardScreen = {
  render(container) {
    const stats = BB_DATA.dashboardStats;
    const today = new Date().toLocaleDateString('en-IN', { weekday:'long', day:'numeric', month:'long', year:'numeric' });

    container.innerHTML = `
      <div class="page-container">
        <!-- Header -->
        <div class="page-header fade-up fade-up-1">
          <div class="flex items-center justify-between" style="flex-wrap:wrap;gap:12px;">
            <div>
              <h1 class="page-title">Good morning, ${App.state.firmName} 👋</h1>
              <p class="page-subtitle">${today} · Showing insights across all ${stats.totalClients} clients</p>
            </div>
            <button class="btn btn-primary" onclick="App.navigate('policy_add')">
              <svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Run New Analysis
            </button>
          </div>
        </div>

        <!-- Stat Cards -->
        <div class="grid-4 mb-24 fade-up fade-up-2">
          <div class="stat-card accent-emerald">
            <div class="stat-label">
              <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              Total Clients
            </div>
            <div class="stat-value count-val" data-target="${stats.totalClients}">${stats.totalClients}</div>
            <div class="stat-sub">Active client portfolios</div>
          </div>

          <div class="stat-card accent-teal">
            <div class="stat-label">
              <svg viewBox="0 0 24 24"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              Trapped Capital
            </div>
            <div class="stat-value fin-num-xl count-val" data-target="47.2" data-prefix="₹" data-suffix="L">₹47.2L</div>
            <div class="stat-sub flex gap-6 items-center">
              <span class="stat-trend up">↑ ₹3.1L this month</span>
            </div>
          </div>

          <div class="stat-card accent-amber">
            <div class="stat-label" style="color:var(--color-amber)">
              <svg viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              Needs Attention
            </div>
            <div class="stat-value count-val" style="color:var(--color-amber)" data-target="${stats.attentionNeeded}">${stats.attentionNeeded}</div>
            <div class="stat-sub">Clients needing action this week</div>
          </div>

          <div class="stat-card accent-sage">
            <div class="stat-label">
              <svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
              Avg. Health Score
            </div>
            <div class="stat-value count-val" data-target="${stats.avgScore}">${stats.avgScore}</div>
            <div class="stat-sub flex gap-6 items-center">
              <span class="stat-trend warn">⚠ Below 60 is critical</span>
            </div>
          </div>
        </div>

        <!-- Main grid: Attention + Chart -->
        <div class="grid-2 mb-24 fade-up fade-up-3" style="grid-template-columns: 1.4fr 1fr;">

          <!-- Attention List -->
          <div class="card">
            <div class="card-header">
              <span class="card-title">This Week's Attention List</span>
              <button class="btn btn-secondary btn-sm" onclick="App.navigate('alerts')">View All</button>
            </div>
            <div id="attention-list"></div>
          </div>

          <!-- Asset Class Breakdown -->
          <div class="card">
            <div class="card-header">
              <span class="card-title">Trapped Capital by Asset Class</span>
              <span class="text-sm text-muted fin-num">₹47.2L total</span>
            </div>
            <div class="bar-chart" id="asset-bar-chart" style="margin-top:8px;"></div>
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="card fade-up fade-up-4">
          <div class="card-header">
            <span class="card-title">Recent Activity</span>
            <span class="text-xs text-muted">Last 6 actions</span>
          </div>
          <div id="activity-feed"></div>
        </div>
      </div>
    `;

    this.renderAttentionList();
    this.renderBarChart();
    this.renderActivityFeed();
    this.animateNumbers();
  },

  renderAttentionList() {
    const container = document.getElementById('attention-list');
    container.innerHTML = BB_DATA.attentionList.map(item => {
      const urgencyMap = { urgent: 'badge-red', review: 'badge-amber', watch: 'badge-emerald' };
      const urgencyLabel = { urgent: 'Urgent', review: 'Review', watch: 'Watch' };
      return `
        <div class="attention-row" onclick="App.navigate('profile',{clientId:'${item.clientId}'})">
          <div class="urgency-dot ${item.urgency}"></div>
          <div class="attention-info">
            <div class="attention-name">${item.name}</div>
            <div class="attention-reason">${item.reason}</div>
          </div>
          <div class="flex items-center gap-8">
            <span class="badge ${urgencyMap[item.urgency]}">${urgencyLabel[item.urgency]}</span>
            <button class="btn btn-secondary btn-sm" onclick="event.stopPropagation();App.navigate('profile',{clientId:'${item.clientId}'})">View</button>
          </div>
        </div>`;
    }).join('');
  },

  renderBarChart() {
    const container = document.getElementById('asset-bar-chart');
    container.innerHTML = BB_DATA.assetBreakdown.map((item, i) => `
      <div class="bar-row">
        <div class="bar-label">${item.label}</div>
        <div class="bar-track">
          <div class="bar-fill ${item.barClass}" style="--bar-w:${item.barPct}%;width:0%"
            data-width="${item.barPct}"></div>
        </div>
        <div class="bar-value fin-num">${item.amount}</div>
      </div>
    `).join('');

    // Animate bars after render
    setTimeout(() => {
      document.querySelectorAll('.bar-fill[data-width]').forEach(el => {
        el.style.transition = 'width 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        el.style.width = el.dataset.width + '%';
      });
    }, 200);
  },

  renderActivityFeed() {
    const container = document.getElementById('activity-feed');
    container.innerHTML = BB_DATA.recentActivity.map(item => `
      <div class="activity-item" style="cursor:pointer;" onclick="App.navigate('profile',{clientId:'${item.client}'})">
        <div class="activity-dot"></div>
        <div class="activity-content">
          <div class="activity-text">${item.text}</div>
          <div class="activity-meta">${item.time}</div>
        </div>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-faint)" stroke-width="2">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </div>
    `).join('');
  },

  animateNumbers() {
    const countEls = document.querySelectorAll('.count-val[data-target]');
    countEls.forEach(el => {
      const target = parseFloat(el.dataset.target);
      const prefix = el.dataset.prefix || '';
      const suffix = el.dataset.suffix || '';
      const isDecimal = String(target).includes('.');
      let start = 0;
      const duration = 1200;
      const startTime = performance.now();

      const tick = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        const current = start + (target - start) * ease;
        el.textContent = prefix + (isDecimal ? current.toFixed(1) : Math.round(current)) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      };

      setTimeout(() => requestAnimationFrame(tick), 400);
    });
  },
};

window.DashboardScreen = DashboardScreen;
