export const cloneList = (list: string[]): string[] =>{
  return list.map(str => str);
}

export const getSexIcon = (sex: String): string => {
  if(sex === 'M'){
    return 'male-outline'
  }else if(sex === 'F'){
    return 'female-outline'
  }
  return 'male-female-outline';
}

export const findMinMax = (numbers: number[]): { min: number, max: number } =>{
  let min = Number.POSITIVE_INFINITY;
  let max = Number.NEGATIVE_INFINITY;

  numbers.forEach(num => {
    if (num < min) {
      min = num;
    }

    if (num > max) {
      max = num;
    }
  });

  return { min, max };
}
