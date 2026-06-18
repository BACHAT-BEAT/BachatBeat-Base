/* ============================================================
   BachatBeat — screens/tax.js         Screen 10: Tax Snapshot
   screens/alerts.js                    Screen 11: Monitoring & Alerts
   screens/report.js                    Screen 12: Report Preview
   ============================================================ */

/* ── Screen 10: Tax Snapshot ──────────────────────────────── */
const TaxScreen = {
  render(container, clientId) {
    const client = BB_DATA.clients.find(c => c.id === clientId) || BB_DATA.clients[0];
    const snap = BB_DATA.taxSnapshots[client.id] || BB_DATA.taxSnapshots.c01;

    container.innerHTML = `
      <div class="page-container">
        <div class="mb-16"><button class="btn btn-ghost btn-sm" onclick="App.navigate('profile',{clientId:'${client.id}'})">← Back to ${client.name}</button></div>
        <div class="page-header">
          <h1 class="page-title">Tax Snapshot</h1>
          <p class="page-subtitle">${client.name} · FY 2025-26 · Tax Slab: <span class="fin-num font-700">${client.taxSlab}</span></p>
        </div>

        <!-- Old vs New Regime -->
        <div class="compare-grid mb-24 fade-up fade-up-1">
          <div class="compare-card ${snap.winner === 'old' ? 'winner' : ''}">
            ${snap.winner === 'old' ? '<div class="winner-badge">✓ Recommended — Saves ₹'+snap.savings.toLocaleString('en-IN')+'</div>' : ''}
            <div class="compare-title" style="font-size:1rem;">Old Regime</div>
            <div class="compare-metric"><span class="compare-metric-label">Gross Income</span><span class="compare-metric-value fin-num">${App.formatRupee(snap.income)}</span></div>
            <div class="compare-metric"><span class="compare-metric-label">Total Deductions</span><span class="compare-metric-value fin-num win">−${App.formatRupee(Object.values(snap.oldRegime.deductions).reduce((a,b)=>a+b,0))}</span></div>
            <div class="compare-metric"><span class="compare-metric-label">Taxable Income</span><span class="compare-metric-value fin-num">${App.formatRupee(snap.oldRegime.taxableIncome)}</span></div>
            <div class="compare-metric"><span class="compare-metric-label">Gross Tax</span><span class="compare-metric-value fin-num">${App.formatRupee(snap.oldRegime.grossTax)}</span></div>
            <div class="compare-metric"><span class="compare-metric-label">Health & Ed. Cess</span><span class="compare-metric-value fin-num">${App.formatRupee(snap.oldRegime.cess)}</span></div>
            <div class="compare-metric" style="margin-top:8px;padding-top:8px;border-top:2px solid var(--color-border);">
              <span class="compare-metric-label" style="font-weight:700;">TOTAL TAX</span>
              <span class="compare-metric-value fin-num ${snap.winner==='old'?'win':''}" style="font-size:1.2rem;">${App.formatRupee(snap.oldRegime.total)}</span>
            </div>
          </div>

          <div class="compare-card ${snap.winner === 'new' ? 'winner' : ''}">
            ${snap.winner === 'new' ? '<div class="winner-badge">✓ Recommended</div>' : ''}
            <div class="compare-title" style="font-size:1rem;">New Regime</div>
            <div class="compare-metric"><span class="compare-metric-label">Gross Income</span><span class="compare-metric-value fin-num">${App.formatRupee(snap.income)}</span></div>
            <div class="compare-metric"><span class="compare-metric-label">Standard Deduction</span><span class="compare-metric-value fin-num win">−₹50,000</span></div>
            <div class="compare-metric"><span class="compare-metric-label">Taxable Income</span><span class="compare-metric-value fin-num">${App.formatRupee(snap.newRegime.taxableIncome)}</span></div>
            <div class="compare-metric"><span class="compare-metric-label">Gross Tax</span><span class="compare-metric-value fin-num">${App.formatRupee(snap.newRegime.grossTax)}</span></div>
            <div class="compare-metric"><span class="compare-metric-label">Health & Ed. Cess</span><span class="compare-metric-value fin-num">${App.formatRupee(snap.newRegime.cess)}</span></div>
            <div class="compare-metric" style="margin-top:8px;padding-top:8px;border-top:2px solid var(--color-border);">
              <span class="compare-metric-label" style="font-weight:700;">TOTAL TAX</span>
              <span class="compare-metric-value fin-num ${snap.winner==='new'?'win':''}" style="font-size:1.2rem;">${App.formatRupee(snap.newRegime.total)}</span>
            </div>
          </div>
        </div>

        <!-- 80C Bucket Breakdown -->
        <div class="card mb-20 fade-up fade-up-2">
          <div class="card-header">
            <span class="card-title">80C Bucket Breakdown — ₹1,50,000 limit</span>
            <span class="badge badge-emerald">Fully utilised</span>
          </div>
          <div style="margin-bottom:20px;">
            <div class="text-xs text-muted mb-8">Current allocation</div>
            <div style="height:24px;border-radius:99px;overflow:hidden;display:flex;gap:2px;">
              ${snap.bucket80C.map(b => `
                <div style="height:100%;width:${Math.round(b.amount/1500)}%;background:${b.color};border-radius:2px;" title="${b.label}: ${App.formatRupee(b.amount)}"></div>`).join('')}
            </div>
            <div class="flex gap-16 mt-10 flex-wrap">
              ${snap.bucket80C.map(b => `
                <div class="flex items-center gap-6">
                  <div style="width:10px;height:10px;background:${b.color};border-radius:2px;flex-shrink:0;"></div>
                  <span class="text-xs"><strong>${b.label}</strong> <span class="fin-num">${App.formatRupee(b.amount)}</span> · <span style="color:${b.irr<6?'var(--color-red)':b.irr<8?'var(--color-amber)':'var(--color-green)'}">${b.irr}% IRR</span></span>
                </div>`).join('')}
            </div>
          </div>

          <div class="bar-chart">
            ${snap.bucket80C.map(b => `
              <div class="bar-row">
                <div class="bar-label">${b.label}</div>
                <div class="bar-track">
                  <div class="bar-fill" style="background:${b.color};width:0%" data-width="${Math.round(b.amount/1500)}"></div>
                </div>
                <div class="bar-value fin-num">${App.formatRupee(b.amount)}</div>
              </div>`).join('')}
          </div>
        </div>

        <!-- Reallocation callout -->
        <div class="callout callout-amber fade-up fade-up-3">
          <div class="callout-icon"><svg viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg></div>
          <div>
            <div class="callout-title">Reallocation opportunity</div>
            <div class="callout-text">${snap.reallocationNote}</div>
          </div>
        </div>
      </div>`;

    setTimeout(() => {
      document.querySelectorAll('.bar-fill[data-width]').forEach(el => {
        el.style.transition = 'width 0.9s ease';
        el.style.width = el.dataset.width + '%';
      });
    }, 300);
  },
};
window.TaxScreen = TaxScreen;


