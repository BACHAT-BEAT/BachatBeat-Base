/* ============================================================
   BachatBeat — screens/overlap.js    Screen 6: Policy Overlap Detector
   screens/fd.js                      Screen 7: FD Analysis
   screens/loans.js                   Screen 8: Loan Analysis
   screens/mf.js                      Screen 9: MF/SIP Analysis
   ============================================================ */

/* ── Screen 6: Policy Overlap ─────────────────────────────── */
const OverlapScreen = {
  render(container, clientId) {
    const client = BB_DATA.clients.find(c => c.id === clientId) || BB_DATA.clients[2]; // Rajesh for demo
    container.innerHTML = `
      <div class="page-container">
        <div class="mb-16"><button class="btn btn-ghost btn-sm" onclick="App.navigate('profile',{clientId:'${client.id}'})">← Back to ${client.name}</button></div>
        <div class="page-header"><h1 class="page-title">Policy Overlap Detector</h1><p class="page-subtitle">Identifying redundant coverage across ${client.name}'s insurance portfolio.</p></div>

        <!-- Venn diagram area -->
        <div class="card mb-20 fade-up fade-up-1">
          <div class="card-title mb-16">Coverage Overlap Visualisation</div>
          <div class="flex justify-center mb-20">
            <div class="venn-container" style="position:relative;">
              <div class="venn-circle" style="background:rgba(15,110,86,0.15);border-color:var(--color-emerald);color:var(--color-emerald);">
                <div style="text-align:center;padding:20px 30px 20px 10px;">
                  <div class="font-700" style="font-size:0.75rem;">LIC Jeevan Anand</div>
                  <div class="text-xs">₹20L cover</div>
                  <div class="text-xs mt-4">Death + Hospitalisation rider</div>
                </div>
              </div>
              <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);z-index:5;background:rgba(255,255,255,0.9);border-radius:8px;padding:8px 10px;text-align:center;box-shadow:0 2px 8px rgba(0,0,0,0.1);">
                <div style="font-size:0.65rem;font-weight:700;color:var(--color-red);">OVERLAP</div>
                <div class="fin-num" style="font-size:0.9rem;font-weight:800;color:var(--color-red);">₹18K/yr</div>
                <div style="font-size:0.6rem;color:var(--color-text-muted);">redundant</div>
              </div>
              <div class="venn-circle" style="background:rgba(201,122,46,0.15);border-color:var(--color-amber);color:var(--color-amber);">
                <div style="text-align:center;padding:20px 10px 20px 30px;">
                  <div class="font-700" style="font-size:0.75rem;">LIC Jeevan Labh</div>
                  <div class="text-xs">₹20L cover</div>
                  <div class="text-xs mt-4">Accidental death + Hospitalisation rider</div>
                </div>
              </div>
            </div>
          </div>
          <div class="callout callout-amber mb-16">
            <div class="callout-icon"><svg viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></div>
            <div>
              <div class="callout-title">Combined redundant premium: ₹18,000/year</div>
              <div class="callout-text">Two hospitalisation riders covering the same risk category. In case of a claim, only one insurer pays — the other premium is wasted.</div>
            </div>
          </div>
        </div>

        <!-- Overlap details table -->
        <div class="card fade-up fade-up-2">
          <div class="card-title mb-16">Overlap Details</div>
          <div class="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Policy 1</th>
                  <th>Policy 2</th>
                  <th>Overlap Reason</th>
                  <th>Redundant Premium</th>
                  <th>Recommendation</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>LIC Jeevan Anand</strong><br><span class="text-xs text-muted">Hospitalisation rider ₹12,000/yr</span></td>
                  <td><strong>LIC Jeevan Labh</strong><br><span class="text-xs text-muted">Hospitalisation rider ₹8,000/yr</span></td>
                  <td>Both riders cover non-surgical hospitalisation costs. Max claim is limited to actual expenses regardless of policies held.</td>
                  <td><span class="fin-num font-700" style="color:var(--color-red);">₹8,000/yr</span></td>
                  <td><span class="badge badge-amber">Remove lower-value rider</span></td>
                </tr>
                <tr>
                  <td><strong>LIC Jeevan Anand</strong><br><span class="text-xs text-muted">Accidental death rider ₹6,000/yr</span></td>
                  <td><strong>LIC Jeevan Labh</strong><br><span class="text-xs text-muted">Accidental death benefit ₹4,000/yr</span></td>
                  <td>Both policies pay accident benefit independently — some insurers cap combined payout. Review policy wordings for stacking eligibility.</td>
                  <td><span class="fin-num font-700" style="color:var(--color-amber);">₹4,000/yr</span></td>
                  <td><span class="badge badge-sage">Review policy terms</span></td>
                </tr>
                <tr>
                  <td><strong>ICICI Prudential ULIP</strong><br><span class="text-xs text-muted">Critical illness benefit ₹6,000/yr</span></td>
                  <td><strong>LIC Jeevan Labh</strong><br><span class="text-xs text-muted">Waiver of premium rider</span></td>
                  <td>Critical illness cover overlaps with conditions where waiver of premium is triggered — both activate for the same events.</td>
                  <td><span class="fin-num font-700" style="color:var(--color-amber);">₹6,000/yr</span></td>
                  <td><span class="badge badge-amber">Consider removing one</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>`;
  },
};
window.OverlapScreen = OverlapScreen;


