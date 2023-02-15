import { type } from "os";
import { CombatEquip, CombatEquipEnum } from "../model/combatEquip";

enum Hands {
    ONE = 1,
    TWO = 2
}

enum Precision {
    CC = 'CC',
    FUEx5 = 'FUEx5',
    FUEx10 = 'FUEx10',
    NO = '-'
}

enum Price {
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4,
  FIVE = 5
}

export const COMBAT_EQUIP_CATALOG: any = {       // TYPE,               NAME         DAMAGE, DEFENSE, ARMOR,   HANDS,     PRECISION,        PRICE,   ATHLETISM,  SENSE
  WEAPON_CC_SHORT:  new CombatEquip(CombatEquipEnum.WEAPON_CC_SHORT, 'Arma CC corta',    2,      0,      0,    Hands.ONE, Precision.CC,     Price.ONE,    0,      0),
  WEAPON_CC_MEDIUM: new CombatEquip(CombatEquipEnum.WEAPON_CC_MEDIUM,'Arma CC media',    4,      0,      0,    Hands.ONE, Precision.CC,     Price.THREE,  0,      0),
  WEAPON_CC_LONG:   new CombatEquip(CombatEquipEnum.WEAPON_CC_LONG,  'Arma CC larga',    3,      0,      0,    Hands.ONE, Precision.CC,     Price.TWO,    0,      0),// +1 en Iniciativa
  WEAPON_CC_HEAVY:  new CombatEquip(CombatEquipEnum.WEAPON_CC_HEAVY, 'Arma CC pesada',   1,      0,      0,    Hands.TWO, Precision.CC,     Price.FOUR,  -1,      0),// DMG FUEX2 +1
  WEAPON_D_SMALL:   new CombatEquip(CombatEquipEnum.WEAPON_D_SMALL,  'Arma D pequeña',   1,      0,      0,    Hands.ONE, Precision.FUEx5,  Price.ONE,    0,      0),// DMG SENX2
  WEAPON_D_MEDIUM:  new CombatEquip(CombatEquipEnum.WEAPON_D_MEDIUM, 'Arma D mediana',   0,      0,      0,    Hands.TWO, Precision.FUEx10, Price.TWO,    0,      0),
  WEAPON_D_LARGE:   new CombatEquip(CombatEquipEnum.WEAPON_D_LARGE,  'Arma D grande',    3,      0,      0,    Hands.ONE, Precision.FUEx5,  Price.TWO,    0,      0),
  SHIELD_MEDIUM:    new CombatEquip(CombatEquipEnum.SHIELD_MEDIUM,   'Escudo medio',     0,      1,      0,    Hands.ONE, Precision.CC,     Price.TWO,    0,      0),
  SHIELD_HEAVY:     new CombatEquip(CombatEquipEnum.SHIELD_HEAVY,    'Escudo pesado',    1,      2,      0,    Hands.ONE, Precision.CC,     Price.THREE, -1,      0),//Can attack
  ARMOR_LIGHT:      new CombatEquip(CombatEquipEnum.ARMOR_LIGHT,     'Armadura ligera',  0,      0,      2,        0,     Precision.NO,     Price.TWO,    0,      0),
  ARMOR_MEDIUM:     new CombatEquip(CombatEquipEnum.ARMOR_MEDIUM,    'Armadura media',   0,      0,      4,        0,     Precision.NO,     Price.THREE, -1,     -1),
  ARMOR_HEAVY:      new CombatEquip(CombatEquipEnum.ARMOR_HEAVY,     'Armadura pesada',  0,      0,      6,        0,     Precision.NO,     Price.FOUR,  -3,     -2)
}
