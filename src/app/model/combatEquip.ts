export class CombatEquip {
    private equipType: CombatEquipType;
    private name: string;
    private initialDamage = 0;
    private activeDefence = 0;
    private armor = 0;
    private hands = 0;
    private precision = '';
    private price = 0;
    private atletism = 0;
    private sense = 0;


    constructor(equipType: CombatEquipType ,name: string, initialDamage = 0, activeDefence = 0 , armor = 0, hands = 0, precision = '', price = 0, atletism = 0, sense = 0){
        this.equipType = equipType;
        this.name = name;
        this.initialDamage = initialDamage;
        this.activeDefence = activeDefence;
        this.armor = armor;
        this.hands = hands;
        this.precision = precision;
        this.price = price;
        this.atletism = atletism;
        this.sense = sense;
    }

    //Getters & Setters

    public getEquipType(): CombatEquipType {
      return this.equipType;
    }

    public setEquipType(equipType: CombatEquipType): void {
        this.equipType = equipType;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getInitialDamage(): number {
        return this.initialDamage;
    }

    public setInitialDamage(initialDamage: number): void {
        this.initialDamage = initialDamage;
    }

    public getActiveDefence(): number {
        return this.activeDefence;
    }

    public setActiveDefence(activeDefence: number): void {
        this.activeDefence = activeDefence;
    }

    public getArmor(): number {
        return this.armor;
    }

    public setArmor(armor: number): void {
        this.armor = armor;
    }

    public getHands(): number {
        return this.hands;
    }

    public setHands(hands: number): void {
        this.hands = hands;
    }

    public getPrecision(): string {
        return this.precision;
    }

    public setPrecision(precision: string): void {
        this.precision = precision;
    }

    public getPrice(): number {
        return this.price;
    }

    public setPrice(price: number): void {
        this.price = price;
    }

    public getAtletism(): number {
        return this.atletism;
    }

    public setAtletism(atletism: number): void {
        this.atletism = atletism;
    }

    public getSense(): number {
        return this.sense;
    }

    public setSense(sense: number): void {
        this.sense = sense;
    }

}

export enum CombatEquipEnum {
  WEAPON_CC_SHORT = 'WEAPON_CC_SHORT',
  WEAPON_CC_MEDIUM = 'WEAPON_CC_MEDIUM',
  WEAPON_CC_LONG = 'WEAPON_CC_LONG',
  WEAPON_CC_HEAVY = 'WEAPON_CC_HEAVY',
  WEAPON_D_SMALL = 'WEAPON_D_SMALL',
  WEAPON_D_MEDIUM = 'WEAPON_D_MEDIUM',
  WEAPON_D_LARGE = 'WEAPON_D_LARGE',
  SHIELD_MEDIUM = 'SHIELD_MEDIUM',
  SHIELD_HEAVY = 'SHIELD_HEAVY',
  ARMOR_LIGHT = 'ARMOR_LIGHT',
  ARMOR_MEDIUM = 'ARMOR_MEDIUM',
  ARMOR_HEAVY = 'ARMOR_HEAVY',
}

export type CombatEquipType =
  CombatEquipEnum.WEAPON_CC_SHORT |
  CombatEquipEnum.WEAPON_CC_MEDIUM |
  CombatEquipEnum.WEAPON_CC_LONG |
  CombatEquipEnum.WEAPON_CC_HEAVY |
  CombatEquipEnum.WEAPON_D_SMALL |
  CombatEquipEnum.WEAPON_D_MEDIUM |
  CombatEquipEnum.WEAPON_D_LARGE |
  CombatEquipEnum.SHIELD_MEDIUM |
  CombatEquipEnum.SHIELD_HEAVY |
  CombatEquipEnum.ARMOR_LIGHT |
  CombatEquipEnum.ARMOR_MEDIUM |
  CombatEquipEnum.ARMOR_HEAVY;
