export type Rates = {
  max: number;
  percent: number;
};

export enum Baremes {
  /*"_2020" = "2020",*/
  "_2021" = "2021",
  "_2022" = "2022",
}

export type Inputs = {
  bareme: Baremes;
  revenues: number;
  inARelationship: boolean;
  children: number;
};
