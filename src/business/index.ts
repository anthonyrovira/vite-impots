import { Rates } from "../types";
import { round } from "../utils";

/**
 * Calcul d'imposition
 * @param {number} revenue
 * @param {array} rates
 * @returns {number}
 */
export const tax = (revenue: number, rates: Rates[]): number => {
  const slices = taxPerSlices(revenue, rates);
  //console.log("I : " + tranches);
  return slices.reduce((acc, tranches) => acc + tranches, 0);
};

/**
 * Calcul d'imposition
 * @param {number} revenue
 * @param {array} rates
 * @returns {number[]}
 */
export const taxPerSlices = (revenue: number, rates: Rates[]): number[] => {
  const slices: number[] = [];
  for (const index in rates) {
    const rate = rates[Number(index)];
    const min = rates[Number(index) - 1] ? rates[Number(index) - 1].max + 1 : 0;
    if (revenue > rate.max) {
      slices.push(round((rate.max - min) * rate.percent, 2));
    } else {
      slices.push(round((revenue - min) * rate.percent, 2));
      break;
    }
  }
  return [...slices, ...new Array(rates.length - slices.length).fill(0)];
};

/**
 * @param {boolean} InARelationship
 * @param {number} children
 * @returns {number}
 */
export const getPart = (
  InARelationship: boolean = false,
  children: number = 0
): number => {
  return (InARelationship ? 2 : 1) + children * 0.5;
};

/**
 * @param {number} revenue
 * @param {number} part
 * @param {object} rates
 * @returns {number}
 */
export const taxWithPart = (
  revenue: number,
  part: number,
  rates: Rates[]
): number => {
  //console.log(impot(revenue / part, rates));
  return Math.round(part * tax(revenue / part, rates));
};
