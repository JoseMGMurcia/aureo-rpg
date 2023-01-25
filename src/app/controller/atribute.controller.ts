import { Atribute } from '../model/atributes';

export const getAttAndModsValue = (atribute: Atribute): number  => {

  let value = atribute.getValue();

  atribute.getMods().forEach(mod => {
    value = value + mod.getValue();
  });

  return value;
};
