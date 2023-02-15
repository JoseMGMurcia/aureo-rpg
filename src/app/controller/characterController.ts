import { Character } from 'src/app/model/character';
import { MAGIC_NUMBERS } from '../constants/number.constants';
import { Atributes } from '../model/atributes';
import { CombatEquip, CombatEquipEnum } from '../model/combatEquip';
import { Companion } from '../model/companion';
import { Follower } from '../model/follower';
import { Gift } from '../model/gift';
import { GodAffinity } from '../model/godAffinity';
import { Modificator } from '../model/modificator';
import { Power } from '../model/power';
import { Skill } from '../model/skill';

export class CharacterController{

  static generateId(name: string): string {
      return `${name}_${Date.now()}`;
  }

  static getCharacterValidation(character: Character): CharacterValidationResponse{
      const characterResponse: CharacterValidationResponse = new CharacterValidationResponse();

      if ( !this.isNameValid(character.getName()) ){
          characterResponse.getErrors().push(new ValidationError(ValidationErrorEnum.invalidName, 'Invalid Character name'));
      }

      // TODO character other sections validation
      return characterResponse;
  }

  static isNameValid(name: string): boolean {
      const MINUMUM_NAME_LENGTH = MAGIC_NUMBERS.N_3;
      return name.length >= MINUMUM_NAME_LENGTH && Number.isNaN( Number(name) ) ? true : false;
  }

  static converToCharacters(unformatedChars: any[]): Character[]{
    return unformatedChars.map( character => CharacterController.mapCharacter(character));
  }

  static mapCharacter(protoCharacter: any): Character{
      const newCharacter = new Character('');
      newCharacter.setName(protoCharacter.name);
      newCharacter.setId(protoCharacter.id);

      newCharacter.setAccumulatedXP(protoCharacter.accumulatedXP);
      newCharacter.setActualLifeP(protoCharacter.actualLifeP);
      newCharacter.setAge(protoCharacter.age);
      newCharacter.setArquetype(protoCharacter.arquetype);

      const attributes: Atributes = new Atributes();
      const prAttributes = protoCharacter.atributes;
      attributes.getAgility().setValue(prAttributes.agility.value);
      attributes.getAgility().setMods(CharacterController.copyMods(prAttributes.agility.mods));
      attributes.getAppearance().setValue(prAttributes.appearance.value);
      attributes.getAppearance().setMods(CharacterController.copyMods(prAttributes.appearance.mods));
      attributes.getComunication().setValue(prAttributes.comunication.value);
      attributes.getComunication().setMods(CharacterController.copyMods(prAttributes.comunication.mods));
      attributes.getMind().setValue(prAttributes.mind.value);
      attributes.getMind().setMods(CharacterController.copyMods(prAttributes.mind.mods));
      attributes.getReflexes().setValue(prAttributes.reflexes.value);
      attributes.getReflexes().setMods(CharacterController.copyMods(prAttributes.reflexes.mods));
      attributes.getResistance().setValue(prAttributes.resistance.value);
      attributes.getResistance().setMods(CharacterController.copyMods(prAttributes.resistance.mods));
      attributes.getSense().setValue(prAttributes.sense.value);
      attributes.getSense().setMods(CharacterController.copyMods(prAttributes.sense.mods));
      attributes.getSoul().setValue(prAttributes.soul.value);
      attributes.getSoul().setMods(CharacterController.copyMods(prAttributes.soul.mods));
      attributes.getStrength().setValue(prAttributes.strength.value);
      attributes.getStrength().setMods(CharacterController.copyMods(prAttributes.strength.mods));

      newCharacter.setAtributes(attributes);

      newCharacter.setAureo(protoCharacter.aureo);
      newCharacter.setAureoRemaining(protoCharacter.aureoRemaining);
      newCharacter.setAureoXP(protoCharacter.aureoXP);

      newCharacter.setCombatEquipment(CharacterController.copyCombatEquip(protoCharacter.combatEquipment));
      newCharacter.setCompanions(CharacterController.copyCompanions(protoCharacter.companions));
      newCharacter.setCult(protoCharacter.cult);
      newCharacter.setCurses(CharacterController.copyGifts(protoCharacter.curses));
      newCharacter.setCommonGifts(CharacterController.copyGifts(protoCharacter.commonGifts));
      newCharacter.setDivineGifts(CharacterController.copyGifts(protoCharacter.divineGifts));
      newCharacter.setFollowers(CharacterController.copyFollowers(protoCharacter.followers));

      newCharacter.setGlory(protoCharacter.glory);
      newCharacter.setGloryLines(protoCharacter.gloryLines);
      newCharacter.setGodAfinities(CharacterController.copyGodAffinities(protoCharacter.godAfinities));

      newCharacter.setHibris(protoCharacter.hibris);
      newCharacter.setInfamy(protoCharacter.infamy);
      newCharacter.setInfamyLines(protoCharacter.infamyLines);
      newCharacter.setLifePoints(protoCharacter.lifePoints);
      newCharacter.setOtherEquip(protoCharacter.otherEquip);
      newCharacter.setOtherNotes(protoCharacter.otherNotes);

      newCharacter.setPlayer(protoCharacter.player);
      newCharacter.setPolis(protoCharacter.polis);
      newCharacter.setPowers(CharacterController.copyPowers(protoCharacter.powers));
      newCharacter.setSavedXP(protoCharacter.savedXP);
      newCharacter.setSex(protoCharacter.sex);

      newCharacter.setPrymarySkills(CharacterController.copySkills(protoCharacter.primarySkills));
      newCharacter.setSecondarySkills(CharacterController.copySkills(protoCharacter.secondarySkills));

      newCharacter.setSocialFeatures(CharacterController.copySkills(protoCharacter.​​socialFeatures));
      newCharacter.setSocialGroup(protoCharacter.socialGroup);
      newCharacter.setTitles(protoCharacter.titles);
      newCharacter.setHistory(protoCharacter.history);

      return newCharacter;
  }

