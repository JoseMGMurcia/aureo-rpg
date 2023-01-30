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