/* ── Screen 11: Alerts ────────────────────────────────────── */
const AlertsScreen = {
  filterUrgency: 'all',
  filterType: 'all',

  render(container) {
    container.innerHTML = `
      <div class="page-container">
        <div class="page-header fade-up fade-up-1">
          <div class="flex justify-between items-center flex-wrap gap-12">
            <div>
              <h1 class="page-title">Monitoring & Alerts</h1>
              <p class="page-subtitle">Full alert feed across all clients — filterable by urgency and trigger type.</p>
            </div>
            <!-- Notification prefs toggle -->
            <div class="card-sm flex items-center gap-16" style="padding:12px 16px;">
              <span class="text-sm font-600 text-muted">Notify via:</span>
              <div class="toggle-switch">
                <div class="toggle-track on"></div>
                <span class="text-sm">In-app</span>
              </div>
              <div class="toggle-switch">
                <div class="toggle-track on"></div>
                <span class="text-sm">WhatsApp</span>
              </div>
              <div class="toggle-switch">
                <div class="toggle-track"></div>
                <span class="text-sm">Email</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Filters -->
        <div class="filter-bar mb-16 fade-up fade-up-2">
          <div class="flex gap-6">
            <button class="filter-chip active" data-u="all" onclick="AlertsScreen.setUrgency('all',this)">All Urgencies</button>
            <button class="filter-chip" data-u="urgent" onclick="AlertsScreen.setUrgency('urgent',this)">
              <span class="urgency-dot urgent" style="width:6px;height:6px;"></span> Urgent
            </button>
            <button class="filter-chip" data-u="review" onclick="AlertsScreen.setUrgency('review',this)">
              <span class="urgency-dot review" style="width:6px;height:6px;"></span> Review
            </button>
            <button class="filter-chip" data-u="watch" onclick="AlertsScreen.setUrgency('watch',this)">
              <span class="urgency-dot watch" style="width:6px;height:6px;"></span> Watch
            </button>
          </div>
          <div class="flex gap-6">
            <button class="filter-chip active" data-t="all" onclick="AlertsScreen.setType('all',this)">All Types</button>
            <button class="filter-chip" data-t="Bonus Rate Change" onclick="AlertsScreen.setType('Bonus Rate Change',this)">Bonus Rate</button>
            <button class="filter-chip" data-t="Repo Rate Cut" onclick="AlertsScreen.setType('Repo Rate Cut',this)">Repo Rate</button>
            <button class="filter-chip" data-t="Policy Anniversary" onclick="AlertsScreen.setType('Policy Anniversary',this)">Policy Anniversary</button>
            <button class="filter-chip" data-t="Tax Season Reminder" onclick="AlertsScreen.setType('Tax Season Reminder',this)">Tax Season</button>
          </div>
        </div>

        <!-- Alert feed -->
        <div id="alerts-feed" class="fade-up fade-up-3"></div>
      </div>`;

    this.renderFeed();
  },

  renderFeed() {
    const container = document.getElementById('alerts-feed');
    let alerts = BB_DATA.alerts;
    if (this.filterUrgency !== 'all') alerts = alerts.filter(a => a.urgency === this.filterUrgency);
    if (this.filterType !== 'all') alerts = alerts.filter(a => a.type === this.filterType);

    if (!alerts.length) {
      container.innerHTML = `<div class="empty-state"><svg viewBox="0 0 24 24"><path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0"/></svg><div class="empty-title">No alerts match these filters</div></div>`;
      return;
    }

    container.innerHTML = `<div class="flex-col gap-8">
      ${alerts.map(a => {
        const urgencyMap = { urgent: 'badge-red', review: 'badge-amber', watch: 'badge-emerald' };
        const typeIcons = {
          'Bonus Rate Change': '📉',
          'Repo Rate Cut': '🏦',
          'Policy Anniversary': '📅',
          'Tax Season Reminder': '📋',
        };
        return `
          <div class="expand-row" id="alert-${a.id}" style="opacity:${a.actioned ? 0.55 : 1}">
            <div class="expand-header" onclick="AlertsScreen.toggleAlert('alert-${a.id}')">
              <div class="urgency-dot ${a.urgency}"></div>
              <div style="font-size:1.1rem;">${typeIcons[a.type] || '🔔'}</div>
              <div style="flex:1;">
                <div class="flex items-center gap-8 flex-wrap">
                  <span class="font-700">${a.client}</span>
                  <span class="badge ${urgencyMap[a.urgency]}">${a.urgency.charAt(0).toUpperCase()+a.urgency.slice(1)}</span>
                  <span class="badge badge-sage">${a.type}</span>
                  ${a.actioned ? '<span class="badge badge-sage" style="opacity:0.7;">✓ Actioned</span>' : ''}
                </div>
                <div class="text-sm text-muted mt-2">${a.message.slice(0,80)}…</div>
              </div>
              <div class="fin-num text-xs text-muted" style="flex-shrink:0;">${a.date}</div>
              <div class="expand-chevron"><svg viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg></div>
            </div>
            <div class="expand-body">
              <p class="text-sm mb-16">${a.message}</p>
              <div class="flex gap-8">
                ${a.clientId ? `<button class="btn btn-primary btn-sm" onclick="App.navigate('profile',{clientId:'${a.clientId}'})">View Client →</button>` : ''}
                ${!a.actioned ? `<button class="btn btn-secondary btn-sm" onclick="AlertsScreen.markActioned('${a.id}')">✓ Mark as Actioned</button>` : '<span class="text-sm text-muted">Already actioned</span>'}
              </div>
            </div>
          </div>`;
      }).join('')}
    </div>`;
  },

  toggleAlert(id) {
    const el = document.getElementById(id);
    if (el) el.classList.toggle('open');
  },

  markActioned(id) {
    const alert = BB_DATA.alerts.find(a => a.id === id);
    if (alert) alert.actioned = true;
    this.renderFeed();
  },

  setUrgency(u, btn) {
    this.filterUrgency = u;
    document.querySelectorAll('.filter-chip[data-u]').forEach(c => c.classList.remove('active'));
    if (btn) btn.classList.add('active');
    this.renderFeed();
  },

  setType(t, btn) {
    this.filterType = t;
    document.querySelectorAll('.filter-chip[data-t]').forEach(c => c.classList.remove('active'));
    if (btn) btn.classList.add('active');
    this.renderFeed();
  },
};
window.AlertsScreen = AlertsScreen;


