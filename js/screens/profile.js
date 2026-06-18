/* ============================================================
   BachatBeat — screens/profile.js
   Screen 4: Individual Client Profile — Header + Tabbed Content
   ============================================================ */

const ProfileScreen = {
  activeTab: 'overview',

  render(container, clientId) {
    this.activeTab = 'overview';
    const clientId_ = clientId || 'c01';
    const client = BB_DATA.clients.find(c => c.id === clientId_) || BB_DATA.clients[0];
    this.client = client;

    const scoreColor = client.score >= 70 ? 'var(--color-green)' : client.score >= 50 ? 'var(--color-amber)' : 'var(--color-red)';
    const urgencyMap = { urgent: 'badge-red', review: 'badge-amber', watch: 'badge-emerald' };

    container.innerHTML = `
      <div class="page-container">
        <!-- Back button -->
        <div class="mb-16 fade-up fade-up-1">
          <button class="btn btn-ghost btn-sm" onclick="App.navigate('clients')">
            <svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>
            All Clients
          </button>
        </div>

        <!-- Profile Header -->
        <div class="card mb-20 fade-up fade-up-2" style="border-left: 4px solid ${scoreColor};">
          <div class="flex items-start justify-between" style="gap:20px;flex-wrap:wrap;">
            <div class="flex gap-20 items-center" style="flex-wrap:wrap;">
              <div class="profile-avatar-lg">${client.name.split(' ').map(w=>w[0]).join('').slice(0,2)}</div>
              <div>
                <div class="flex items-center gap-10 mb-4">
                  <h1 style="font-size:1.6rem;font-weight:800;">${client.name}</h1>
                  <span class="badge ${urgencyMap[client.urgency]}">${client.urgency.charAt(0).toUpperCase()+client.urgency.slice(1)}</span>
                </div>
                <div class="flex gap-16 text-sm text-muted flex-wrap">
                  <span>Age <strong>${client.age}</strong></span>
                  <span>Tax slab: <span class="fin-num font-600">${client.taxSlab}</span></span>
                  <span>📱 ${client.phone}</span>
                  <span>✉ ${client.email}</span>
                </div>
                <div class="mt-8">
                  <div class="text-xs text-muted mb-4">Trapped Capital</div>
                  <div class="fin-num font-700 text-2xl" style="color:var(--color-red)">${client.totalTrapped}</div>
                </div>
              </div>
            </div>

            <!-- Score Gauge with pulse line -->
            <div style="text-align:center;flex-shrink:0;">
              <div class="text-xs text-muted mb-6 font-600" style="text-transform:uppercase;letter-spacing:0.05em;">Health Score</div>
              ${App.renderScoreGauge(client.score, 120)}
              <div class="pulse-under" style="margin-top:8px;">
                ${App.renderPulseSVG(140, 24, client.score < 50 ? 'var(--color-amber)' : 'var(--color-teal)')}
              </div>
            </div>
          </div>

          <!-- Quick actions -->
          <div class="card-divider"></div>
          <div class="flex gap-8 flex-wrap">
            <button class="btn btn-primary btn-sm" onclick="App.navigate('report',{clientId:'${client.id}'})">
              <svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              Export PDF Report
            </button>
            <button class="btn btn-secondary btn-sm">
              <svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              Share via WhatsApp
            </button>
            <button class="btn btn-ghost btn-sm" onclick="App.navigate('policy_add',{clientId:'${client.id}'})">
              <svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
              Run Full Analysis
            </button>
          </div>
        </div>

        <!-- Tabs -->
        <div class="tabs fade-up fade-up-3" id="profile-tabs">
          <button class="tab-btn active" data-tab="overview" onclick="ProfileScreen.switchTab('overview')">Overview</button>
          <button class="tab-btn" data-tab="insurance" onclick="ProfileScreen.switchTab('insurance')">
            Insurance
            ${client.assets.policies > 0 ? `<span class="tab-badge">${client.assets.policies}</span>` : ''}
          </button>
          <button class="tab-btn" data-tab="fds" onclick="ProfileScreen.switchTab('fds')">
            Fixed Deposits
            ${client.assets.fds > 0 ? `<span class="tab-badge">${client.assets.fds}</span>` : ''}
          </button>
          <button class="tab-btn" data-tab="mfs" onclick="ProfileScreen.switchTab('mfs')">
            Mutual Funds / SIPs
            ${client.assets.mfs > 0 ? `<span class="tab-badge">${client.assets.mfs}</span>` : ''}
          </button>
          <button class="tab-btn" data-tab="loans" onclick="ProfileScreen.switchTab('loans')">
            Loans
            ${client.assets.loans > 0 ? `<span class="tab-badge">${client.assets.loans}</span>` : ''}
          </button>
          <button class="tab-btn" data-tab="tax" onclick="ProfileScreen.switchTab('tax')">
            Tax Snapshot
          </button>
        </div>

        <!-- Tab Content -->
        <div id="profile-tab-content" class="fade-up fade-up-4"></div>
      </div>
    `;

    this.renderTab('overview');
  },

  switchTab(tab) {
    this.activeTab = tab;
    document.querySelectorAll('#profile-tabs .tab-btn').forEach(b => b.classList.remove('active'));
    const activeBtn = document.querySelector(`#profile-tabs [data-tab="${tab}"]`);
    if (activeBtn) activeBtn.classList.add('active');
    this.renderTab(tab);
  },

  renderTab(tab) {
    const content = document.getElementById('profile-tab-content');
    const client = this.client;

    if (tab === 'overview') {
      content.innerHTML = `
        <div class="grid-2" style="grid-template-columns: repeat(2,1fr);gap:16px;">
          ${this.overviewCard('🛡️', 'Insurance Policies', client.assets.policies > 0 ? `${client.assets.policies} policies — 1 underperforming (IRR < 6%)` : 'No policies tracked', 'insurance', client.assets.policies, client.assets.policies > 0)}
          ${this.overviewCard('🏦', 'Fixed Deposits', client.assets.fds > 0 ? `${client.assets.fds} FDs — 1 may benefit from breaking` : 'No FDs tracked', 'fds', client.assets.fds, false)}
          ${this.overviewCard('📈', 'Mutual Funds', client.assets.mfs > 0 ? `${client.assets.mfs} funds — 2 below category benchmark` : 'No MFs tracked', 'mfs', client.assets.mfs, false)}
          ${this.overviewCard('🏠', 'Loans', client.assets.loans > 0 ? `${client.assets.loans} loan — rate may be renegotiable` : 'No loans tracked', 'loans', client.assets.loans, false)}
        </div>
        <div class="callout callout-amber mt-16">
          <div class="callout-icon"><svg viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></div>
          <div>
            <div class="callout-title">Key Finding</div>
            <div class="callout-text">${client.reason}</div>
          </div>
        </div>
      `;
    } else if (tab === 'insurance') {
      this.renderInsuranceTab(content, client);
    } else if (tab === 'fds') {
      content.innerHTML = `
        <div class="callout callout-emerald mb-16">
          <div class="callout-icon"><svg viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg></div>
          <div>
            <div class="callout-title">FD Deep Analysis available</div>
            <div class="callout-text">View full Break vs Hold comparison, FD ladder, and scenario modeller.</div>
          </div>
        </div>
        <div class="flex justify-end mb-16">
          <button class="btn btn-primary" onclick="App.navigate('fd',{clientId:'${client.id}'})">Open FD Analysis →</button>
        </div>
        ${this.renderFDSummary(client)}
      `;
    } else if (tab === 'mfs') {
      content.innerHTML = `
        <div class="callout callout-emerald mb-16">
          <div class="callout-icon"><svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg></div>
          <div>
            <div class="callout-title">MF/SIP deep analysis available</div>
            <div class="callout-text">View underperformance cost, Regular vs Direct gap, and overlap detection.</div>
          </div>
        </div>
        <div class="flex justify-end mb-16">
          <button class="btn btn-primary" onclick="App.navigate('mf',{clientId:'${client.id}'})">Open MF Analysis →</button>
        </div>
        ${this.renderMFSummary(client)}
      `;
    } else if (tab === 'loans') {
      content.innerHTML = `
        <div class="flex justify-end mb-16">
          <button class="btn btn-primary" onclick="App.navigate('loans',{clientId:'${client.id}'})">Open Loan Analysis →</button>
        </div>
        ${this.renderLoanSummary(client)}
      `;
    } else if (tab === 'tax') {
      content.innerHTML = `
        <div class="flex justify-end mb-16">
          <button class="btn btn-primary" onclick="App.navigate('tax',{clientId:'${client.id}'})">Open Tax Snapshot →</button>
        </div>
        ${this.renderTaxSummary(client)}
      `;
    }
  },

  overviewCard(emoji, title, detail, tab, count, hasAlert) {
    return `
      <div class="card-sm" style="cursor:pointer;border:1.5px solid ${hasAlert ? 'var(--color-amber)' : 'var(--color-border-faint)'};"
           onclick="ProfileScreen.switchTab('${tab}')">
        <div class="flex items-center gap-10 mb-8">
          <span style="font-size:1.3rem;">${emoji}</span>
          <span style="font-weight:700;">${title}</span>
          ${hasAlert ? '<span class="badge badge-amber ml-auto">Review</span>' : ''}
        </div>
        <div class="text-sm text-muted">${detail}</div>
        <div class="text-xs text-muted mt-8" style="color:var(--color-teal);">Tap to view →</div>
      </div>`;
  },

  renderInsuranceTab(content, client) {
    const policies = BB_DATA.policies[client.id] || [];
    const tagMap = {
      healthy:   { cls: 'badge-emerald', label: 'Healthy' },
      review:    { cls: 'badge-amber', label: 'Review' },
      surrender: { cls: 'badge-red', label: 'Surrender Recommended' },
    };

    content.innerHTML = `
      <div class="flex justify-between items-center mb-16">
        <h3 style="font-weight:700;">Insurance Policies (${policies.length})</h3>
        <div class="flex gap-8">
          <button class="btn btn-secondary btn-sm" onclick="App.navigate('overlap',{clientId:'${client.id}'})">
            🔍 Check Overlap
          </button>
          <button class="btn btn-primary btn-sm" onclick="App.navigate('policy_add',{clientId:'${client.id}'})">
            + Add Policy
          </button>
        </div>
      </div>
      ${policies.length === 0 ? `<div class="empty-state"><svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg><div class="empty-title">No policies added yet</div><div class="empty-text"><button class="btn btn-primary btn-sm mt-8" onclick="App.navigate('policy_add',{clientId:'${client.id}'})">+ Add First Policy</button></div></div>` : ''}
      ${policies.map(p => {
        const tag = tagMap[p.tag];
        return `
          <div class="expand-row" id="exp-${p.id}">
            <div class="expand-header" onclick="ProfileScreen.toggleExpand('exp-${p.id}')">
              <div>
                <div class="flex items-center gap-10">
                  <span style="font-weight:700;">${p.insurer}</span>
                  <span style="font-weight:500;color:var(--color-text-muted);">${p.type}</span>
                  <span class="badge ${tag.cls}">${tag.label}</span>
                </div>
                <div class="text-xs text-muted mt-4">
                  Premium: <span class="fin-num">${App.formatRupee(p.premium)}/yr</span> ·
                  Sum Assured: <span class="fin-num">${App.formatRupee(p.sumAssured)}</span> ·
                  ${p.irr ? `IRR: <span class="fin-num" style="color:${p.irr < 6 ? 'var(--color-red)':'var(--color-green)'}">${p.irr}%</span>` : 'Term plan — no IRR applicable'}
                </div>
              </div>
              <div class="expand-chevron">
                <svg viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>
              </div>
            </div>
            <div class="expand-body">
              ${p.irr ? `
                <div class="grid-3 mb-12">
                  <div class="card-sage" style="text-align:center;">
                    <div class="text-xs text-muted mb-4">Guaranteed SV</div>
                    <div class="fin-num font-700 text-lg">${App.formatRupee(p.gsv)}</div>
                  </div>
                  <div class="card-sage" style="text-align:center;">
                    <div class="text-xs text-muted mb-4">Special SV (est.)</div>
                    <div class="fin-num font-700 text-lg">${App.formatRupee(p.ssv)}</div>
                  </div>
                  <div class="card-sage" style="text-align:center;border:2px solid var(--color-emerald);">
                    <div class="text-xs text-muted mb-4">Potential Gain</div>
                    <div class="fin-num font-700 text-lg" style="color:var(--color-emerald)">${App.formatRupee(p.potentialGain)}</div>
                  </div>
                </div>
                <div class="callout callout-emerald">
                  <div class="callout-icon"><svg viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"/></svg></div>
                  <div><div class="callout-title">Recommendation</div><div class="callout-text">${p.recommendation}</div></div>
                </div>
                <div class="mt-12">
                  <button class="btn btn-primary btn-sm" onclick="App.navigate('policy_add',{clientId:'${client.id}'})">View Full Analysis →</button>
                </div>
              ` : `<div class="callout callout-emerald"><div class="callout-icon"><svg viewBox="0 0 24 24"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg></div><div><div class="callout-title">Recommendation</div><div class="callout-text">${p.recommendation}</div></div></div>`}
            </div>
          </div>`;
      }).join('')}
    `;
  },

  renderFDSummary(client) {
    const fds = BB_DATA.fds[client.id] || [];
    if (!fds.length) return `<div class="empty-state"><svg viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg><div class="empty-title">No FDs tracked</div></div>`;
    return `<div class="flex-col gap-12">
      ${fds.map(fd => `
        <div class="card-sm">
          <div class="flex justify-between items-start">
            <div>
              <div class="font-600">${fd.bank}</div>
              <div class="text-xs text-muted">Principal: <span class="fin-num">${App.formatRupee(fd.principal)}</span> · Rate: <span class="fin-num">${fd.rate}%</span> · Matures: ${fd.maturityDate}</div>
            </div>
            <span class="badge ${fd.verdict === 'break' ? 'badge-amber' : 'badge-emerald'}">${fd.verdict === 'break' ? '⚡ Break Recommended' : '✓ Hold'}</span>
          </div>
        </div>`).join('')}
    </div>`;
  },

  renderMFSummary(client) {
    const mfs = BB_DATA.mfs[client.id] || [];
    if (!mfs.length) return `<div class="empty-state"><svg viewBox="0 0 24 24"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/></svg><div class="empty-title">No MFs tracked</div></div>`;
    const underperforming = mfs.filter(m => m.underperformAmount > 0);
    return `
      ${underperforming.length > 0 ? `
        <div class="callout callout-amber mb-16">
          <div class="callout-icon"><svg viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/></svg></div>
          <div>
            <div class="callout-title">Underperformance Cost: ${App.formatRupee(underperforming.reduce((s,m)=>s+m.underperformAmount,0))}</div>
            <div class="callout-text">${underperforming.length} fund(s) trailing category median</div>
          </div>
        </div>` : ''}
      <div class="flex-col gap-8">
        ${mfs.slice(0,3).map(m => `
          <div class="card-sm">
            <div class="flex justify-between items-center">
              <div>
                <div class="font-600 text-sm">${m.fund}</div>
                <div class="text-xs text-muted">SIP: <span class="fin-num">${App.formatRupee(m.sip)}/mo</span> · IRR: <span class="fin-num" style="color:${m.underperformAmount>0?'var(--color-red)':'var(--color-green)'}">${m.irrEarned}%</span> vs <span class="fin-num">${m.categoryMedian}%</span> median</div>
              </div>
              <span class="badge ${m.type==='Direct'?'badge-emerald':'badge-amber'}">${m.type}</span>
            </div>
          </div>`).join('')}
      </div>`;
  },

  renderLoanSummary(client) {
    const loans = BB_DATA.loans[client.id] || [];
    if (!loans.length) return `<div class="empty-state"><svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg><div class="empty-title">No loans tracked</div></div>`;
    return loans.map(l => `
      <div class="card-sm mb-8">
        <div class="flex justify-between items-start">
          <div>
            <div class="font-700">${l.type} — ${l.lender}</div>
            <div class="text-xs text-muted mt-4">
              Outstanding: <span class="fin-num font-600">${App.formatRupee(l.outstanding)}</span> ·
              Rate: <span class="fin-num" style="color:var(--color-amber)">${l.rate}%</span> ·
              EMI: <span class="fin-num">${App.formatRupee(l.emi)}/mo</span>
            </div>
          </div>
          <button class="btn btn-ghost btn-sm" onclick="App.navigate('loans',{clientId:'${client.id}'})">Analyse →</button>
        </div>
      </div>`).join('');
  },

  renderTaxSummary(client) {
    const snap = BB_DATA.taxSnapshots[client.id];
    if (!snap) return `<div class="empty-state"><svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/></svg><div class="empty-title">No tax snapshot yet</div></div>`;
    return `
      <div class="compare-grid">
        <div class="compare-card ${snap.winner === 'old' ? 'winner' : ''}">
          ${snap.winner === 'old' ? `<div class="winner-badge">✓ Recommended</div>` : ''}
          <div class="compare-title">Old Regime</div>
          <div class="compare-metric">
            <span class="compare-metric-label">Taxable Income</span>
            <span class="compare-metric-value fin-num">${App.formatRupee(snap.oldRegime.taxableIncome)}</span>
          </div>
          <div class="compare-metric">
            <span class="compare-metric-label">Total Tax</span>
            <span class="compare-metric-value fin-num ${snap.winner === 'old' ? 'win' : ''}">${App.formatRupee(snap.oldRegime.total)}</span>
          </div>
        </div>
        <div class="compare-card ${snap.winner === 'new' ? 'winner' : ''}">
          ${snap.winner === 'new' ? `<div class="winner-badge">✓ Recommended</div>` : ''}
          <div class="compare-title">New Regime</div>
          <div class="compare-metric">
            <span class="compare-metric-label">Taxable Income</span>
            <span class="compare-metric-value fin-num">${App.formatRupee(snap.newRegime.taxableIncome)}</span>
          </div>
          <div class="compare-metric">
            <span class="compare-metric-label">Total Tax</span>
            <span class="compare-metric-value fin-num ${snap.winner === 'new' ? 'win' : ''}">${App.formatRupee(snap.newRegime.total)}</span>
          </div>
        </div>
      </div>
      <div class="callout callout-emerald mt-16">
        <div class="callout-icon"><svg viewBox="0 0 24 24"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg></div>
        <div>
          <div class="callout-title">Old Regime saves ₹${snap.savings.toLocaleString('en-IN')} this year</div>
          <div class="callout-text">Based on current deductions including 80C, HRA, and NPS contributions.</div>
        </div>
      </div>`;
  },

  toggleExpand(id) {
    const el = document.getElementById(id);
    if (el) el.classList.toggle('open');
  },
};

window.ProfileScreen = ProfileScreen;
