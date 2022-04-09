import { Baremes, Rates } from "../types";
import {
  currencyFormatter,
  currencyFormatterWithDecimal,
  percentFormat,
} from "../utils";
import { RATES_2020, RATES_2021 } from "../constants/taxRates";

export const buildRows = (
  inputBareme: Baremes,
  slices: number[]
): JSX.Element[] => {
  let taxRate: Rates[] = [];
  if (inputBareme === Baremes._2021) {
    taxRate = RATES_2021;
  } else {
    taxRate = RATES_2020;
  }

  return taxRate.map((row, index) => {
    return (
      <tr key={`row-${index}`}>
        <td>
          {row.max !== Infinity ? currencyFormatter.format(row.max) : "-"}
        </td>
        <td>{percentFormat.format(row.percent)}</td>
        <td>
          {slices.length > 0
            ? currencyFormatterWithDecimal.format(slices[index])
            : currencyFormatter.format(0)}
        </td>
      </tr>
    );
  });
};