/* ── Screen 7: FD Analysis ────────────────────────────────── */
const FDScreen = {
  render(container, clientId) {
    const client = BB_DATA.clients.find(c => c.id === clientId) || BB_DATA.clients[3]; // Sunita for demo
    const fds = BB_DATA.fds[client.id] || BB_DATA.fds.c04 || [];
    const mainFD = fds[0] || BB_DATA.fds.c01?.[0];

    container.innerHTML = `
      <div class="page-container">
        <div class="mb-16"><button class="btn btn-ghost btn-sm" onclick="App.navigate('profile',{clientId:'${client.id}'})">← Back to ${client.name}</button></div>
        <div class="page-header"><h1 class="page-title">Fixed Deposit Analysis</h1><p class="page-subtitle">Break vs Hold decisions, FD ladder, and reinvestment scenarios for ${client.name}.</p></div>

        <!-- FD Summary Cards -->
        <div class="grid-auto mb-24 fade-up fade-up-1">
          ${fds.map((fd,i) => `
            <div class="card-sm" style="border-left:4px solid ${fd.verdict==='break'?'var(--color-amber)':'var(--color-emerald)'};">
              <div class="font-700 mb-4">${fd.bank}</div>
              <div class="fin-num text-2xl font-700" style="margin-bottom:4px;">${App.formatRupee(fd.principal)}</div>
              <div class="text-xs text-muted">Rate: <span class="fin-num">${fd.rate}%</span> · Maturity: ${fd.maturityDate}</div>
              <div class="text-xs fin-num mt-4" style="color:var(--color-text-muted);">${fd.daysRemaining} days remaining</div>
              <div class="mt-8">
                <span class="badge ${fd.verdict==='break'?'badge-amber':'badge-emerald'}">${fd.verdict==='break'?'⚡ Break Recommended':'✓ Hold to Maturity'}</span>
              </div>
            </div>`).join('')}
        </div>

        <!-- Break / Hold comparison for first FD -->
        ${mainFD ? this.renderBreakHold(mainFD) : ''}

        <!-- FD Ladder visualization -->
        <div class="card mb-20 fade-up fade-up-3">
          <div class="card-title mb-16">FD Maturity Ladder</div>
          <div style="position:relative;padding:32px 0 16px;overflow-x:auto;">
            <div style="height:2px;background:var(--color-border);position:absolute;top:40px;left:0;right:0;"></div>
            <div style="display:flex;justify-content:space-between;position:relative;min-width:500px;padding:0 24px;">
              ${fds.map((fd,i) => {
                const colors = ['var(--color-emerald)','var(--color-teal)','var(--color-amber)','#4DD4A5'];
                const leftPos = (i / (fds.length-1||1)) * 100;
                return `
                  <div style="text-align:center;position:relative;">
                    <div style="width:14px;height:14px;background:${colors[i%colors.length]};border-radius:50%;margin:0 auto 8px;border:3px solid white;box-shadow:0 0 0 2px ${colors[i%colors.length]};"></div>
                    <div class="text-xs font-600">${fd.bank}</div>
                    <div class="fin-num text-xs">${App.formatRupee(fd.principal)}</div>
                    <div class="text-xs text-muted">${fd.maturityDate}</div>
                  </div>`;
              }).join('')}
            </div>
          </div>
          ${fds.length >= 2 ? `
          <div class="callout callout-amber mt-12">
            <div class="callout-icon"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg></div>
            <div><div class="callout-title">Laddering note</div><div class="callout-text">Consider spreading future renewals across 3, 6, and 12-month intervals to avoid liquidity concentration.</div></div>
          </div>` : ''}
        </div>

        <!-- Scenario: Where to invest ₹20L -->
        <div class="card fade-up fade-up-4">
          <div class="card-title mb-4">Where Should I Invest ₹20L?</div>
          <div class="text-xs text-muted mb-16">Post-tax returns for ${client.taxSlab} tax slab · 1-year horizon</div>
          <div class="table-wrapper">
            <table>
              <thead>
                <tr><th>Option</th><th>Expected Return</th><th>Post-tax Return (${client.taxSlab})</th><th>Post-tax Earnings on ₹20L</th><th>Liquidity</th></tr>
              </thead>
              <tbody>
                <tr style="background:var(--color-green-light);">
                  <td><strong>Short Duration Debt Fund</strong><br><span class="badge badge-emerald">Best for ${client.taxSlab} slab</span></td>
                  <td class="fin-num">7.4%</td>
                  <td class="fin-num" style="color:var(--color-green);">7.1%</td>
                  <td class="fin-num font-700" style="color:var(--color-green);">₹1,42,000</td>
                  <td>T+2 days</td>
                </tr>
                <tr>
                  <td><strong>Short Term FD (1 year)</strong></td>
                  <td class="fin-num">7.1%</td>
                  <td class="fin-num">${client.taxSlab === '30%' ? '4.9%' : client.taxSlab === '20%' ? '5.7%' : '6.7%'}</td>
                  <td class="fin-num">${client.taxSlab === '30%' ? '₹98,000' : client.taxSlab === '20%' ? '₹1,14,000' : '₹1,34,000'}</td>
                  <td>Penalty on early exit</td>
                </tr>
                <tr>
                  <td><strong>Liquid Fund</strong></td>
                  <td class="fin-num">6.8%</td>
                  <td class="fin-num">${client.taxSlab === '30%' ? '4.7%' : '5.4%'}</td>
                  <td class="fin-num">${client.taxSlab === '30%' ? '₹94,000' : '₹1,08,000'}</td>
                  <td>Same-day redemption</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>`;
  },

  renderBreakHold(fd) {
    const isBreakWinner = fd.verdict === 'break';
    return `
      <div class="card mb-20 fade-up fade-up-2">
        <div class="card-title mb-16">Break or Hold? — ${fd.bank} FD</div>
        <div class="compare-grid">
          <div class="compare-card ${!isBreakWinner ? 'winner' : ''}">
            ${!isBreakWinner ? '<div class="winner-badge">✓ Hold</div>' : ''}
            <div class="compare-title">Hold to Maturity</div>
            <div class="compare-metric"><span class="compare-metric-label">Current Rate</span><span class="compare-metric-value fin-num">${fd.rate}%</span></div>
            <div class="compare-metric"><span class="compare-metric-label">Post-tax Return</span><span class="compare-metric-value fin-num">${App.formatRupee(fd.postTaxReturn)}</span></div>
            <div class="compare-metric"><span class="compare-metric-label">Penalty</span><span class="compare-metric-value fin-num">None</span></div>
            <div class="compare-metric"><span class="compare-metric-label">Days Remaining</span><span class="compare-metric-value fin-num">${fd.daysRemaining}d</span></div>
          </div>
          <div class="compare-card ${isBreakWinner ? 'winner' : ''}">
            ${isBreakWinner ? '<div class="winner-badge">✓ Winner</div>' : ''}
            <div class="compare-title">Break & Reinvest Today</div>
            <div class="compare-metric"><span class="compare-metric-label">New Rate</span><span class="compare-metric-value fin-num win">${fd.newRateAvailable}%</span></div>
            <div class="compare-metric"><span class="compare-metric-label">Post-tax Return</span><span class="compare-metric-value fin-num ${isBreakWinner ? 'win' : ''}">${App.formatRupee(fd.newPostTaxReturn)}</span></div>
            <div class="compare-metric"><span class="compare-metric-label">Break Penalty</span><span class="compare-metric-value fin-num loss">−${App.formatRupee(fd.penaltyIfBroken)}</span></div>
            <div class="compare-metric"><span class="compare-metric-label">Net Gain</span><span class="compare-metric-value fin-num ${isBreakWinner ? 'win' : ''}">${isBreakWinner ? '+' : ''}${App.formatRupee(Math.abs(fd.verdictGain))}</span></div>
          </div>
        </div>
        ${isBreakWinner ? `
        <div class="callout callout-emerald mt-16">
          <div class="callout-icon"><svg viewBox="0 0 24 24"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg></div>
          <div><div class="callout-title">Breaking wins by ${App.formatRupee(fd.verdictGain)}</div>
          <div class="callout-text">Recoups the ₹${fd.penaltyIfBroken.toLocaleString('en-IN')} penalty in just ${fd.penaltyRecoupMonths} months at the new rate.</div></div>
        </div>` : `
        <div class="callout callout-emerald mt-16">
          <div class="callout-icon"><svg viewBox="0 0 24 24"><path d="M9 12l2 2 4-4"/></svg></div>
          <div><div class="callout-title">Hold is better here</div><div class="callout-text">The rate differential does not justify the penalty cost at this stage. Revisit closer to maturity.</div></div>
        </div>`}
      </div>`;
  },
};
window.FDScreen = FDScreen;


