/* ============================================================
   BachatBeat — screens/onboarding.js
   Screen 1: Role Selector
   ============================================================ */

const OnboardingScreen = {
  render() {
    const container = document.getElementById('onboarding-content');
    if (!container) return;

    container.innerHTML = `
      <div class="onboard-card">
        <div class="onboard-logo">
          <div class="onboard-logo-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
            </svg>
          </div>
          <div>
            <div class="onboard-brand">BachatBeat</div>
            <div class="onboard-tagline">Financial Pulse Analytics</div>
          </div>
        </div>

        <div class="onboard-pulse-line">
          ${App.renderPulseSVG(400, 32, 'var(--color-teal)')}
        </div>

        <div class="onboard-hero">
          <h1 class="onboard-title">Welcome to your<br>financial command centre.</h1>
          <p class="onboard-subtitle">BachatBeat identifies trapped capital across your clients' insurance policies, fixed deposits, mutual funds, and loans — before they ask you about it.</p>
        </div>

        <form id="onboarding-form" class="onboard-form">
          <div class="form-group">
            <label class="form-label" for="role-select">Your professional role</label>
            <select class="form-select" id="role-select" required>
              <option value="" disabled selected>Select your role…</option>
              ${BB_DATA.roles.map(r => `<option value="${r.id}">${r.label}</option>`).join('')}
            </select>
          </div>

          <div class="form-group">
            <label class="form-label" for="firm-name">Firm / Practice name</label>
            <input type="text" class="form-input" id="firm-name"
              placeholder="e.g. Sharma Financial Advisory" autocomplete="organization"/>
          </div>

          <div id="role-preview" class="role-preview" style="display:none;">
            <div class="role-preview-icon">✦</div>
            <div id="role-preview-text" class="role-preview-text"></div>
          </div>

          <button type="submit" class="btn btn-primary btn-lg w-full" id="onboard-submit">
            <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            Continue to Dashboard
          </button>
        </form>

        <p class="onboard-note">Your role selection personalises dashboard labels and insights. You can change it anytime from your profile menu.</p>
      </div>
    `;

    this.bindEvents();
  },

  bindEvents() {
    const form       = document.getElementById('onboarding-form');
    const roleSelect = document.getElementById('role-select');
    const preview    = document.getElementById('role-preview');
    const previewText= document.getElementById('role-preview-text');

    const rolePreviewMap = {
      ria:     'Your dashboard will emphasise Portfolio Review, SEBI compliance notes, and investment suitability checks.',
      ca:      'Your dashboard will emphasise ITR-linked insights, 80C optimisation, and tax filing deadlines.',
      cma:     'Your dashboard will emphasise cost analysis, tax efficiency, and cost audit alerts.',
      cs:      'Your dashboard will emphasise governance review, compliance alerts, and secretarial priorities.',
      mfd:     'Your dashboard will emphasise Regular vs Direct plan gaps, commission impact, and SIP performance.',
      broker:  'Your dashboard will emphasise policy reviews, renewal reminders, and overlap detection.',
      bank_rm: 'Your dashboard will emphasise rate change alerts, product fit reviews, and balance transfer windows.',
      advisor: 'Your dashboard shows a balanced view across all asset classes and analysis types.',
    };

    roleSelect.addEventListener('change', () => {
      const val = roleSelect.value;
      if (val && rolePreviewMap[val]) {
        previewText.textContent = rolePreviewMap[val];
        preview.style.display = 'flex';
      } else {
        preview.style.display = 'none';
      }
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const role     = roleSelect.value;
      const firmName = document.getElementById('firm-name').value.trim() || 'My Practice';

      if (!role) {
        roleSelect.focus();
        roleSelect.style.borderColor = 'var(--color-red)';
        return;
      }

      const btn = document.getElementById('onboard-submit');
      btn.innerHTML = `<div class="spinner" style="width:18px;height:18px;border-width:2px;border-top-color:white;margin:0 auto;"></div> Setting up your dashboard…`;
      btn.disabled = true;

      setTimeout(() => {
        App.completeOnboarding(role, firmName);
      }, 900);
    });
  },
};

window.OnboardingScreen = OnboardingScreen;
