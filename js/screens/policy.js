/* ============================================================
   BachatBeat — screens/policy.js
   Screen 5: Add & Analyze Policy
   ============================================================ */

const PolicyScreen = {
  step: 'form', // 'form' | 'results'
  postTax: false,

  render(container, clientId) {
    this.step = 'form';
    this.postTax = false;
    const client = BB_DATA.clients.find(c => c.id === clientId) || BB_DATA.clients[0];
    this.client = client;

    container.innerHTML = `
      <div class="page-container">
        <div class="mb-16 fade-up fade-up-1">
          <button class="btn btn-ghost btn-sm" onclick="App.navigate('profile',{clientId:'${client.id}'})">
            <svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>
            Back to ${client.name}
          </button>
        </div>

        <div class="page-header fade-up fade-up-2">
          <h1 class="page-title">Add & Analyse Policy</h1>
          <p class="page-subtitle">Enter policy details or upload a document to extract them automatically.</p>
        </div>

        <div class="grid-2 fade-up fade-up-3" style="grid-template-columns:1fr 380px;align-items:start;gap:24px;">
          <!-- Form -->
          <div class="card">
            <form id="policy-form">
              <div class="form-grid-2" style="margin-bottom:16px;">
                <div class="form-group">
                  <label class="form-label">Insurer</label>
                  <select class="form-select" id="pol-insurer">
                    <option value="">Select insurer…</option>
                    <option value="LIC">LIC of India</option>
                    <option value="HDFC Life">HDFC Life Insurance</option>
                    <option value="SBI Life">SBI Life Insurance</option>
                    <option value="ICICI Prudential">ICICI Prudential Life</option>
                    <option value="Max Life">Max Life Insurance</option>
                    <option value="Bajaj Allianz">Bajaj Allianz Life</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label">Policy Type</label>
                  <select class="form-select" id="pol-type">
                    <option value="">Select type…</option>
                    <option value="Jeevan Anand">LIC Jeevan Anand</option>
                    <option value="New Endowment">LIC New Endowment</option>
                    <option value="Jeevan Labh">LIC Jeevan Labh</option>
                    <option value="ULIP">ULIP</option>
                    <option value="Term Plan">Term Plan</option>
                    <option value="Endowment">Endowment Plan</option>
                  </select>
                </div>
              </div>

              <div class="form-grid-2" style="margin-bottom:16px;">
                <div class="form-group">
                  <label class="form-label">Annual Premium (₹)</label>
                  <input type="number" class="form-input mono" id="pol-premium" placeholder="e.g. 52000"/>
                </div>
                <div class="form-group">
                  <label class="form-label">Sum Assured (₹)</label>
                  <input type="number" class="form-input mono" id="pol-sa" placeholder="e.g. 1000000"/>
                </div>
              </div>

              <div class="form-grid-2" style="margin-bottom:16px;">
                <div class="form-group">
                  <label class="form-label">Years Already Paid</label>
                  <input type="number" class="form-input mono" id="pol-years" placeholder="e.g. 12" min="1"/>
                </div>
                <div class="form-group">
                  <label class="form-label">Policy Start Date</label>
                  <input type="date" class="form-input" id="pol-start"/>
                </div>
              </div>

              <div class="form-group" style="margin-bottom:20px;">
                <label class="form-label">Bonus Received So Far (₹)</label>
                <input type="number" class="form-input mono" id="pol-bonus" placeholder="e.g. 384000"/>
              </div>

              <button type="submit" class="btn btn-primary w-full">
                <svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                Analyse Policy
              </button>
            </form>
          </div>

          <!-- Upload zone -->
          <div class="card">
            <div class="card-title mb-12">Upload Policy Document</div>
            <div class="upload-zone" id="upload-zone">
              <div class="upload-zone-icon">
                <svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              </div>
              <div class="font-600 mb-4">Drop PDF here or click to browse</div>
              <div class="text-xs text-muted">For demo: uploading will auto-fill a sample policy's details</div>
              <input type="file" id="policy-file" accept=".pdf" style="display:none;"/>
            </div>
            <div id="upload-status" class="mt-12"></div>

            <div class="card-divider"></div>
            <div class="text-xs text-muted">
              <strong>Demo note:</strong> Uploading a PDF triggers a simulated extraction. In production, BachatBeat reads policy documents and extracts premium, sum assured, bonus, and plan type automatically.
            </div>
          </div>
        </div>

        <!-- Results section (hidden until analysis) -->
        <div id="policy-results" style="display:none;margin-top:24px;"></div>
      </div>
    `;

    this.bindFormEvents();
    this.bindUpload();
  },

  bindFormEvents() {
    const form = document.getElementById('policy-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.runAnalysis();
    });
  },

  bindUpload() {
    const zone = document.getElementById('upload-zone');
    const fileInput = document.getElementById('policy-file');

    zone.addEventListener('click', () => fileInput.click());
    zone.addEventListener('dragover', (e) => { e.preventDefault(); zone.classList.add('drag-over'); });
    zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
    zone.addEventListener('drop', (e) => {
      e.preventDefault();
      zone.classList.remove('drag-over');
      this.simulateExtraction();
    });

    fileInput.addEventListener('change', () => {
      if (fileInput.files.length) this.simulateExtraction();
    });
  },

  simulateExtraction() {
    const zone = document.getElementById('upload-zone');
    const status = document.getElementById('upload-status');

    zone.classList.add('processing');
    zone.innerHTML = `
      <div class="spinner" style="margin:0 auto 12px;"></div>
      <div class="font-600">Extracting policy details…</div>
      <div class="text-xs text-muted">Reading document structure</div>`;

    status.innerHTML = '';

    setTimeout(() => {
      zone.classList.remove('processing');
      zone.innerHTML = `
        <div style="color:var(--color-emerald);font-size:2rem;margin-bottom:8px;">✓</div>
        <div class="font-600" style="color:var(--color-emerald);">Extraction complete</div>
        <div class="text-xs text-muted">7 fields extracted from policy document</div>`;

      // Auto-fill form with sample extracted values
      const fillData = {
        insurer: 'LIC', type: 'Jeevan Anand',
        premium: 52000, sa: 1000000,
        years: 12, bonus: 384000,
      };

      const sel = (id) => document.getElementById(id);
      if (sel('pol-insurer')) sel('pol-insurer').value = fillData.insurer;
      if (sel('pol-type')) sel('pol-type').value = fillData.type;
      if (sel('pol-premium')) sel('pol-premium').value = fillData.premium;
      if (sel('pol-sa')) sel('pol-sa').value = fillData.sa;
      if (sel('pol-years')) sel('pol-years').value = fillData.years;
      if (sel('pol-bonus')) sel('pol-bonus').value = fillData.bonus;
      if (sel('pol-start')) sel('pol-start').value = '2014-04-01';

      status.innerHTML = `
        <div class="callout callout-emerald">
          <div class="callout-icon"><svg viewBox="0 0 24 24"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg></div>
          <div><div class="callout-title">Fields auto-filled</div>
          <div class="callout-text">Review the form and click "Analyse Policy" to proceed.</div></div>
        </div>`;
    }, 1800);
  },

  runAnalysis() {
    const resultsDiv = document.getElementById('policy-results');
    const submitBtn = document.querySelector('#policy-form button[type="submit"]');

    submitBtn.innerHTML = `<div class="spinner" style="width:16px;height:16px;border-width:2px;border-top-color:white;display:inline-block;margin-right:8px;"></div> Calculating IRR & projections…`;
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.innerHTML = `<svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg> Analyse Policy`;
      submitBtn.disabled = false;

      resultsDiv.style.display = 'block';
      resultsDiv.innerHTML = this.renderResults();
      resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Animate bars
      setTimeout(() => {
        document.querySelectorAll('.result-bar[data-width]').forEach(el => {
          el.style.transition = 'width 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
          el.style.width = el.dataset.width + '%';
        });
      }, 300);

      this.bindPostTaxToggle();
    }, 1600);
  },

  renderResults() {
    const p = BB_DATA.policies.c01?.[0]; // Use Amit's first policy as demo
    const maxCorpus = Math.max(p.continuedCorpus, p.surrenderCorpus, p.paidUpCorpus);

    return `
      <div class="card fade-up fade-up-1">
        <div class="card-header">
          <span class="card-title">Analysis Results — LIC Jeevan Anand</span>
          <div class="toggle-switch" onclick="PolicyScreen.togglePostTax()">
            <div class="toggle-track" id="posttax-track"></div>
            <span class="text-sm font-600">Post-tax view</span>
          </div>
        </div>

        <!-- IRR highlight -->
        <div class="flex items-center gap-24 mb-24" style="flex-wrap:wrap;">
          <div>
            <div class="text-xs text-muted mb-4" style="text-transform:uppercase;letter-spacing:0.05em;">Current IRR</div>
            <div class="fin-num-xl" style="color:var(--color-red);">${p.irr}%</div>
          </div>
          <div style="color:var(--color-text-faint);font-size:1.5rem;">vs</div>
          <div>
            <div class="text-xs text-muted mb-4">Inflation Rate</div>
            <div class="fin-num" style="font-size:1.6rem;font-weight:700;color:var(--color-amber);">6.2%</div>
          </div>
          <div style="color:var(--color-text-faint);font-size:1.5rem;">=</div>
          <div class="callout callout-red" style="flex:1;min-width:200px;">
            <div class="callout-icon"><svg viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/></svg></div>
            <div>
              <div class="callout-title">Real return: −1.4%</div>
              <div class="callout-text">This policy is destroying purchasing power after inflation.</div>
            </div>
          </div>
        </div>

        <!-- 3-bar scenario comparison -->
        <div class="mb-20">
          <div class="font-700 mb-16">Projected Corpus at Age 60</div>
          ${this.resultBar('Continue Policy', p.continuedCorpus, maxCorpus, false)}
          ${this.resultBar('Surrender + Reinvest in ELSS', p.surrenderCorpus, maxCorpus, true)}
          ${this.resultBar('Make Paid-Up', p.paidUpCorpus, maxCorpus, false)}
        </div>

        <!-- GSV / SSV breakdown -->
        <div class="grid-2 mb-20">
          <div class="card-sage">
            <div class="text-xs text-muted mb-4">Guaranteed Surrender Value (GSV)</div>
            <div class="fin-num font-700 text-xl">${App.formatRupee(p.gsv)}</div>
            <div class="text-xs text-muted mt-4">Minimum guaranteed by LIC's surrender formula (typically 30-50% of premiums paid)</div>
          </div>
          <div class="card-sage" style="border:1.5px solid var(--color-emerald);">
            <div class="text-xs text-muted mb-4">Special Surrender Value (SSV) — estimated</div>
            <div class="fin-num font-700 text-xl" style="color:var(--color-emerald)">${App.formatRupee(p.ssv)}</div>
            <div class="text-xs text-muted mt-4">Higher of GSV or bonus-based calculation — typically the actual payout</div>
          </div>
        </div>

        <!-- Potential gain callout -->
        <div style="background:linear-gradient(135deg,var(--color-emerald),var(--color-teal));border-radius:var(--radius-lg);padding:20px 24px;color:white;margin-bottom:16px;">
          <div style="font-size:0.78rem;opacity:0.8;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:4px;">Potential Gain if Optimised</div>
          <div class="fin-num-xl" style="color:white;" id="potential-gain-display">${App.formatRupee(p.potentialGain)}</div>
          <div style="font-size:0.88rem;opacity:0.8;margin-top:6px;">additional corpus by age 60 if surrendered and redirected to ELSS today</div>
        </div>

        <div class="text-xs text-muted">
          Projections assume 12% CAGR for ELSS reinvestment, 30% tax slab. Post-tax ELSS returns are adjusted for LTCG at 12.5% above ₹1.25L.
        </div>
      </div>
    `;
  },

  resultBar(label, value, max, isRecommended) {
    const pct = Math.round((value / max) * 100);
    return `
      <div class="bar-row mb-8" style="align-items:center;gap:16px;">
        <div style="width:220px;flex-shrink:0;">
          <div class="text-sm font-600">${label}</div>
          ${isRecommended ? '<span class="badge badge-emerald" style="margin-top:3px;">Recommended ✓</span>' : ''}
        </div>
        <div class="bar-track" style="height:14px;">
          <div class="result-bar bar-fill ${isRecommended ? 'bar-fill-1' : ''}" data-width="${pct}"
            style="background:${isRecommended ? 'var(--color-emerald)' : 'var(--color-sage-dark)'};width:0%;height:14px;border-radius:99px;"></div>
        </div>
        <div class="fin-num font-700" style="width:110px;flex-shrink:0;">${App.formatRupee(value)}</div>
      </div>`;
  },

  bindPostTaxToggle() {
    // Already handled via onclick in toggle-switch, bind state toggle
  },

  togglePostTax() {
    this.postTax = !this.postTax;
    const track = document.getElementById('posttax-track');
    if (track) track.classList.toggle('on', this.postTax);

    const gainEl = document.getElementById('potential-gain-display');
    if (gainEl) {
      const p = BB_DATA.policies.c01?.[0];
      // Post-tax reduces the gain by ~15% (LTCG on ELSS)
      gainEl.textContent = this.postTax ? App.formatRupee(Math.round(p.potentialGain * 0.85)) : App.formatRupee(p.potentialGain);
    }
  },
};

window.PolicyScreen = PolicyScreen;