/* ── Screen 8: Loan Analysis ──────────────────────────────── */
const LoanScreen = {
  bonusAmount: 500000,
  returnRate: 12,

  render(container, clientId) {
    const client = BB_DATA.clients.find(c => c.id === clientId) || BB_DATA.clients[0];
    const loans = BB_DATA.loans[client.id] || BB_DATA.loans.c01 || [];
    const loan = loans[0];
    this.loan = loan;

    container.innerHTML = `
      <div class="page-container">
        <div class="mb-16"><button class="btn btn-ghost btn-sm" onclick="App.navigate('profile',{clientId:'${client.id}'})">← Back to ${client.name}</button></div>
        <div class="page-header"><h1 class="page-title">Loan Analysis</h1><p class="page-subtitle">${client.name}'s loan portfolio — prepayment vs investment and balance transfer scenarios.</p></div>

        ${loan ? this.renderLoanCard(loan) : '<div class="callout callout-emerald"><div class="callout-title">No loans tracked for this client.</div></div>'}
        ${loan ? this.renderPrepayInvest(loan, client) : ''}
        ${loan && loan.balanceTransfer?.length ? this.renderBT(loan) : ''}
        ${loan ? this.renderHealthCheck(loan) : ''}
      </div>`;

    if (loan) this.bindSlider();
  },

  renderLoanCard(loan) {
    return `
      <div class="card mb-20 fade-up fade-up-1">
        <div class="flex justify-between items-start flex-wrap gap-16">
          <div>
            <div class="flex items-center gap-10 mb-8">
              <span class="text-xl font-700">${loan.type}</span>
              <span class="badge badge-sage">${loan.lender}</span>
            </div>
            <div class="grid-4" style="gap:20px;">
              <div><div class="text-xs text-muted">Outstanding</div><div class="fin-num font-700 text-xl">${App.formatRupee(loan.outstanding)}</div></div>
              <div><div class="text-xs text-muted">Interest Rate</div><div class="fin-num font-700 text-xl" style="color:var(--color-amber)">${loan.rate}%</div></div>
              <div><div class="text-xs text-muted">EMI</div><div class="fin-num font-700 text-xl">${App.formatRupee(loan.emi)}/mo</div></div>
              <div><div class="text-xs text-muted">Remaining Tenure</div><div class="fin-num font-700 text-xl">${loan.tenure} months</div></div>
            </div>
          </div>
        </div>
      </div>`;
  },

  renderPrepayInvest(loan, client) {
    const bonusAmt = this.bonusAmount;
    const rate = this.returnRate;
    const interestSaved = Math.round(bonusAmt * (loan.rate/100) * (loan.tenure/12) * 0.6);
    const newTenure = Math.round(loan.tenure * (1 - bonusAmt/loan.outstanding) * 0.75);
    const corpus = Math.round(bonusAmt * Math.pow(1 + rate/100, loan.tenure/12));
    const breakeven = (rate > loan.rate) ? 'Investing wins' : 'Prepaying wins';
    const breakevenRate = loan.rate.toFixed(1);

    return `
      <div class="card mb-20 fade-up fade-up-2">
        <div class="card-title mb-16">Prepay vs Invest Calculator</div>
        <div class="flex items-center gap-16 mb-20 flex-wrap">
          <div class="form-group" style="flex:1;min-width:200px;">
            <label class="form-label">Bonus / lump sum available (₹)</label>
            <input type="number" class="form-input mono" value="${bonusAmt}" id="bonus-input" oninput="LoanScreen.updateCalc(this.value)"/>
          </div>
          <div style="flex:1;min-width:200px;">
            <div class="form-label mb-8">Assumed investment return: <span class="fin-num font-700" id="rate-display">${rate}% CAGR</span></div>
            <input type="range" id="rate-slider" min="6" max="18" step="0.5" value="${rate}" oninput="LoanScreen.updateRate(this.value)"/>
          </div>
        </div>

        <div class="compare-grid">
          <div class="compare-card ${rate <= loan.rate ? 'winner' : ''}">
            ${rate <= loan.rate ? '<div class="winner-badge">✓ Prepay wins</div>' : ''}
            <div class="compare-title">If Prepaid</div>
            <div class="compare-metric"><span class="compare-metric-label">New loan-free date</span><span class="compare-metric-value fin-num">${newTenure}mo sooner</span></div>
            <div class="compare-metric"><span class="compare-metric-label">Total interest saved</span><span class="compare-metric-value fin-num win" id="interest-saved">${App.formatRupee(interestSaved)}</span></div>
            <div class="compare-metric"><span class="compare-metric-label">Guaranteed saving</span><span class="compare-metric-value fin-num" style="color:var(--color-emerald)">Yes — risk-free</span></div>
          </div>
          <div class="compare-card ${rate > loan.rate ? 'winner' : ''}">
            ${rate > loan.rate ? '<div class="winner-badge">✓ Invest wins</div>' : ''}
            <div class="compare-title">If Invested at ${rate}%</div>
            <div class="compare-metric"><span class="compare-metric-label">Projected corpus</span><span class="compare-metric-value fin-num win" id="corpus-val">${App.formatRupee(corpus)}</span></div>
            <div class="compare-metric"><span class="compare-metric-label">Time horizon</span><span class="compare-metric-value fin-num">${Math.round(loan.tenure/12)} years</span></div>
            <div class="compare-metric"><span class="compare-metric-label">Risk</span><span class="compare-metric-value fin-num" style="color:var(--color-amber)">Market dependent</span></div>
          </div>
        </div>

        <div class="callout callout-emerald mt-16">
          <div class="callout-icon"><svg viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg></div>
          <div>
            <div class="callout-title" id="breakeven-text">${breakeven} at assumed ${rate}% return</div>
            <div class="callout-text">Investing wins only if returns exceed <span class="fin-num font-700">${breakevenRate}%</span> (your current loan rate, pre-tax). Guaranteed loan saving = risk-free equivalent of ${loan.rate}% return.</div>
          </div>
        </div>
      </div>`;
  },

  renderBT(loan) {
    return `
      <div class="card mb-20 fade-up fade-up-3">
        <div class="card-title mb-16">Balance Transfer Comparison</div>
        <div class="table-wrapper">
          <table>
            <thead><tr><th>Lender</th><th>New Rate</th><th>New EMI</th><th>EMI Saving</th><th>Transfer Cost</th><th>Breakeven Month</th><th></th></tr></thead>
            <tbody>
              <tr><td><strong>${loan.lender}</strong><br><span class="badge badge-sage">Current</span></td><td class="fin-num">${loan.rate}%</td><td class="fin-num">${App.formatRupee(loan.emi)}/mo</td><td>—</td><td>—</td><td>—</td><td></td></tr>
              ${loan.balanceTransfer.map(bt => `
                <tr>
                  <td><strong>${bt.lender}</strong></td>
                  <td class="fin-num" style="color:var(--color-green)">${bt.rate}%</td>
                  <td class="fin-num" style="color:var(--color-green)">${App.formatRupee(bt.newEmi)}/mo</td>
                  <td class="fin-num" style="color:var(--color-emerald)">+${App.formatRupee(loan.emi - bt.newEmi)}/mo</td>
                  <td class="fin-num" style="color:var(--color-red)">−${App.formatRupee(bt.transferCost)}</td>
                  <td class="fin-num font-600">Month ${bt.breakevenMonth}</td>
                  <td><span class="badge ${bt.breakevenMonth <= 12 ? 'badge-emerald':'badge-amber'}">${bt.breakevenMonth <= 12 ? 'Recommend':'Consider'}</span></td>
                </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>`;
  },

  renderHealthCheck(loan) {
    const iconMap = { ok:'<path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/>', warn:'<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/>', alert:'<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/>' };
    return `
      <div class="card fade-up fade-up-4">
        <div class="card-title mb-16">Loan Health Check</div>
        <div class="checklist">
          ${loan.healthChecks.map(h => `
            <div class="check-item">
              <div class="check-icon ${h.status}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">${iconMap[h.status]}</svg></div>
              <div><div class="check-label">${h.label}</div><div class="check-detail">${h.detail}</div></div>
            </div>`).join('')}
        </div>
      </div>`;
  },

  bindSlider() {
    // Already bound via oninput attributes
  },

  updateCalc(val) {
    this.bonusAmount = parseInt(val) || 500000;
    this.refreshCalc();
  },

  updateRate(val) {
    this.returnRate = parseFloat(val);
    const display = document.getElementById('rate-display');
    if (display) display.textContent = `${this.returnRate}% CAGR`;
    this.refreshCalc();
  },

  refreshCalc() {
    const loan = this.loan;
    if (!loan) return;
    const bonusAmt = this.bonusAmount;
    const rate = this.returnRate;
    const interestSaved = Math.round(bonusAmt * (loan.rate/100) * (loan.tenure/12) * 0.6);
    const corpus = Math.round(bonusAmt * Math.pow(1 + rate/100, loan.tenure/12));
    const isSaved = document.getElementById('interest-saved');
    const corpusEl = document.getElementById('corpus-val');
    const breakevenEl = document.getElementById('breakeven-text');
    if (isSaved) isSaved.textContent = App.formatRupee(interestSaved);
    if (corpusEl) corpusEl.textContent = App.formatRupee(corpus);
    if (breakevenEl) breakevenEl.textContent = rate > loan.rate ? `Investing wins at assumed ${rate}% return` : `Prepaying wins — ${rate}% is below loan rate of ${loan.rate}%`;
  },
};
window.LoanScreen = LoanScreen;


/* ── Screen 9: MF/SIP Analysis ───────────────────────────── */
const MFScreen = {
  render(container, clientId) {
    const client = BB_DATA.clients.find(c => c.id === clientId) || BB_DATA.clients[4]; // Vikram
    const mfs = BB_DATA.mfs[client.id] || BB_DATA.mfs.c05 || [];
    const underperforming = mfs.filter(m => m.underperformAmount > 0);
    const totalUnderperform = underperforming.reduce((s,m) => s+m.underperformAmount, 0);
    const totalDirectSavings = mfs.filter(m=>m.type==='Regular').reduce((s,m)=>s+m.directSavings10Y,0);

    container.innerHTML = `
      <div class="page-container">
        <div class="mb-16"><button class="btn btn-ghost btn-sm" onclick="App.navigate('profile',{clientId:'${client.id}'})">← Back to ${client.name}</button></div>
        <div class="page-header"><h1 class="page-title">Mutual Fund & SIP Analysis</h1><p class="page-subtitle">${client.name}'s MF portfolio — performance vs benchmarks, Regular vs Direct gap.</p></div>

        <!-- Underperformance cost callout -->
        ${totalUnderperform > 0 ? `
        <div style="background:linear-gradient(135deg,#7b2d2d,#b03030);color:white;border-radius:var(--radius-lg);padding:20px 24px;margin-bottom:24px;" class="fade-up fade-up-1">
          <div style="font-size:0.78rem;opacity:0.8;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:4px;">Underperformance Cost — Stated in Rupees</div>
          <div class="fin-num" style="font-size:2.5rem;font-weight:800;color:white;">₹${(totalUnderperform/100000).toFixed(2)}L</div>
          <div style="font-size:0.88rem;opacity:0.8;margin-top:4px;">This is real money left on the table vs category median returns — not just a percentage gap.</div>
        </div>` : ''}

        <!-- Fund list -->
        <div class="card mb-20 fade-up fade-up-2">
          <div class="card-title mb-16">Fund Performance vs Category Median</div>
          <div class="table-wrapper">
            <table>
              <thead>
                <tr><th>Fund Name</th><th>Type</th><th>SIP Amount</th><th>Years Running</th><th>IRR Earned</th><th>Category Median</th><th>Gap</th><th>Underperformance (₹)</th></tr>
              </thead>
              <tbody>
                ${mfs.map(m => {
                  const gap = (m.irrEarned - m.categoryMedian).toFixed(1);
                  const isLagging = m.underperformAmount > 0;
                  return `
                    <tr>
                      <td><strong>${m.fund}</strong></td>
                      <td><span class="badge ${m.type==='Direct'?'badge-emerald':'badge-amber'}">${m.type}</span></td>
                      <td class="fin-num">${App.formatRupee(m.sip)}/mo</td>
                      <td class="fin-num">${m.yearsRunning}Y</td>
                      <td class="fin-num" style="color:${isLagging?'var(--color-red)':'var(--color-green)'};font-weight:600;">${m.irrEarned}%</td>
                      <td class="fin-num">${m.categoryMedian}%</td>
                      <td class="fin-num font-600" style="color:${gap < 0 ? 'var(--color-red)' : 'var(--color-green)'}">${gap > 0 ? '+' : ''}${gap}%</td>
                      <td class="fin-num font-700" style="color:${isLagging?'var(--color-red)':'var(--color-text-muted)'}">${isLagging ? '−'+App.formatRupee(m.underperformAmount) : '—'}</td>
                    </tr>`;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Regular vs Direct Plan Gap -->
        ${totalDirectSavings > 0 ? `
        <div class="card mb-20 fade-up fade-up-3">
          <div class="card-title mb-16">Regular vs Direct Plan Gap</div>
          <div class="compare-grid">
            <div class="compare-card">
              <div class="compare-title">Regular Plan (Current)</div>
              ${mfs.filter(m=>m.type==='Regular').slice(0,2).map(m=>`
                <div class="compare-metric">
                  <span class="compare-metric-label">${m.fund.split(' ').slice(0,3).join(' ')}</span>
                  <span class="compare-metric-value fin-num loss">${m.expenseRatio}% TER</span>
                </div>`).join('')}
              <div class="compare-metric" style="margin-top:8px;border-top:1.5px solid var(--color-border-faint);padding-top:8px;">
                <span class="compare-metric-label">10Y impact (est.)</span>
                <span class="compare-metric-value fin-num loss">−${App.formatRupee(totalDirectSavings)}</span>
              </div>
            </div>
            <div class="compare-card winner">
              <div class="winner-badge">✓ Switch to Direct</div>
              <div class="compare-title">Direct Plan (Recommended)</div>
              ${mfs.filter(m=>m.type==='Regular').slice(0,2).map(m=>`
                <div class="compare-metric">
                  <span class="compare-metric-label">${m.fund.split(' ').slice(0,3).join(' ')}</span>
                  <span class="compare-metric-value fin-num win">${m.directExpenseRatio}% TER</span>
                </div>`).join('')}
              <div class="compare-metric" style="margin-top:8px;border-top:1.5px solid var(--color-border-faint);padding-top:8px;">
                <span class="compare-metric-label">10Y impact (est.)</span>
                <span class="compare-metric-value fin-num win">+${App.formatRupee(totalDirectSavings)}</span>
              </div>
            </div>
          </div>
          <div class="callout callout-emerald mt-16">
            <div class="callout-icon"><svg viewBox="0 0 24 24"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg></div>
            <div><div class="callout-title">Switching to Direct saves ${App.formatRupee(totalDirectSavings)} over 10 years</div><div class="callout-text">Same fund, same NAV growth, just without the distributor commission embedded in expense ratio.</div></div>
          </div>
        </div>` : ''}

        <!-- Portfolio overlap indicator -->
        <div class="card fade-up fade-up-4">
          <div class="card-title mb-12">Portfolio Overlap Check</div>
          <div class="callout callout-amber">
            <div class="callout-icon"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></div>
            <div>
              <div class="callout-title">Moderate overlap detected</div>
              <div class="callout-text">HDFC Flexi Cap and Mirae Asset Large Cap share 62% of top 10 holdings (Reliance, HDFC Bank, Infosys, TCS). Consider consolidating or diversifying into a midcap or international fund.</div>
            </div>
          </div>
        </div>
      </div>`;
  },
};
window.MFScreen = MFScreen;
