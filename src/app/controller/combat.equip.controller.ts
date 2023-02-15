import { AlertOptions } from "@ionic/angular";
import { COMBAT_EQUIP_CATALOG } from "../constants/equip.constants";
import { MAGIC_NUMBERS } from "../constants/number.constants";
import { Character } from "../model/character";
import { CombatEquip, CombatEquipEnum } from "../model/combatEquip";
import { openAlert } from "../utils/alert.utils";
import { getAtributePlusModsValue } from "./atribute.controller";

export const  combatEquipFactory = (equip: CombatEquip, name: string): CombatEquip  => {
  return new CombatEquip(
    equip.getEquipType(),
    name,
    equip.getInitialDamage(),
    equip.getActiveDefence(),
    equip.getArmor(),
    equip.getHands(),
    equip.getPrecision(),
    equip.getPrice(),
    equip.getAtletism(),
    equip.getSense()
  );
}

export const getTotalDamage = (equip: CombatEquip, character: Character): number => {
  const damageCalc = {
    [CombatEquipEnum.WEAPON_CC_SHORT]: () =>  equip.getInitialDamage() + getAtributePlusModsValue(character.getAtributes().getStrength()),
    [CombatEquipEnum.WEAPON_CC_LONG]: () =>   equip.getInitialDamage() + getAtributePlusModsValue(character.getAtributes().getStrength()),
    [CombatEquipEnum.WEAPON_CC_MEDIUM]: () => equip.getInitialDamage() + getAtributePlusModsValue(character.getAtributes().getStrength()),
    [CombatEquipEnum.SHIELD_HEAVY]: () =>     equip.getInitialDamage() + getAtributePlusModsValue(character.getAtributes().getStrength()),
    [CombatEquipEnum.WEAPON_CC_HEAVY]: () =>  equip.getInitialDamage() + getAtributePlusModsValue(character.getAtributes().getStrength())*2,
    [CombatEquipEnum.WEAPON_D_SMALL]: () =>   equip.getInitialDamage() + getAtributePlusModsValue(character.getAtributes().getSense()),
    [CombatEquipEnum.WEAPON_D_LARGE]: () =>   equip.getInitialDamage() + getAtributePlusModsValue(character.getAtributes().getSense()),
    [CombatEquipEnum.WEAPON_D_MEDIUM]: () =>  equip.getInitialDamage() + getAtributePlusModsValue(character.getAtributes().getSense())*2,
    [CombatEquipEnum.SHIELD_MEDIUM]: () => MAGIC_NUMBERS.N_0,
    [CombatEquipEnum.ARMOR_LIGHT]: () => MAGIC_NUMBERS.N_0,
    [CombatEquipEnum.ARMOR_MEDIUM]: () => MAGIC_NUMBERS.N_0,
    [CombatEquipEnum.ARMOR_HEAVY]: () => MAGIC_NUMBERS.N_0,
  }
  const type = equip.getEquipType();
  return damageCalc[type]() ? damageCalc[type]() : MAGIC_NUMBERS.N_0;
}

export const getCombatEquipArray = (): CombatEquip[] =>
  Object.keys(COMBAT_EQUIP_CATALOG).map((key) => {
    return combatEquipFactory(COMBAT_EQUIP_CATALOG[key], COMBAT_EQUIP_CATALOG[key].getName()); //non translated  TODO translate
  });

  export const cloneCombatEquip = (equip: CombatEquip[]): CombatEquip[] => {
    return equip.map((equip) => {
      return combatEquipFactory(equip, equip.getName());
    });
  };

  export const openEquipDetail = (row: any) => {

    const alertParams: AlertOptions = {
      header: row.name,
      message: `<div class="alert-row">
                  <p class="alert-row-cell"><b>${row.texts.initialDamage}</b> ${row.initialDamage}</p>
                  <p class="alert-row-cell"><b>${row.texts.activeDefence}</b> ${row.activeDefence}</p>
                </div>
                <div class="alert-row">
                  <p class="alert-row-cell"><b>${row.texts.armor}</b> ${row.armor}</p>
                  <p class="alert-row-cell"><b>${row.texts.hands}</b> ${row.hands}</p>
                </div>
                <div class="alert-row">
                  <p class="alert-row-cell"><b>${row.texts.precision}</b> ${row.precision}</p>
                  <p class="alert-row-cell"><b>${row.texts.atlethism}</b> ${row.atlethism}</p>
                </div>
                <div class="alert-row">
                  <p class="alert-row-cell"><b>${row.texts.price}</b> ${row.price}</p>
                  <p class="alert-row-cell"><b>${row.texts.sense}</b> ${row.sense}</p>
                </div>`,
      buttons: [{
        text: row.texts.acept,
        cssClass: 'alert-secondaryButton',
      }]
    }
    openAlert(alertParams);
  };
