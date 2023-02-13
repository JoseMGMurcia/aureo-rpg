import { IconTypes } from "../constants/icon.constants";

export const cloneList = (list: string[]): string[] =>{
  return list.map(str => str);
}

export const getSexIcon = (sex: String): string => {
  if(sex === 'M'){
    return IconTypes.MALE;
  }else if(sex === 'F'){
    return IconTypes.FEMALE;
  }
  return IconTypes.MALE_FEMALE;
}

export const findMinMax = (numbers: number[]): { min: number, max: number } =>{
  return { min: Math.min(...numbers), max: Math.max(...numbers) };
}
