/**
 * Pure financial math utilities for Fermor.
 * All calculations execute client-side.
 * Conforms strictly to Indian currency formatting standards.
 */

export interface SipResult {
  requiredMonthlySip: number;
  totalInvested: number;
  estimatedReturns: number;
  futureNominalValue: number;
  realValueToday: number;
  isGoalMetByStart: boolean;
  yearlyBreakdown: YearlyGrowthPoint[];
}

export interface YearlyGrowthPoint {
  year: number;
  invested: number;
  growth: number;
  total: number;
}

export interface EmiResult {
  monthlyEmi: number;
  totalPayment: number;
  totalInterest: number;
  principalAmount: number;
  scheduleFirst12Months: AmortizationMonth[];
}

export interface AmortizationMonth {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

export interface StepUpSipPoint {
  year: number;
  standardTotal: number;
  stepUpTotal: number;
  standardInvested: number;
  stepUpInvested: number;
}

/**
 * Calculates required monthly SIP using Annuity Due convention (payments made at start of month).
 */
export function calculateRequiredSip(
  goalAmount: number,
  years: number,
  annualReturn: number,
  inflationRate: number,
  startingAmount: number = 0
): SipResult {
  // Sanitize inputs
  const goal = Math.max(0, Number.isFinite(goalAmount) ? goalAmount : 0);
  const tYears = Math.max(1, Math.min(50, Number.isFinite(years) ? years : 10));
  const rate = Math.max(0, Math.min(100, Number.isFinite(annualReturn) ? annualReturn : 12));
  const inflation = Math.max(0, Math.min(100, Number.isFinite(inflationRate) ? inflationRate : 6));
  const startP = Math.max(0, Number.isFinite(startingAmount) ? startingAmount : 0);

  const n = Math.round(tYears * 12);
  const i = rate / 12 / 100;

  // Future value of starting lump sum
  const startFv = startP * Math.pow(1 + i, n);

  const remainingGoal = Math.max(0, goal - startFv);
  const isGoalMetByStart = startFv >= goal && goal > 0;

  let requiredMonthlySip = 0;

  if (remainingGoal > 0) {
    if (i === 0) {
      requiredMonthlySip = remainingGoal / n;
    } else {
      // Annuity due factor: [((1+i)^n - 1) / i] * (1+i)
      const fvFactor = ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
      requiredMonthlySip = remainingGoal / fvFactor;
    }
  }

  requiredMonthlySip = Math.round(requiredMonthlySip);

  // Generate fixed 1-point-per-year breakdown
  const yearlyBreakdown: YearlyGrowthPoint[] = [];
  let currentBalance = startP;
  let accumulatedInvested = startP;

  // Year 0
  yearlyBreakdown.push({
    year: 0,
    invested: Math.round(accumulatedInvested),
    growth: 0,
    total: Math.round(currentBalance),
  });

  for (let y = 1; y <= tYears; y++) {
    for (let m = 1; m <= 12; m++) {
      // Annuity due: add payment at beginning of month then compound
      currentBalance = (currentBalance + requiredMonthlySip) * (1 + i);
      accumulatedInvested += requiredMonthlySip;
    }
    const growth = Math.max(0, currentBalance - accumulatedInvested);
    yearlyBreakdown.push({
      year: y,
      invested: Math.round(accumulatedInvested),
      growth: Math.round(growth),
      total: Math.round(currentBalance),
    });
  }

  // Real inflation-adjusted purchasing power today
  const realValueToday = Math.round(
    goal / Math.pow(1 + inflation / 100, tYears)
  );

  const finalTotalInvested = yearlyBreakdown[yearlyBreakdown.length - 1].invested;
  const finalTotalValue = yearlyBreakdown[yearlyBreakdown.length - 1].total;
  const finalEstReturns = Math.max(0, finalTotalValue - finalTotalInvested);

  return {
    requiredMonthlySip,
    totalInvested: finalTotalInvested,
    estimatedReturns: finalEstReturns,
    futureNominalValue: goal,
    realValueToday,
    isGoalMetByStart,
    yearlyBreakdown,
  };
}

/**
 * Calculates loan EMI using reducing-balance formula.
 */
export function calculateEmi(
  principal: number,
  annualInterestRate: number,
  years: number
): EmiResult {
  const P = Math.max(0, Number.isFinite(principal) ? principal : 0);
  const r = Math.max(0, Number.isFinite(annualInterestRate) ? annualInterestRate / 12 / 100 : 0);
  const n = Math.max(1, Math.round((Number.isFinite(years) ? years : 1) * 12));

  let monthlyEmi = 0;

  if (P === 0) {
    monthlyEmi = 0;
  } else if (r === 0) {
    monthlyEmi = P / n;
  } else {
    monthlyEmi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  }

  monthlyEmi = Math.round(monthlyEmi);
  const totalPayment = Math.round(monthlyEmi * n);
  const totalInterest = Math.max(0, totalPayment - P);

  // First 12 months amortization schedule
  const scheduleFirst12Months: AmortizationMonth[] = [];
  let balance = P;

  for (let m = 1; m <= Math.min(12, n); m++) {
    const interestForMonth = r === 0 ? 0 : balance * r;
    const principalForMonth = Math.min(balance, monthlyEmi - interestForMonth);
    balance = Math.max(0, balance - principalForMonth);

    scheduleFirst12Months.push({
      month: m,
      payment: monthlyEmi,
      principal: Math.round(principalForMonth),
      interest: Math.round(interestForMonth),
      balance: Math.round(balance),
    });
  }

  return {
    monthlyEmi,
    totalPayment,
    totalInterest,
    principalAmount: P,
    scheduleFirst12Months,
  };
}

/**
 * Simulates a Step-Up SIP (increasing monthly contribution by annualStepUp% each year).
 * Assumption: Contribution increases at the start of each 12-month period.
 */
export function simulateStepUpSip(
  baseMonthlySip: number,
  annualStepUpPct: number = 10,
  years: number = 10,
  annualReturn: number = 12
): StepUpSipPoint[] {
  const baseSip = Math.max(0, baseMonthlySip);
  const stepUpPct = Math.max(0, annualStepUpPct) / 100;
  const tYears = Math.max(1, Math.min(30, years));
  const i = Math.max(0, annualReturn) / 12 / 100;

  const result: StepUpSipPoint[] = [];

  let stdBalance = 0;
  let stdInvested = 0;

  let stepBalance = 0;
  let stepInvested = 0;

  result.push({
    year: 0,
    standardTotal: 0,
    stepUpTotal: 0,
    standardInvested: 0,
    stepUpInvested: 0,
  });

  for (let y = 1; y <= tYears; y++) {
    const stepUpMonthlySip = baseSip * Math.pow(1 + stepUpPct, y - 1);

    for (let m = 1; m <= 12; m++) {
      // Standard SIP
      stdBalance = (stdBalance + baseSip) * (1 + i);
      stdInvested += baseSip;

      // Step Up SIP
      stepBalance = (stepBalance + stepUpMonthlySip) * (1 + i);
      stepInvested += stepUpMonthlySip;
    }

    result.push({
      year: y,
      standardTotal: Math.round(stdBalance),
      stepUpTotal: Math.round(stepBalance),
      standardInvested: Math.round(stdInvested),
      stepUpInvested: Math.round(stepInvested),
    });
  }

  return result;
}

/**
 * Calculates Net Worth from Assets and Liabilities.
 */
export function calculateNetWorth(assets: number, liabilities: number): number {
  const a = Number.isFinite(assets) ? assets : 0;
  const l = Number.isFinite(liabilities) ? liabilities : 0;
  return a - l;
}

/**
 * Formats numbers into standard Indian Rupee format (e.g. ₹12,34,567).
 */
export function formatRupee(amount: number): string {
  const val = Math.round(Number.isFinite(amount) ? amount : 0);
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(val);
}

/**
 * Formats numbers into Indian Compact format (e.g. ₹1.2 Cr, ₹45 L, ₹50 K).
 */
export function formatRupeeCompact(amount: number): string {
  const val = Math.round(Number.isFinite(amount) ? amount : 0);
  const abs = Math.abs(val);

  if (abs >= 10000000) {
    const cr = val / 10000000;
    return `₹${cr.toLocaleString("en-IN", { maximumFractionDigits: 2 })} Cr`;
  }
  if (abs >= 100000) {
    const lakh = val / 100000;
    return `₹${lakh.toLocaleString("en-IN", { maximumFractionDigits: 2 })} L`;
  }
  if (abs >= 1000) {
    const k = val / 1000;
    return `₹${k.toLocaleString("en-IN", { maximumFractionDigits: 1 })} K`;
  }
  return formatRupee(val);
}
