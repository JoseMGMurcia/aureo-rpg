import { Atribute, Atributes } from '../model/atributes';
import { Modificator } from '../model/modificator';

export const getAtributePlusModsValue = (atribute: Atribute): number  => {

  let value = atribute.getValue();

  atribute.getMods().forEach(mod => {
    value = value + mod.getValue();
  });

  return value;
};

export const cloneAtributes = (atributes: Atributes): Atributes =>{
  const clonedAtributes = new Atributes();

  clonedAtributes.setAgility( cloneAtribute(atributes.getAgility()) );
  clonedAtributes.setAppearance( cloneAtribute(atributes.getAppearance()) );
  clonedAtributes.setComunication( cloneAtribute(atributes.getComunication()) );
  clonedAtributes.setMind( cloneAtribute(atributes.getMind()) );
  clonedAtributes.setReflexes( cloneAtribute(atributes.getReflexes()) );
  clonedAtributes.setResistance( cloneAtribute(atributes.getResistance()) );
  clonedAtributes.setSense( cloneAtribute(atributes.getSense()) );
  clonedAtributes.setSoul( cloneAtribute(atributes.getSoul()) );
  clonedAtributes.setStrength( cloneAtribute(atributes.getStrength()) );

  return clonedAtributes;
};

const cloneAtribute = (atribute: Atribute): Atribute =>{
  const clonedAtribute = new Atribute(atribute.getValue());

  atribute.getMods().forEach((mod: Modificator) => {
    clonedAtribute.getMods().push( new Modificator(
      mod.getValue(),
      mod.getName(),
      mod.isPartial()
    ));
  });
  return clonedAtribute;
};