/* ── Screen 12: Report Preview ────────────────────────────── */
const ReportScreen = {
  render(container, clientId) {
    const client = BB_DATA.clients.find(c => c.id === clientId) || BB_DATA.clients[0];
    const snap = BB_DATA.taxSnapshots[client.id] || BB_DATA.taxSnapshots.c01;
    const policies = BB_DATA.policies[client.id] || [];
    const today = new Date().toLocaleDateString('en-IN', { day:'numeric', month:'long', year:'numeric' });
    const scoreColor = client.score >= 70 ? '#1B7A55' : client.score >= 50 ? '#C97A2E' : '#C0392B';

    container.innerHTML = `
      <div class="page-container">
        <div class="mb-16 flex items-center gap-12">
          <button class="btn btn-ghost btn-sm" onclick="App.navigate('profile',{clientId:'${client.id}'})">← Back to ${client.name}</button>
        </div>
        <div class="page-header fade-up fade-up-1">
          <h1 class="page-title">Report Preview</h1>
          <p class="page-subtitle">PDF summary as it will appear when exported — branded with your firm details.</p>
        </div>

        <div class="flex justify-center gap-12 mb-24 fade-up fade-up-2">
          <button class="btn btn-primary">
            <svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Download PDF
          </button>
          <button class="btn btn-secondary">
            <svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            Send via WhatsApp
          </button>
        </div>

        <!-- Paper-like report card -->
        <div class="report-paper fade-up fade-up-3" style="margin-bottom:32px;">
          <!-- Report header -->
          <div class="report-header">
            <div class="flex justify-between items-start">
              <div>
                <div style="font-size:1.4rem;font-weight:800;letter-spacing:-0.02em;">${App.state.firmName}</div>
                <div style="font-size:0.75rem;opacity:0.7;margin-top:2px;">Financial Analysis Report · Powered by BachatBeat</div>
              </div>
              <div style="text-align:right;">
                <div style="font-size:0.75rem;opacity:0.7;">Report Date</div>
                <div style="font-family:var(--font-mono);font-size:0.85rem;">${today}</div>
              </div>
            </div>
          </div>

          <!-- Report body -->
          <div class="report-body">
            <!-- Client section -->
            <div class="report-section">
              <div class="flex justify-between items-center flex-wrap gap-12">
                <div>
                  <div style="font-size:0.7rem;text-transform:uppercase;letter-spacing:0.08em;color:#6B7575;margin-bottom:4px;">Client</div>
                  <div style="font-size:1.4rem;font-weight:800;">${client.name}</div>
                  <div style="font-size:0.85rem;color:#6B7575;">Age ${client.age} · Tax Slab: ${client.taxSlab}</div>
                </div>
                <div style="text-align:center;background:${scoreColor}14;border:2px solid ${scoreColor};border-radius:50%;width:80px;height:80px;display:flex;flex-direction:column;align-items:center;justify-content:center;">
                  <div style="font-family:var(--font-mono);font-size:1.6rem;font-weight:800;color:${scoreColor};line-height:1;">${client.score}</div>
                  <div style="font-size:0.6rem;color:${scoreColor};text-transform:uppercase;font-weight:700;">Score</div>
                </div>
              </div>
            </div>

            <!-- Key findings -->
            <div class="report-section">
              <div style="font-size:0.7rem;text-transform:uppercase;letter-spacing:0.08em;color:#6B7575;margin-bottom:12px;">Key Finding</div>
              <div style="background:#FFF5E6;border-left:3px solid #C97A2E;padding:12px 16px;border-radius:4px;font-size:0.88rem;">
                ${client.reason}
              </div>
              <div style="margin-top:12px;font-size:0.88rem;color:#1A1F1C;">
                <strong>Trapped Capital Identified:</strong> <span style="font-family:var(--font-mono);color:${scoreColor};font-weight:700;">${client.totalTrapped}</span>
              </div>
            </div>

            <!-- Asset summary -->
            <div class="report-section">
              <div style="font-size:0.7rem;text-transform:uppercase;letter-spacing:0.08em;color:#6B7575;margin-bottom:12px;">Asset Portfolio Summary</div>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
                ${[
                  ['🛡 Insurance Policies', client.assets.policies + ' policies tracked'],
                  ['🏦 Fixed Deposits', client.assets.fds + ' FDs tracked'],
                  ['📈 Mutual Funds / SIPs', client.assets.mfs + ' funds tracked'],
                  ['🏠 Loans', client.assets.loans + ' loan(s) tracked'],
                ].map(([label, val]) => `
                  <div style="background:#F5F7F5;border-radius:6px;padding:8px 12px;">
                    <div style="font-size:0.82rem;font-weight:600;">${label}</div>
                    <div style="font-size:0.78rem;color:#6B7575;">${val}</div>
                  </div>`).join('')}
              </div>
            </div>

            <!-- Policy analysis if available -->
            ${policies.length > 0 ? `
            <div class="report-section">
              <div style="font-size:0.7rem;text-transform:uppercase;letter-spacing:0.08em;color:#6B7575;margin-bottom:12px;">Insurance Analysis Highlights</div>
              ${policies.filter(p=>p.irr).slice(0,2).map(p => `
                <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid #ECF1EC;font-size:0.85rem;">
                  <div><strong>${p.insurer} ${p.type}</strong> · IRR: <span style="font-family:var(--font-mono);color:${p.irr<6?'#C0392B':'#1B7A55'};font-weight:700;">${p.irr}%</span></div>
                  <span style="background:${p.tag==='surrender'?'#FDECEA':p.tag==='review'?'#F5E6D3':'#DFF0E8'};color:${p.tag==='surrender'?'#C0392B':p.tag==='review'?'#C97A2E':'#1B7A55'};font-size:0.7rem;font-weight:700;padding:3px 8px;border-radius:99px;">${p.tag==='surrender'?'Surrender Recommended':p.tag==='review'?'Review':'Healthy'}</span>
                </div>`).join('')}
            </div>` : ''}

            <!-- Tax section if available -->
            ${snap ? `
            <div class="report-section">
              <div style="font-size:0.7rem;text-transform:uppercase;letter-spacing:0.08em;color:#6B7575;margin-bottom:12px;">Tax Recommendation</div>
              <div style="display:flex;justify-content:space-between;align-items:center;">
                <div style="font-size:0.88rem;"><strong>Old Regime recommended</strong> — saves <span style="font-family:var(--font-mono);font-weight:700;color:#1B7A55;">₹${snap.savings.toLocaleString('en-IN')}</span> vs New Regime this year.</div>
              </div>
            </div>` : ''}

            <!-- Disclaimer -->
            <div style="font-size:0.68rem;color:#9AABAA;line-height:1.6;margin-top:8px;">
              This report is prepared for advisory purposes only. All projections are based on current data and assumptions. Past performance of financial instruments is not indicative of future returns. Please consult a qualified financial advisor before making investment decisions. This report was generated using BachatBeat Financial Analytics Platform.
            </div>
          </div>
        </div>
      </div>`;
  },
};
window.ReportScreen = ReportScreen;
