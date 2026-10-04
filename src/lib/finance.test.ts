import { describe, expect, it } from "vitest";
import {
  calculateEmi,
  calculateNetWorth,
  calculateRequiredSip,
  formatRupee,
  formatRupeeCompact,
  simulateStepUpSip,
} from "./finance";

describe("finance.ts pure mathematical engine", () => {
  it("calculates required SIP for 1 Cr goal in 10 years at 12% return to be ~43,040", () => {
    const result = calculateRequiredSip(10000000, 10, 12, 6, 0);
    // Annuity due calculation yields ~43,041
    expect(result.requiredMonthlySip).toBeGreaterThanOrEqual(43035);
    expect(result.requiredMonthlySip).toBeLessThanOrEqual(43045);
    expect(result.isGoalMetByStart).toBe(false);
  });

  it("handles goal already met by starting lump sum", () => {
    const result = calculateRequiredSip(5000000, 10, 12, 6, 6000000);
    expect(result.requiredMonthlySip).toBe(0);
    expect(result.isGoalMetByStart).toBe(true);
  });

  it("handles 0% return edge case cleanly", () => {
    const result = calculateRequiredSip(1200000, 10, 0, 6, 0);
    // 12L over 120 months with 0% interest = 10,000 / mo
    expect(result.requiredMonthlySip).toBe(10000);
  });

  it("calculates reducing balance EMI accurately", () => {
    // 50L home loan at 8.5% for 20 years
    const result = calculateEmi(5000000, 8.5, 20);
    expect(result.monthlyEmi).toBeGreaterThanOrEqual(43385);
    expect(result.monthlyEmi).toBeLessThanOrEqual(43400);
    expect(result.scheduleFirst12Months.length).toBe(12);
  });

  it("handles 0% interest EMI edge case", () => {
    const result = calculateEmi(120000, 0, 1);
    expect(result.monthlyEmi).toBe(10000);
    expect(result.totalInterest).toBe(0);
  });

  it("simulates Step-Up SIP and outperforms standard SIP", () => {
    const stepUpData = simulateStepUpSip(10000, 10, 10, 12);
    const lastYear = stepUpData[stepUpData.length - 1];
    expect(lastYear.stepUpTotal).toBeGreaterThan(lastYear.standardTotal);
    expect(lastYear.stepUpInvested).toBeGreaterThan(lastYear.standardInvested);
  });

  it("calculates Net Worth correctly", () => {
    expect(calculateNetWorth(10000000, 3000000)).toBe(7000000);
  });

  it("formats rupees according to Indian numbering standards", () => {
    expect(formatRupee(1234567)).toContain("12,34,567");
    expect(formatRupeeCompact(10000000)).toBe("₹1 Cr");
    expect(formatRupeeCompact(4500000)).toBe("₹45 L");
    expect(formatRupeeCompact(50000)).toBe("₹50 K");
  });
});
