import "./App.css";
import { useForm } from "react-hook-form";
import { getPart, taxWithPart, taxPerSlices } from "./business";
import { useEffect, useState } from "react";
import { Baremes, Inputs, Rates } from "./types";
import { RATES_2021, RATES_2022 } from "./constants/taxRates";
import {
  currencyFormatter,
  percentFormat,
  percentFormatWithDecimal,
} from "./utils";
import { buildRows } from "./business/rows";

function App() {
  /* Inputs States */
  const [inputBareme, setInputBareme] = useState<Baremes>(Baremes._2022);
  const [inputRevenues, setInputRevenues] = useState<number | undefined>(
    undefined
  );
  const [inputCouple, setInputCouple] = useState<boolean>(false);
  const [inputChildren, setInputChildren] = useState<number | undefined>(
    undefined
  );
  /* Output States */
  const [slices, setSlices] = useState<number[]>([]);
  const [resultTax, setResultTax] = useState<string>("");
  const [proportion, setProportion] = useState<string>("");
  const [resultRevenues, setResultRevenues] = useState<string>("");
  const [rows, setRows] = useState<JSX.Element[]>(
    buildRows(inputBareme, slices)
  );

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const handleBareme = (event: any) => {
    setInputBareme(event.currentTarget.value as Baremes);
  };

  const handleRevenues = (event: any) => {
    setInputRevenues(event.target.valueAsNumber);
  };

  const handleCouple = (event: any) => {
    setInputCouple(event.target.checked);
  };

  const handleChildren = (event: any) => {
    setInputChildren(event.target.valueAsNumber);
  };

  useEffect(() => {
    let taxRate: Rates[] = [];
    if (inputBareme === Baremes._2022) {
      taxRate = RATES_2022;
    } else {
      taxRate = RATES_2021;
    }

    const handleFormChange = () => {
      if (!inputRevenues) {
        setInputRevenues(undefined);
        setResultTax("");
        setProportion("");
        setResultRevenues("");
        setSlices([]);
        return;
      }

      const parts = getPart(inputCouple, inputChildren);

      const resultRound = Math.round(
        taxWithPart(inputRevenues, parts, taxRate)
      );

      setResultTax(currencyFormatter.format(resultRound));
      setProportion(
        percentFormatWithDecimal.format(resultRound / inputRevenues)
      );
      setResultRevenues(currencyFormatter.format(inputRevenues - resultRound));
      setSlices(taxPerSlices(inputRevenues / parts, taxRate));
    };

    handleFormChange();
  }, [inputBareme, inputRevenues, inputCouple, inputChildren]);

  useEffect(() => {
    const buildTable = () => {
      setRows(buildRows(inputBareme, slices));
    };
    buildTable();
  }, [slices]);

  return (
    <div className="App">
      <header>
        <h1>Calculez votre imposition</h1>
      </header>
      <main>
        <form>
          <fieldset>
            <legend className="legend">Votre situation</legend>
            <div className="situationField">
              <div className="baremeContainer">
                <h2>Barème</h2>
                <div className="radioContainer field">
                  <div className="radioWrapper">
                    <input
                      {...register("bareme", { required: true })}
                      type="radio"
                      value={Baremes._2021}
                      id="_2021"
                      onChange={handleBareme}
                      checked={inputBareme === Baremes._2021}
                    />
                    <label htmlFor="_2021">{Baremes._2021}</label>
                  </div>

                  <div className="radioWrapper">
                    <input
                      {...register("bareme", { required: true })}
                      type="radio"
                      value={Baremes._2022}
                      id="_2022"
                      onChange={handleBareme}
                      checked={inputBareme === Baremes._2022}
                    />
                    <label htmlFor="_2022">{Baremes._2022}</label>
                  </div>
                </div>
              </div>

              <div className="revenuesContainer field">
                <label htmlFor="revenues">
                  <h2>Revenus net annuels</h2>
                </label>
                <input
                  type="number"
                  className="inputNumber"
                  id="revenues"
                  min="0"
                  placeholder="Exemple: 46000"
                  {...register("revenues", { required: true, min: 0 })}
                  onChange={handleRevenues}
                  value={inputRevenues}
                />
                {errors.revenues && (
                  <p className="error">Veuillez renseigner vos revenues</p>
                )}
              </div>

              <div className="inARelationshipContainer field">
                <h2>Situation maritale</h2>
                <label htmlFor="inARelationship">
                  Cochez cette case si vous êtes en couple :
                </label>
                <input
                  type="checkbox"
                  id="inARelationship"
                  {...register("inARelationship", { required: true })}
                  onChange={handleCouple}
                  checked={inputCouple}
                />
              </div>

              <div className="childrenContainer field">
                <label htmlFor="children">
                  <h2>Nombre d'enfants à charge</h2>
                </label>
                <input
                  type="number"
                  className="inputNumber"
                  id="children"
                  min="0"
                  placeholder="Exemple : 2"
                  {...register("children", { required: true, min: 0 })}
                  onChange={handleChildren}
                  value={inputChildren}
                />
                {errors.children && (
                  <p className="error">
                    Veuillez renseigner le nombre d'enfants rattachés à votre
                    foyer
                  </p>
                )}
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend className="legend">Résultats</legend>
            <div className="resultContainer">
              <div className="field">
                <h2>Impôts</h2>
                <span id="resultImpot">
                  {resultTax || currencyFormatter.format(0)}
                </span>
              </div>
              <div className="field">
                <h2>Proportion</h2>
                <span id="resultRate">
                  {proportion || percentFormat.format(0)}
                </span>
                <span>&nbsp;du revenu imposable</span>
              </div>
              <div className="resultFinal field">
                <p>Résultat</p>
                <p>{resultRevenues || currencyFormatter.format(0)}</p>
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend className="legend">Détails par tranches</legend>
            <div className="detailsContainer">
              <table>
                <thead>
                  <tr>
                    <th>Palier de revenus</th>
                    <th>% d'imposition</th>
                    <th>Montant dû</th>
                  </tr>
                </thead>
                <tbody>{rows}</tbody>
              </table>
            </div>
          </fieldset>
        </form>
      </main>
    </div>
  );
}

export default App;
