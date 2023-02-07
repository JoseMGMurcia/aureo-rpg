import { GodAffinity } from "../model/godAffinity";

export const  cloneGodAffinities = (arr: GodAffinity[]): GodAffinity[] =>
  arr.map(godAffinity => {
    return new GodAffinity(
      godAffinity.getGod(),
      godAffinity.getAffinity(),
      godAffinity.getAretes(),
      godAffinity.getHamartias()
    );
  })

