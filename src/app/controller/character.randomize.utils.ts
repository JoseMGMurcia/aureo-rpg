import { CultsPowers } from "../model/powerData";

export const getRandomGender = (): string => {
  const options = ['M', 'F', 'U', 'M', 'F'];
  return options[Math.floor(Math.random() * options.length)];
};

export const getRandomCult = ( cultsPowers: CultsPowers): string => {
  const cults = cultsPowers.cults;
  const cult = cults[Math.floor(Math.random() * cults.length)];
  return cult.cultName;
}
