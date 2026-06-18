/* ============================================================
   BachatBeat — data.js
   All mock data: clients, policies, FDs, MFs, loans, alerts
   ============================================================ */

const BB_DATA = {

  // ── Roles ──────────────────────────────────────────────────
  roles: [
    { id: 'ria',       label: 'SEBI Registered Investment Advisor (RIA)' },
    { id: 'ca',        label: 'Chartered Accountant (CA)' },
    { id: 'cma',       label: 'Cost & Management Accountant (CMA)' },
    { id: 'cs',        label: 'Company Secretary (CS)' },
    { id: 'mfd',       label: 'Mutual Fund Distributor (MFD)' },
    { id: 'broker',    label: 'Insurance Broker' },
    { id: 'bank_rm',   label: 'Bank Relationship Manager' },
    { id: 'advisor',   label: 'Other / Independent Advisor' },
  ],

  // ── Role-specific label overrides ──────────────────────────
  roleLabels: {
    ria:      { portfolioLabel: 'Portfolio Review', taxLabel: 'Tax Planning', alertLabel: 'SEBI Compliance Notes', mfLabel: 'Investments' },
    ca:       { portfolioLabel: 'Compliance Review', taxLabel: 'ITR-linked Insights', alertLabel: 'Filing Deadlines', mfLabel: 'Tax-saving Funds' },
    cma:      { portfolioLabel: 'Cost Analysis', taxLabel: 'Tax Efficiency', alertLabel: 'Cost Audit Alerts', mfLabel: 'Investments' },
    cs:       { portfolioLabel: 'Governance Review', taxLabel: 'Tax Snapshot', alertLabel: 'Compliance Alerts', mfLabel: 'Investments' },
    mfd:      { portfolioLabel: 'Portfolio Review', taxLabel: 'Tax Snapshot', alertLabel: 'Commission Impact', mfLabel: 'Regular vs Direct' },
    broker:   { portfolioLabel: 'Policy Review', taxLabel: 'Tax Snapshot', alertLabel: 'Renewal Reminders', mfLabel: 'Investments' },
    bank_rm:  { portfolioLabel: 'Product Review', taxLabel: 'Tax Snapshot', alertLabel: 'Rate Change Alerts', mfLabel: 'Investments' },
    advisor:  { portfolioLabel: 'Portfolio Review', taxLabel: 'Tax Snapshot', alertLabel: 'Client Alerts', mfLabel: 'Investments' },
  },

  // ── Clients ────────────────────────────────────────────────
  clients: [
    {
      id: 'c01', name: 'Amit Sharma', age: 42, dob: '1982-03-14',
      phone: '98765-43210', email: 'amit.sharma@gmail.com',
      taxSlab: '30%', score: 34, lastReviewed: '2026-06-10', urgency: 'urgent',
      assets: { policies: 3, fds: 2, mfs: 4, loans: 1 },
      totalTrapped: '₹12,40,000',
      reason: 'LIC Jeevan Anand IRR at 4.8% — corpus gap of ₹8.2L at 60',
    },
    {
      id: 'c02', name: 'Priya Nair', age: 36, dob: '1990-07-22',
      phone: '87654-32109', email: 'priya.nair@yahoo.in',
      taxSlab: '20%', score: 61, lastReviewed: '2026-06-08', urgency: 'review',
      assets: { policies: 2, fds: 3, mfs: 3, loans: 0 },
      totalTrapped: '₹6,30,000',
      reason: 'SBI Life endowment policy underperforming; FD renewal at old rate',
    },
    {
      id: 'c03', name: 'Rajesh Mehta', age: 55, dob: '1971-11-05',
      phone: '76543-21098', email: 'rajesh.mehta@rediffmail.com',
      taxSlab: '30%', score: 28, lastReviewed: '2026-05-30', urgency: 'urgent',
      assets: { policies: 4, fds: 1, mfs: 2, loans: 2 },
      totalTrapped: '₹19,80,000',
      reason: '2 overlapping health riders; ₹36K redundant premium annually',
    },
    {
      id: 'c04', name: 'Sunita Iyer', age: 44, dob: '1982-01-18',
      phone: '65432-10987', email: 'sunita.iyer@gmail.com',
      taxSlab: '20%', score: 72, lastReviewed: '2026-06-12', urgency: 'watch',
      assets: { policies: 1, fds: 4, mfs: 5, loans: 0 },
      totalTrapped: '₹2,10,000',
      reason: 'FDs laddered well; MF portfolio slightly below benchmark',
    },
    {
      id: 'c05', name: 'Vikram Bhatia', age: 38, dob: '1988-04-30',
      phone: '54321-09876', email: 'vikram.bhatia@outlook.com',
      taxSlab: '30%', score: 45, lastReviewed: '2026-06-05', urgency: 'review',
      assets: { policies: 2, fds: 1, mfs: 6, loans: 1 },
      totalTrapped: '₹7,90,000',
      reason: 'Regular MF plan — switch to direct saves ₹1.47L over 10Y',
    },
    {
      id: 'c06', name: 'Deepa Krishnan', age: 48, dob: '1978-09-03',
      phone: '43210-98765', email: 'deepa.krishnan@gmail.com',
      taxSlab: '20%', score: 57, lastReviewed: '2026-06-01', urgency: 'review',
      assets: { policies: 3, fds: 2, mfs: 2, loans: 1 },
      totalTrapped: '₹5,60,000',
      reason: 'Home loan rate 9.1% — refinance saves ₹2.1L in total interest',
    },
    {
      id: 'c07', name: 'Arjun Patel', age: 31, dob: '1995-12-20',
      phone: '32109-87654', email: 'arjun.patel@gmail.com',
      taxSlab: '5%', score: 82, lastReviewed: '2026-06-14', urgency: 'watch',
      assets: { policies: 1, fds: 1, mfs: 3, loans: 0 },
      totalTrapped: '₹85,000',
      reason: 'Portfolio largely healthy; single LIC policy to monitor',
    },
    {
      id: 'c08', name: 'Meera Joshi', age: 52, dob: '1974-06-11',
      phone: '21098-76543', email: 'meera.joshi@yahoo.in',
      taxSlab: '30%', score: 32, lastReviewed: '2026-05-28', urgency: 'urgent',
      assets: { policies: 5, fds: 3, mfs: 1, loans: 1 },
      totalTrapped: '₹24,50,000',
      reason: 'LIC bonus rate dropped; 3 endowment policies with 4.2% IRR',
    },
    {
      id: 'c09', name: 'Sanjay Gupta', age: 40, dob: '1986-02-28',
      phone: '10987-65432', email: 'sanjay.gupta@gmail.com',
      taxSlab: '20%', score: 66, lastReviewed: '2026-06-09', urgency: 'watch',
      assets: { policies: 2, fds: 2, mfs: 4, loans: 0 },
      totalTrapped: '₹3,20,000',
      reason: 'FD renewal due in 18 days — better rate available at HDFC',
    },
    {
      id: 'c10', name: 'Lakshmi Reddy', age: 45, dob: '1981-08-17',
      phone: '09876-54321', email: 'lakshmi.reddy@rediffmail.com',
      taxSlab: '30%', score: 39, lastReviewed: '2026-06-03', urgency: 'review',
      assets: { policies: 3, fds: 2, mfs: 3, loans: 2 },
      totalTrapped: '₹9,70,000',
      reason: 'Personal loan at 14% — prepay with FD maturity proceeds',
    },
    {
      id: 'c11', name: 'Rohit Agarwal', age: 33, dob: '1993-05-09',
      phone: '98765-12340', email: 'rohit.agarwal@gmail.com',
      taxSlab: '20%', score: 74, lastReviewed: '2026-06-13', urgency: 'watch',
      assets: { policies: 1, fds: 2, mfs: 5, loans: 1 },
      totalTrapped: '₹1,80,000',
      reason: 'One MF lagging by 2.9% vs category; home loan rate competitive',
    },
    {
      id: 'c12', name: 'Kavitha Menon', age: 50, dob: '1976-10-25',
      phone: '87654-23456', email: 'kavitha.menon@outlook.com',
      taxSlab: '30%', score: 41, lastReviewed: '2026-05-25', urgency: 'review',
      assets: { policies: 4, fds: 1, mfs: 2, loans: 1 },
      totalTrapped: '₹11,20,000',
      reason: 'Max Life ULIP charges eating 2.6% of corpus annually',
    },
    {
      id: 'c13', name: 'Dinesh Chandra', age: 58, dob: '1968-04-02',
      phone: '76543-34567', email: 'dinesh.chandra@gmail.com',
      taxSlab: '30%', score: 22, lastReviewed: '2026-05-20', urgency: 'urgent',
      assets: { policies: 6, fds: 4, mfs: 0, loans: 0 },
      totalTrapped: '₹31,60,000',
      reason: 'Near retirement; 6 insurance policies all below inflation rate',
    },
    {
      id: 'c14', name: 'Pooja Saxena', age: 29, dob: '1997-01-14',
      phone: '65432-45678', email: 'pooja.saxena@gmail.com',
      taxSlab: '5%', score: 88, lastReviewed: '2026-06-15', urgency: 'watch',
      assets: { policies: 0, fds: 1, mfs: 4, loans: 0 },
      totalTrapped: '₹42,000',
      reason: 'Well-optimised; single FD maturing soon — consider reinvestment',
    },
    {
      id: 'c15', name: 'Harish Rao', age: 47, dob: '1979-07-30',
      phone: '54321-56789', email: 'harish.rao@yahoo.in',
      taxSlab: '20%', score: 53, lastReviewed: '2026-06-07', urgency: 'review',
      assets: { policies: 2, fds: 3, mfs: 3, loans: 1 },
      totalTrapped: '₹6,90,000',
      reason: '80C bucket full of low-yield LIC premium; ELSS reallocation advised',
    },
  ],

  // ── Policies (for client c01 - Amit Sharma) ───────────────
  policies: {
    c01: [
      {
        id: 'p01', insurer: 'LIC', type: 'Jeevan Anand',
        premium: 52000, sumAssured: 1000000, yearsPaid: 12,
        startDate: '2014-04-01', bonusReceived: 384000,
        irr: 4.8, tag: 'surrender',
        gsv: 468000, ssv: 542000,
        recommendation: 'Surrender and reinvest in ELSS + term plan',
        continuedCorpus: 1380000, surrenderCorpus: 2240000, paidUpCorpus: 1620000,
        potentialGain: 860000,
      },
      {
        id: 'p02', insurer: 'HDFC Life', type: 'New Endowment',
        premium: 28000, sumAssured: 500000, yearsPaid: 6,
        startDate: '2020-07-01', bonusReceived: 88000,
        irr: 5.9, tag: 'review',
        gsv: 108000, ssv: 128000,
        recommendation: 'Paid-up is better; review next policy year',
        continuedCorpus: 720000, surrenderCorpus: 860000, paidUpCorpus: 810000,
        potentialGain: 140000,
      },
      {
        id: 'p03', insurer: 'Max Life', type: 'Term Plan',
        premium: 18500, sumAssured: 10000000, yearsPaid: 4,
        startDate: '2022-01-01', bonusReceived: 0,
        irr: null, tag: 'healthy',
        recommendation: 'Term plan is correctly structured. No action needed.',
        continuedCorpus: null, surrenderCorpus: null, paidUpCorpus: null,
        potentialGain: 0,
      },
    ],
    c03: [
      {
        id: 'p04', insurer: 'LIC', type: 'Jeevan Labh',
        premium: 72000, sumAssured: 2000000, yearsPaid: 8,
        startDate: '2018-04-01', bonusReceived: 420000,
        irr: 4.2, tag: 'surrender',
        gsv: 364000, ssv: 428000,
        recommendation: 'Surrender recommended — serious underperformance vs inflation',
        continuedCorpus: 1980000, surrenderCorpus: 3100000, paidUpCorpus: 2350000,
        potentialGain: 1120000,
      },
      {
        id: 'p05', insurer: 'ICICI Prudential', type: 'ULIP',
        premium: 60000, sumAssured: 600000, yearsPaid: 6,
        startDate: '2020-02-01', bonusReceived: 0,
        irr: 9.2, tag: 'review',
        recommendation: 'ULIP charges high; review fund selection',
        continuedCorpus: 2100000, surrenderCorpus: 1850000, paidUpCorpus: 1960000,
        potentialGain: 140000,
      },
    ],
  },

  // ── Fixed Deposits (for client c01) ───────────────────────
  fds: {
    c01: [
      {
        id: 'fd01', bank: 'SBI', principal: 500000, rate: 6.5,
        bookedDate: '2024-02-15', maturityDate: '2026-08-15', daysRemaining: 59,
        postTaxReturn: 31200, penaltyIfBroken: 2500,
        newRateAvailable: 7.1, newPostTaxReturn: 38900,
        verdict: 'break', verdictGain: 14200, penaltyRecoupMonths: 3,
      },
      {
        id: 'fd02', bank: 'HDFC Bank', principal: 300000, rate: 7.0,
        bookedDate: '2025-01-10', maturityDate: '2027-01-10', daysRemaining: 208,
        postTaxReturn: 22400, penaltyIfBroken: 1500,
        newRateAvailable: 7.1, newPostTaxReturn: 22800,
        verdict: 'hold', verdictGain: 400, penaltyRecoupMonths: 24,
      },
    ],
    c09: [
      {
        id: 'fd03', bank: 'Axis Bank', principal: 800000, rate: 6.75,
        bookedDate: '2025-06-20', maturityDate: '2026-07-04', daysRemaining: 18,
        postTaxReturn: 41200, penaltyIfBroken: 4000,
        newRateAvailable: 7.2, newPostTaxReturn: 43100,
        verdict: 'hold', verdictGain: -2100, penaltyRecoupMonths: null,
      },
    ],
    c04: [
      {
        id: 'fd04', bank: 'PNB', principal: 1000000, rate: 6.8,
        bookedDate: '2024-03-01', maturityDate: '2026-09-01', daysRemaining: 77,
        postTaxReturn: 58400, penaltyIfBroken: 5000,
        newRateAvailable: 7.3, newPostTaxReturn: 65200,
        verdict: 'break', verdictGain: 19200, penaltyRecoupMonths: 3,
      },
      {
        id: 'fd05', bank: 'Kotak Mahindra', principal: 500000, rate: 7.1,
        bookedDate: '2025-03-15', maturityDate: '2027-09-15', daysRemaining: 456,
        postTaxReturn: 38200, penaltyIfBroken: 2500,
        newRateAvailable: 7.1, newPostTaxReturn: 38200,
        verdict: 'hold', verdictGain: 0, penaltyRecoupMonths: null,
      },
      {
        id: 'fd06', bank: 'IDFC First', principal: 250000, rate: 7.25,
        bookedDate: '2024-09-01', maturityDate: '2026-09-01', daysRemaining: 77,
        postTaxReturn: 19600, penaltyIfBroken: 1250,
        newRateAvailable: 7.25, newPostTaxReturn: 19600,
        verdict: 'hold', verdictGain: 0, penaltyRecoupMonths: null,
      },
      {
        id: 'fd07', bank: 'SBI', principal: 750000, rate: 6.5,
        bookedDate: '2024-09-15', maturityDate: '2026-09-15', daysRemaining: 91,
        postTaxReturn: 42200, penaltyIfBroken: 3750,
        newRateAvailable: 7.1, newPostTaxReturn: 48600,
        verdict: 'break', verdictGain: 12800, penaltyRecoupMonths: 4,
      },
    ],
  },

  // ── Mutual Funds / SIPs ────────────────────────────────────
  mfs: {
    c05: [
      {
        id: 'mf01', fund: 'Mirae Asset Large Cap Fund', type: 'Regular',
        sip: 10000, yearsRunning: 4, irrEarned: 9.2,
        categoryMedian: 12.1, underperformAmount: 147000,
        expenseRatio: 1.82, directExpenseRatio: 0.42,
        directSavings10Y: 284000,
      },
      {
        id: 'mf02', fund: 'HDFC Flexi Cap Fund', type: 'Regular',
        sip: 8000, yearsRunning: 3, irrEarned: 11.8,
        categoryMedian: 12.4, underperformAmount: 18200,
        expenseRatio: 1.75, directExpenseRatio: 0.38,
        directSavings10Y: 198000,
      },
      {
        id: 'mf03', fund: 'Axis Small Cap Fund', type: 'Regular',
        sip: 5000, yearsRunning: 2, irrEarned: 16.2,
        categoryMedian: 15.8, underperformAmount: 0,
        expenseRatio: 1.65, directExpenseRatio: 0.32,
        directSavings10Y: 88000,
      },
      {
        id: 'mf04', fund: 'ICICI Pru Bluechip Fund', type: 'Regular',
        sip: 7000, yearsRunning: 5, irrEarned: 10.4,
        categoryMedian: 12.9, underperformAmount: 92000,
        expenseRatio: 1.78, directExpenseRatio: 0.40,
        directSavings10Y: 174000,
      },
      {
        id: 'mf05', fund: 'SBI Magnum Midcap Fund', type: 'Regular',
        sip: 6000, yearsRunning: 3, irrEarned: 13.8,
        categoryMedian: 14.2, underperformAmount: 12400,
        expenseRatio: 1.70, directExpenseRatio: 0.35,
        directSavings10Y: 134000,
      },
      {
        id: 'mf06', fund: 'Parag Parikh Flexi Cap', type: 'Direct',
        sip: 12000, yearsRunning: 2, irrEarned: 18.4,
        categoryMedian: 12.4, underperformAmount: 0,
        expenseRatio: 0.62, directExpenseRatio: 0.62,
        directSavings10Y: 0,
      },
    ],
    c01: [
      {
        id: 'mf07', fund: 'HDFC Top 100 Fund', type: 'Regular',
        sip: 8000, yearsRunning: 5, irrEarned: 10.8,
        categoryMedian: 12.1, underperformAmount: 74000,
        expenseRatio: 1.80, directExpenseRatio: 0.40,
        directSavings10Y: 156000,
      },
      {
        id: 'mf08', fund: 'SBI ELSS Tax Saver', type: 'Regular',
        sip: 5000, yearsRunning: 7, irrEarned: 12.4,
        categoryMedian: 13.2, underperformAmount: 48000,
        expenseRatio: 1.68, directExpenseRatio: 0.55,
        directSavings10Y: 98000,
      },
      {
        id: 'mf09', fund: 'Nippon India Small Cap', type: 'Direct',
        sip: 3000, yearsRunning: 3, irrEarned: 19.2,
        categoryMedian: 17.4, underperformAmount: 0,
        expenseRatio: 0.68, directExpenseRatio: 0.68,
        directSavings10Y: 0,
      },
      {
        id: 'mf10', fund: 'Kotak Balanced Advantage', type: 'Regular',
        sip: 4000, yearsRunning: 2, irrEarned: 9.4,
        categoryMedian: 10.8, underperformAmount: 22400,
        expenseRatio: 1.72, directExpenseRatio: 0.36,
        directSavings10Y: 112000,
      },
    ],
  },

  // ── Loans ──────────────────────────────────────────────────
  loans: {
    c01: [
      {
        id: 'l01', type: 'Home Loan', lender: 'HDFC Bank',
        outstanding: 4800000, rate: 8.75, emi: 44200,
        tenure: 168, startDate: '2022-04-01',
        resetFrequency: 'Quarterly', spreadOverBenchmark: 2.15,
        balanceTransfer: [
          { lender: 'SBI', rate: 8.40, newEmi: 43100, transferCost: 28000, breakevenMonth: 7 },
          { lender: 'ICICI Bank', rate: 8.55, newEmi: 43600, transferCost: 24000, breakevenMonth: 14 },
          { lender: 'Kotak Bank', rate: 8.35, newEmi: 42900, transferCost: 32000, breakevenMonth: 9 },
        ],
        healthChecks: [
          { label: 'Reset frequency', detail: 'Quarterly — aligned with repo cycle ✓', status: 'ok' },
          { label: 'Spread over benchmark', detail: '2.15% — may be renegotiable with bank ⚠', status: 'warn' },
          { label: 'Part-prepayment clause', detail: 'No penalty on partial prepayment ✓', status: 'ok' },
          { label: 'Insurance cover', detail: 'No home loan protection plan — consider ⚠', status: 'warn' },
        ],
      },
    ],
    c06: [
      {
        id: 'l02', type: 'Home Loan', lender: 'PNB Housing',
        outstanding: 3200000, rate: 9.10, emi: 29800,
        tenure: 144, startDate: '2021-08-01',
        resetFrequency: 'Half-yearly', spreadOverBenchmark: 2.60,
        balanceTransfer: [
          { lender: 'SBI', rate: 8.40, newEmi: 27200, transferCost: 20000, breakevenMonth: 8 },
          { lender: 'HDFC Bank', rate: 8.50, newEmi: 27600, transferCost: 18000, breakevenMonth: 9 },
        ],
        healthChecks: [
          { label: 'Reset frequency', detail: 'Half-yearly — slow to reflect rate cuts ⚠', status: 'warn' },
          { label: 'Spread over benchmark', detail: '2.60% — renegotiation strongly advised ⚠', status: 'warn' },
          { label: 'Part-prepayment clause', detail: 'No penalty ✓', status: 'ok' },
          { label: 'Balance transfer', detail: 'Switching to SBI saves ₹2.1L total interest', status: 'ok' },
        ],
      },
    ],
    c10: [
      {
        id: 'l03', type: 'Personal Loan', lender: 'ICICI Bank',
        outstanding: 480000, rate: 14.00, emi: 11200,
        tenure: 48, startDate: '2025-01-01',
        resetFrequency: 'Fixed', spreadOverBenchmark: null,
        balanceTransfer: [],
        healthChecks: [
          { label: 'Interest rate', detail: '14% — very high; prepayment advised ⚠', status: 'warn' },
          { label: 'Prepayment charge', detail: '2% of outstanding — worth absorbing vs rate', status: 'warn' },
          { label: 'Remaining tenure', detail: '4 years — compounding cost is significant', status: 'warn' },
          { label: 'Credit score impact', detail: 'On-time payments maintaining score ✓', status: 'ok' },
        ],
      },
    ],
  },

  // ── Alerts Feed ────────────────────────────────────────────
  alerts: [
    { id: 'a01', urgency: 'urgent', type: 'Bonus Rate Change', client: 'Amit Sharma', clientId: 'c01',
      message: 'LIC Jeevan Anand bonus rate reduced by 12 basis points — projected corpus reduced by ₹2,30,000 vs last estimate.',
      date: '2026-06-15', actioned: false },
    { id: 'a02', urgency: 'urgent', type: 'Policy Anniversary', client: 'Meera Joshi', clientId: 'c08',
      message: '3 LIC endowment policies completing 15th policy year — optimal surrender window opens this month.',
      date: '2026-06-14', actioned: false },
    { id: 'a03', urgency: 'urgent', type: 'Policy Anniversary', client: 'Dinesh Chandra', clientId: 'c13',
      message: 'Jeevan Labh policy reaches Special Surrender Value threshold — ₹1.8L additional recovery possible.',
      date: '2026-06-13', actioned: false },
    { id: 'a04', urgency: 'review', type: 'Repo Rate Cut', client: 'Deepa Krishnan', clientId: 'c06',
      message: 'RBI repo rate cut 25bp — PNB Housing half-yearly reset means rate relief delayed 6 months. Consider BT.',
      date: '2026-06-12', actioned: false },
    { id: 'a05', urgency: 'review', type: 'Bonus Rate Change', client: 'Priya Nair', clientId: 'c02',
      message: 'SBI Life bonus declared — 5.8% IRR confirmed vs 6.2% assumed. Recalculate corpus projection.',
      date: '2026-06-11', actioned: false },
    { id: 'a06', urgency: 'review', type: 'Tax Season Reminder', client: 'All 30% slab clients',
      message: '80C window open — 6 clients with unfilled ₹1.5L limit. Redirect from low-yield LIC to ELSS.',
      date: '2026-06-10', actioned: false },
    { id: 'a07', urgency: 'review', type: 'Policy Anniversary', client: 'Vikram Bhatia', clientId: 'c05',
      message: 'HDFC Life endowment completing 6 years — review paid-up option before next premium due Jul 1.',
      date: '2026-06-09', actioned: true },
    { id: 'a08', urgency: 'watch', type: 'Repo Rate Cut', client: 'Sanjay Gupta', clientId: 'c09',
      message: 'Axis Bank FD maturing in 18 days — new 1-year rate at 7.2% available. Book renewal appointment.',
      date: '2026-06-08', actioned: false },
    { id: 'a09', urgency: 'watch', type: 'Tax Season Reminder', client: 'Harish Rao', clientId: 'c15',
      message: '80C audit: ₹72,000 filled by LIC premium at 4.8% IRR. Advise ELSS reallocation for next year.',
      date: '2026-06-07', actioned: true },
    { id: 'a10', urgency: 'watch', type: 'Bonus Rate Change', client: 'Rajesh Mehta', clientId: 'c03',
      message: 'ICICI Prudential ULIP fund performance reviewed — fund switch to large cap from balanced recommended.',
      date: '2026-06-06', actioned: false },
  ],

  // ── Dashboard summary stats ────────────────────────────────
  dashboardStats: {
    totalClients: 15,
    totalTrappedCapital: '₹47.2L',
    attentionNeeded: 4,
    avgScore: 52,
  },

  // ── Asset class trapped capital breakdown ─────────────────
  assetBreakdown: [
    { label: 'Insurance Policies', amount: '₹28.4L', barPct: 60, barClass: 'bar-fill-1' },
    { label: 'Fixed Deposits',     amount: '₹9.8L',  barPct: 21, barClass: 'bar-fill-2' },
    { label: 'Mutual Funds',       amount: '₹6.2L',  barPct: 13, barClass: 'bar-fill-3' },
    { label: 'Loans (overcharge)', amount: '₹2.8L',  barPct: 6,  barClass: 'bar-fill-4' },
  ],

  // ── Recent Activity ────────────────────────────────────────
  recentActivity: [
    { text: 'Full analysis run for Amit Sharma — LIC surrender recommended', time: 'Today, 11:42 AM', client: 'c01' },
    { text: 'FD analysis completed for Sunita Iyer — 3 FDs reviewed, 1 break recommended', time: 'Today, 10:18 AM', client: 'c04' },
    { text: 'Policy overlap detected for Rajesh Mehta — 2 riders, ₹36K redundant premium', time: 'Yesterday, 4:55 PM', client: 'c03' },
    { text: 'Tax snapshot updated for Harish Rao — Old regime saves ₹24,200 this year', time: 'Yesterday, 2:30 PM', client: 'c15' },
    { text: 'MF underperformance alert actioned for Vikram Bhatia', time: 'Jun 14, 3:12 PM', client: 'c05' },
    { text: 'New client added — Pooja Saxena onboarded', time: 'Jun 13, 11:00 AM', client: 'c14' },
  ],

  // ── Tax snapshot (for client c01 - Amit Sharma) ───────────
  taxSnapshots: {
    c01: {
      name: 'Amit Sharma', income: 2400000,
      oldRegime: {
        taxableIncome: 1892000,
        deductions: { '80C': 150000, 'HRA': 180000, 'Standard': 50000, 'Medical': 25000, 'NPS 80CCD': 50000 },
        grossTax: 498960, surcharge: 0, cess: 19958, total: 518918,
        regime: 'Old'
      },
      newRegime: {
        taxableIncome: 2350000,
        deductions: { 'Standard': 50000 },
        grossTax: 542500, surcharge: 0, cess: 21700, total: 564200,
        regime: 'New'
      },
      winner: 'old', savings: 45282,
      bucket80C: [
        { label: 'LIC Premium', amount: 52000, irr: 4.8, color: 'var(--color-amber)' },
        { label: 'EPF', amount: 48000, irr: 8.1, color: 'var(--color-emerald)' },
        { label: 'ELSS (SBI)', amount: 28000, irr: 12.4, color: 'var(--color-teal)' },
        { label: 'PPF (partial)', amount: 22000, irr: 7.1, color: 'var(--color-teal-light)' },
      ],
      reallocationNote: '₹52,000 currently in LIC premium (4.8% IRR) — redirecting to ELSS could add ₹4.2L over 10 years with same 80C benefit.',
    },
  },

  // ── Attention list (dashboard) ─────────────────────────────
  attentionList: [
    { clientId: 'c01', name: 'Amit Sharma', urgency: 'urgent',
      reason: 'LIC bonus rate dropped — projected corpus down ₹2,30,000 vs last estimate' },
    { clientId: 'c08', name: 'Meera Joshi', urgency: 'urgent',
      reason: '3 LIC endowments reaching 15Y — optimal surrender window this month' },
    { clientId: 'c13', name: 'Dinesh Chandra', urgency: 'urgent',
      reason: 'Near-retirement with ₹31.6L in sub-inflation insurance policies' },
    { clientId: 'c02', name: 'Priya Nair', urgency: 'review',
      reason: 'SBI Life bonus declared at 5.8% — recalculate corpus projection' },
    { clientId: 'c06', name: 'Deepa Krishnan', urgency: 'review',
      reason: 'Repo rate cut delayed to client by PNB half-yearly reset — BT advised' },
  ],
};

window.BB_DATA = BB_DATA;
