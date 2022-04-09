import App from "./App";
import { tax, taxPerSlices, taxWithPart } from "./business";
import { RATES_2021, RATES_2022 } from "./constants/taxRates";

describe("Imposition", () => {
  describe("tax()", () => {
    test("Célibataire avec 32000€ en 2021", () => {
      expect(tax(32000, RATES_2021)).toBe(3605.45);
    });

    test("Célibataire avec 18650€ en 2021", () => {
      expect(tax(18650, RATES_2021)).toBe(942.15);
    });

    test("Célibataire avec 32000€ en  2022", () => {
      expect(tax(32000, RATES_2022)).toBe(3521.54);
    });

    test("Célibataire avec 18650€ en  2022", () => {
      expect(tax(18650, RATES_2022)).toBe(926.64);
    });
  });

  describe("taxWithPart()", () => {
    test("Célibataire avec 32000€ en 2021", () => {
      expect(taxWithPart(32000, 1, RATES_2021)).toBe(3605);
    });

    test("Couple avec  deux enfants et 55950€ en 2021", () => {
      expect(taxWithPart(55950, 3, RATES_2021)).toBe(2826);
    });
    test("Célibataire avec 32000€ en  2022", () => {
      expect(taxWithPart(32000, 1, RATES_2022)).toBe(3522);
    });

    test("Couple avec deux enfants et 55950€  en  2022", () => {
      expect(taxWithPart(55950, 3, RATES_2022)).toBe(2780);
    });
  });

  describe("taxPerSlices()", () => {
    test("Célibataire avec 32000€ en 2021", () => {
      expect(taxPerSlices(32000, RATES_2021)).toEqual([
        0, 1718.75, 1886.7, 0, 0,
      ]);
    });

    test("Célibataire avec 18650€ en 2021", () => {
      expect(taxPerSlices(18650, RATES_2021)).toEqual([0, 942.15, 0, 0, 0]);
    });
    test("Célibataire avec 32000€  en  2022", () => {
      expect(taxPerSlices(32000, RATES_2022)).toEqual([
        0, 1742.84, 1778.7, 0, 0,
      ]);
    });

    test("Célibataire avec 18650€  en  2022", () => {
      expect(taxPerSlices(18650, RATES_2022)).toEqual([0, 926.64, 0, 0, 0]);
    });
  });
});
