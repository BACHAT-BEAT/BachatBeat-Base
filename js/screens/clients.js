/* ============================================================
   BachatBeat — screens/clients.js
   Screen 3: All Clients — searchable, filterable table + card view
   ============================================================ */

const ClientsScreen = {
  viewMode: 'table',
  filterUrgency: 'all',
  searchQuery: '',

  render(container) {
    this.viewMode = 'table';
    this.filterUrgency = 'all';
    this.searchQuery = '';

    container.innerHTML = `
      <div class="page-container">
        <div class="page-header fade-up fade-up-1">
          <div class="flex items-center justify-between" style="flex-wrap:wrap;gap:12px;">
            <div>
              <h1 class="page-title">All Clients</h1>
              <p class="page-subtitle">${BB_DATA.clients.length} clients managed · Click any row to view full profile</p>
            </div>
            <div class="flex gap-8">
              <button class="btn btn-secondary btn-sm" id="view-toggle-btn" onclick="ClientsScreen.toggleView()">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
                </svg>
                Card View
              </button>
              <button class="btn btn-primary" onclick="ClientsScreen.openAddClient()">
                <svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Add New Client
              </button>
            </div>
          </div>
        </div>

        <!-- Filter Bar -->
        <div class="filter-bar fade-up fade-up-2">
          <div class="topbar-search" style="max-width:280px;">
            <span class="topbar-search-icon">
              <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </span>
            <input type="text" class="form-input" id="client-search" placeholder="Search clients…" 
              style="padding-left:36px;" oninput="ClientsScreen.onSearch(this.value)"/>
          </div>
          <div class="flex gap-6">
            <button class="filter-chip active" data-filter="all" onclick="ClientsScreen.setFilter('all',this)">All</button>
            <button class="filter-chip" data-filter="urgent" onclick="ClientsScreen.setFilter('urgent',this)">
              <span class="urgency-dot urgent" style="width:6px;height:6px;"></span> Urgent
            </button>
            <button class="filter-chip" data-filter="review" onclick="ClientsScreen.setFilter('review',this)">
              <span class="urgency-dot review" style="width:6px;height:6px;"></span> Review
            </button>
            <button class="filter-chip" data-filter="watch" onclick="ClientsScreen.setFilter('watch',this)">
              <span class="urgency-dot watch" style="width:6px;height:6px;"></span> Watch
            </button>
          </div>
          <select class="form-select" style="width:180px;padding:6px 12px;font-size:0.82rem;" onchange="ClientsScreen.setSort(this.value)">
            <option value="score_asc">Sort: Worst score first</option>
            <option value="score_desc">Sort: Best score first</option>
            <option value="name">Sort: Name A–Z</option>
            <option value="reviewed">Sort: Last reviewed</option>
          </select>
        </div>

        <!-- Content area -->
        <div id="clients-content" class="fade-up fade-up-3"></div>
      </div>

      <!-- Add Client Modal -->
      <div id="add-client-modal" class="modal-overlay" style="display:none;">
        <div class="modal">
          <div class="modal-header">
            <span class="modal-title">Add New Client</span>
            <button class="modal-close" onclick="document.getElementById('add-client-modal').style.display='none'">
              <svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
          <div class="modal-body">
            <form id="add-client-form" class="flex-col gap-16">
              <div class="form-grid-2">
                <div class="form-group">
                  <label class="form-label">Full Name</label>
                  <input type="text" class="form-input" id="nc-name" placeholder="e.g. Kiran Desai" required/>
                </div>
                <div class="form-group">
                  <label class="form-label">Date of Birth</label>
                  <input type="date" class="form-input" id="nc-dob"/>
                </div>
              </div>
              <div class="form-grid-2">
                <div class="form-group">
                  <label class="form-label">Phone</label>
                  <input type="tel" class="form-input" id="nc-phone" placeholder="98765-43210"/>
                </div>
                <div class="form-group">
                  <label class="form-label">Email</label>
                  <input type="email" class="form-input" id="nc-email" placeholder="kiran@email.com"/>
                </div>
              </div>
              <div class="form-group">
                <label class="form-label">Tax Slab</label>
                <select class="form-select" id="nc-taxslab">
                  <option value="5%">5% — Income up to ₹5L (New Regime)</option>
                  <option value="20%">20% — Income ₹5L–₹10L</option>
                  <option value="30%">30% — Income above ₹10L</option>
                </select>
              </div>
              <div class="flex gap-8" style="justify-content:flex-end">
                <button type="button" class="btn btn-secondary" onclick="document.getElementById('add-client-modal').style.display='none'">Cancel</button>
                <button type="submit" class="btn btn-primary">
                  <svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  Add Client
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;

    this.renderContent();
    this.bindAddForm();
  },

  getFilteredClients() {
    let list = [...BB_DATA.clients];
    if (this.filterUrgency !== 'all') {
      list = list.filter(c => c.urgency === this.filterUrgency);
    }
    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      list = list.filter(c => c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q));
    }
    return list;
  },

  renderContent() {
    const container = document.getElementById('clients-content');
    const clients = this.getFilteredClients();

    if (!clients.length) {
      container.innerHTML = `<div class="empty-state">
        <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
        <div class="empty-title">No clients found</div>
        <div class="empty-text">Try adjusting your filters or search query</div>
      </div>`;
      return;
    }

    if (this.viewMode === 'table') {
      this.renderTable(container, clients);
    } else {
      this.renderCards(container, clients);
    }
  },

  renderTable(container, clients) {
    container.innerHTML = `
      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Client Name</th>
              <th>Health Score</th>
              <th>Tax Slab</th>
              <th>Assets Tracked</th>
              <th>Trapped Capital</th>
              <th>Last Reviewed</th>
              <th>Urgency</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            ${clients.map(c => this.renderTableRow(c)).join('')}
          </tbody>
        </table>
      </div>`;
  },

  renderTableRow(c) {
    const urgencyMap   = { urgent: 'badge-red', review: 'badge-amber', watch: 'badge-emerald' };
    const urgencyLabel = { urgent: 'Urgent', review: 'Review', watch: 'Watch' };
    const scoreColor   = c.score >= 70 ? 'var(--color-green)' : c.score >= 50 ? 'var(--color-amber)' : 'var(--color-red)';
    const totalAssets  = c.assets.policies + c.assets.fds + c.assets.mfs + c.assets.loans;
    const rev = new Date(c.lastReviewed).toLocaleDateString('en-IN', {day:'numeric',month:'short'});

    return `
      <tr onclick="App.navigate('profile',{clientId:'${c.id}'})" tabindex="0"
          onkeydown="if(event.key==='Enter')App.navigate('profile',{clientId:'${c.id}'})">
        <td><div class="urgency-dot ${c.urgency}"></div></td>
        <td>
          <div class="flex items-center gap-10">
            <div class="client-avatar">${c.name.split(' ').map(w=>w[0]).join('').slice(0,2)}</div>
            <div>
              <div style="font-weight:600;">${c.name}</div>
              <div class="text-xs text-muted">Age ${c.age} · ${c.email}</div>
            </div>
          </div>
        </td>
        <td>
          <div class="flex items-center gap-8">
            <div style="width:34px;height:34px;position:relative;">
              <svg width="34" height="34" viewBox="0 0 34 34">
                <circle cx="17" cy="17" r="13" fill="none" stroke="var(--color-sage-dark)" stroke-width="4"/>
                <circle cx="17" cy="17" r="13" fill="none" stroke="${scoreColor}" stroke-width="4"
                  stroke-dasharray="${2*Math.PI*13}"
                  stroke-dashoffset="${2*Math.PI*13*(1-c.score/100)}"
                  stroke-linecap="round"
                  style="transform:rotate(-90deg);transform-origin:center;"/>
              </svg>
              <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:0.62rem;font-weight:700;font-family:var(--font-mono);color:${scoreColor}">${c.score}</div>
            </div>
          </div>
        </td>
        <td><span class="badge badge-sage fin-num">${c.taxSlab}</span></td>
        <td>
          <div class="flex gap-6 flex-wrap">
            ${c.assets.policies>0?`<span class="badge badge-teal">${c.assets.policies} policies</span>`:''}
            ${c.assets.fds>0?`<span class="badge badge-sage">${c.assets.fds} FDs</span>`:''}
            ${c.assets.mfs>0?`<span class="badge badge-sage">${c.assets.mfs} MFs</span>`:''}
            ${c.assets.loans>0?`<span class="badge badge-amber">${c.assets.loans} loans</span>`:''}
          </div>
        </td>
        <td><span class="fin-num font-600" style="color:var(--color-red)">${c.totalTrapped}</span></td>
        <td><span class="fin-num text-sm text-muted">${rev}</span></td>
        <td><span class="badge ${urgencyMap[c.urgency]}">${urgencyLabel[c.urgency]}</span></td>
        <td>
          <button class="btn btn-secondary btn-sm" onclick="event.stopPropagation();App.navigate('profile',{clientId:'${c.id}'})">
            View →
          </button>
        </td>
      </tr>`;
  },

  renderCards(container, clients) {
    container.innerHTML = `<div class="grid-auto">
      ${clients.map(c => {
        const scoreColor = c.score >= 70 ? 'var(--color-green)' : c.score >= 50 ? 'var(--color-amber)' : 'var(--color-red)';
        const urgencyMap = { urgent: 'badge-red', review: 'badge-amber', watch: 'badge-emerald' };
        const urgencyLabel = { urgent: 'Urgent', review: 'Review', watch: 'Watch' };
        return `
          <div class="card" style="cursor:pointer;" onclick="App.navigate('profile',{clientId:'${c.id}'})">
            <div class="flex justify-between items-start mb-12">
              <div class="flex items-center gap-10">
                <div class="client-avatar">${c.name.split(' ').map(w=>w[0]).join('').slice(0,2)}</div>
                <div>
                  <div style="font-weight:700;">${c.name}</div>
                  <div class="text-xs text-muted">Age ${c.age} · ${c.taxSlab}</div>
                </div>
              </div>
              <span class="badge ${urgencyMap[c.urgency]}">${urgencyLabel[c.urgency]}</span>
            </div>
            <div class="flex justify-between items-center mb-12">
              <div>
                <div class="text-xs text-muted mb-4">Trapped Capital</div>
                <div class="fin-num font-700" style="color:var(--color-red);font-size:1.1rem;">${c.totalTrapped}</div>
              </div>
              <div style="text-align:right;">
                <div class="text-xs text-muted mb-4">Health Score</div>
                <div class="fin-num font-700" style="color:${scoreColor};font-size:1.4rem;">${c.score}/100</div>
              </div>
            </div>
            <div class="text-xs text-muted">${c.reason}</div>
          </div>`;
      }).join('')}
    </div>`;
  },

  toggleView() {
    this.viewMode = this.viewMode === 'table' ? 'cards' : 'table';
    const btn = document.getElementById('view-toggle-btn');
    if (btn) btn.innerHTML = this.viewMode === 'table'
      ? `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg> Card View`
      : `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg> Table View`;
    this.renderContent();
  },

  setFilter(urgency, btn) {
    this.filterUrgency = urgency;
    document.querySelectorAll('.filter-chip[data-filter]').forEach(c => c.classList.remove('active'));
    if (btn) btn.classList.add('active');
    this.renderContent();
  },

  onSearch(query) {
    this.searchQuery = query;
    this.renderContent();
  },

  setSort(mode) {
    const clients = BB_DATA.clients;
    if (mode === 'score_asc') clients.sort((a,b) => a.score - b.score);
    else if (mode === 'score_desc') clients.sort((a,b) => b.score - a.score);
    else if (mode === 'name') clients.sort((a,b) => a.name.localeCompare(b.name));
    else if (mode === 'reviewed') clients.sort((a,b) => new Date(b.lastReviewed) - new Date(a.lastReviewed));
    this.renderContent();
  },

  openAddClient() {
    document.getElementById('add-client-modal').style.display = 'flex';
  },

  bindAddForm() {
    const form = document.getElementById('add-client-form');
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('nc-name').value;
      document.getElementById('add-client-modal').style.display = 'none';
      // In demo: just show a toast-style note
      this.showToast(`Client "${name}" added successfully`);
      this.renderContent();
    });
  },

  showToast(msg) {
    const toast = document.createElement('div');
    toast.style.cssText = `position:fixed;bottom:24px;right:24px;background:var(--color-emerald);color:white;padding:12px 20px;border-radius:var(--radius-md);box-shadow:var(--shadow-lg);font-size:0.88rem;font-weight:600;z-index:400;animation:fade-up 0.3s ease forwards;`;
    toast.textContent = '✓ ' + msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3500);
  },
};

window.ClientsScreen = ClientsScreen;