  public static getRandomName(names: string[]): string {
    const randomIndex = Math.floor(Math.random() * names.length);
    return names[randomIndex];
  }

  private static copyCombatEquip(combatEq: any[]): CombatEquip[]{
      return combatEq.map( equip => {
        const combatEqui: CombatEquip = new CombatEquip(CombatEquipEnum.WEAPON_CC_SHORT, equip.name);
        combatEqui.setEquipType(equip.equipType);
        combatEqui.setInitialDamage(equip.initialDamage);
        combatEqui.setActiveDefence(equip.activeDefence);
        combatEqui.setArmor(equip.armor);
        combatEqui.setHands(equip.hands);
        combatEqui.setPrecision(equip.precision);
        combatEqui.setPrice(equip.price);
        combatEqui.setAtletism(equip.atletism);
        combatEqui.setSense(equip.sense);
        return combatEqui;
      });
  }

  private static copyCompanions(companions: any[]): Companion[]{
    return companions.map( companion => new Companion(companion.name, companion.player, companion.cult));
  }

  private static copyGifts(gifts: any[]): Gift[]{
    return gifts.map((gift)=> new Gift(gift.name, Number(gift.cost)));
  }

  private static copyFollowers(followers: any[]): Follower[]{
    return followers.map( follower => {
      const followerR = new Follower(follower.name);
        followerR.setArquetype(follower.arquetype);
        followerR.setCombat(follower.combat);
        followerR.setPhysical(follower.physical);
        followerR.setEspiritual(follower.espiritual);
        followerR.setMental(follower.mental);
        followerR.setSocial(follower.social);
        return followerR;
    });
  }

  private static copyGodAffinities(godAffinities: any[]): GodAffinity[]{
    return godAffinities.map( godAf => new GodAffinity( godAf.god, godAf.affinity, godAf.aretes, godAf.hamartias ));
  }

  private static copyPowers(powers: any[]): Power[] {
    return powers.map( power => new Power(power.name));
  }

  private static copySkills(skills: any[]): Skill[]{
    return skills.map((skill)=> {
      const skillR = new Skill(skill.name, skill.level);
      skillR.setMods(CharacterController.copyMods(skill.mods));
      return skillR;
    });
  }

  private static copyMods(mods: any[]): Modificator[]{
    return mods.map((mod)=> new Modificator(mod.value, mod.name, mod.partial));
  }
}

class CharacterValidationResponse{

  private isValid: boolean;
  private errors: ValidationError[];

  constructor(){
      this.isValid = true;
      this.errors = [];
  }

  //GETERS & SETTERS

  public getIsValid(){
      return this.isValid;
  }

  public setIsValid(isValid: boolean){
      this.isValid = isValid;
  }

  public getErrors(){
      return this.errors;
  }

  public setErrors(errors: ValidationError[]){
      this.errors = errors;
  }
}

class ValidationError{
  private code: number;
  private message: string;

  constructor( errorType: ValidationErrorType, message: string ){
      this.code = errorType;
      this.message = message;
  }

  //GETERS & SETTERS

  public getCode(){
      return this.code;
  }
  public setCode(code: number){
      this.code = code;
  }

  public getMessage(){
      return this.message;
  }
  public setMessage(message: string){
      this.message = message;
  }
}

export enum ValidationErrorEnum {
  invalidName = 1,
  invalidAtributes = 2
}

export type ValidationErrorType =
  ValidationErrorEnum.invalidName |
  ValidationErrorEnum.invalidAtributes;
