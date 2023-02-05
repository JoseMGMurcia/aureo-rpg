import { TranslateService } from '@ngx-translate/core';
import { MAGIC_NUMBERS } from 'src/app/constants/number.constants';
import { getAtributePlusModsValue } from 'src/app/controller/atribute.controller';
import { ModificatorController } from 'src/app/controller/modificatorController';
import { getSkillAndModsValue } from 'src/app/controller/skillController';
import { Character } from 'src/app/model/character';
import { Gift } from 'src/app/model/gift';
import { TextGift } from 'src/app/model/giftData';

export const getDefenceData = (character: Character, translate: TranslateService): any[] => {
  const transLations = translate.instant('DETAIL_PAGE.COMBAT_SEC');
  const evade = getSkillAndModsValue(character, 'Evitar');
  const refexes = getAtributePlusModsValue(character.getAtributes().getReflexes());
  return [{
    type: transLations.ACTIVE,
    pjs: refexes + evade,
    pnjs: refexes + evade -5
  },
  {
    type: transLations.PASIVE,
    pjs: (refexes + evade +5).toString().concat(' + ', transLations.SHIELD),
    pnjs: (refexes + evade).toString().concat(' + ', transLations.SHIELD)
  }];
};


export const getAtacksData = (character: Character, translate: TranslateService): any[] => {
  const transLations = translate.instant('DETAIL_PAGE.COMBAT_SEC');
  const bodyCombat = getSkillAndModsValue(character, 'Armas CC');
  const rankedCombat = getSkillAndModsValue(character, 'Armas D');
  const brawl = getSkillAndModsValue(character, 'Pelea');
  const strength = getAtributePlusModsValue(character.getAtributes().getStrength());
  const agility = getAtributePlusModsValue(character.getAtributes().getAgility());
  const sense = getAtributePlusModsValue(character.getAtributes().getSense());

  return [{
    type: transLations.BODY_COMBAT,
    roll: agility + bodyCombat,
    dmg: strength.toString().concat(' + ', transLations.WEAPON)
  },
  {
    type: transLations.DISTANCE_COMBAT,
    roll: agility + rankedCombat,
    dmg: sense.toString().concat(' + ', transLations.WEAPON)
  },
  {
    type: transLations.BRAWL,
    roll: strength + brawl,
    dmg: strength
  }];
};

export const getCombatRankslData = (character: Character, translate: TranslateService): any[] => {
  const transLations = translate.instant('DETAIL_PAGE.COMBAT_SEC');

  const atletism = getSkillAndModsValue(character, 'Atletismo');
   return [{
    trait: transLations.MOVEMENT,
    value: getAtributePlusModsValue(character.getAtributes().getAgility()) + atletism
  },
  {
    trait: transLations.INICIATIVE,
    value: getAtributePlusModsValue(character.getAtributes().getReflexes())*2 +
    getAtributePlusModsValue(character.getAtributes().getMind())
  },
  {
    trait: transLations.TOUGHNESS,
    value: `${getAtributePlusModsValue(character.getAtributes().getResistance())*2} + ${transLations.ARMOR}`
  },
  {
    trait: transLations.LIFE_POINTS,
    value: '20 / 20'
  }];
};


export const getCalculatedSkillData = (character: Character, translate: TranslateService): any[] => {
  const transLations = translate.instant('DETAIL_PAGE.SKILLS_SEC');

  const leadership = getSkillAndModsValue(character, 'Liderar');
  const status = getSkillAndModsValue(character, 'Estatus');

  const charisma = getAtributePlusModsValue(character.getAtributes().getComunication()) + leadership + status;
  return [{
    trait: transLations.LUCK,
    value: getAtributePlusModsValue(character.getAtributes().getSoul())*2
  },
  {
    trait: transLations.CHARISMA,
    value: charisma
  }];
};

export const getCompanionsData =  (character: Character): any[] => character.getCompanions().map(
  companion =>({
    name: companion.getName(),
    player: companion.getName(),
    cult: companion.getCult()
  }));

export const getFollowersData =  (character: Character, translate: TranslateService): any[] => character.getFollowers().map(
  follower =>{
    const transLations = translate.instant('DETAIL_PAGE.BACKGROUND_SEC.FOLLOWERS');
    let mods = '';
    mods = follower.getCombat() ? mods.concat(transLations.COMBAT, getSymbol(follower.getCombat()), follower.getCombat().toString(), ', ') : mods;
    mods = follower.getPhysical() ? mods.concat(transLations.PHYSICAL, getSymbol(follower.getPhysical()), follower.getPhysical().toString(), ', ') : mods;
    mods = follower.getSpiritual() ? mods.concat(transLations.SPIRITUAL, getSymbol(follower.getSpiritual()), follower.getSpiritual().toString(), ', ') : mods;
    mods = follower.getMental() ? mods.concat(transLations.MENTAL, getSymbol(follower.getMental()), follower.getMental().toString(), ', ') : mods;
    mods = follower.getSocial() ? mods.concat(transLations.SOCIAL, getSymbol(follower.getSocial()), follower.getSocial().toString()) : mods;
    let name = follower.getName();
    name = follower.getArquetype() ? name.concat('(', follower.getArquetype(), ')') : name;
    return {
      name,
      mods,
    };
});

export const getSymbol = (value: number): string => value >= 0 ? '+' : '';

export const getCombatEquipData =  (character: Character): any[] => character.getCombatEquipment().map(
  equip =>({
    name: equip.getName(),
    initialDamage: equip.getInitialDamage(),
    activeDefence: equip.getActiveDefence(),
    armor: equip.getArmor(),
  }));

  export const getListData =  ( data: string[]): any[] => data.map(
    dataBit=> ({name: dataBit}));

export const getSocialFeaturesData =  (character: Character): any[] => character.getSocialFeatures().map(
  skill =>({
    name: skill.getName(),
    level: skill.getLevel(),
    mods: ModificatorController.getModsString(skill.getMods())
  }));

export const getPrymarySkillsData =  (character: Character): any[] => character.getPrymarySkills().map(
  skill =>({
    name: skill.getName(),
    level: skill.getLevel(),
    mods: ModificatorController.getModsString(skill.getMods())
  }));

export const getSecondarySkillsData =  (character: Character): any[] => character.getSecondarySkills().map(
  skill =>({
    name: skill.getName(),
    level: skill.getLevel(),
    mods: ModificatorController.getModsString(skill.getMods())
  }));

export const getGiftData = (gitfs: Gift[], giftData: TextGift[], translate: TranslateService) => gitfs.map(
  gift => {
    const texts = translate.instant('WIKI_PAGE');
    const acept = translate.instant('SHARED.OK');
    const index = giftData.findIndex( giftDat => giftDat.ID === gift.getName());
    return {
      name: index > -MAGIC_NUMBERS.N_1 ? giftData[index].NAME : '',
      cost: gift.getCost(),
      detail: index > -MAGIC_NUMBERS.N_1 ? giftData[index] : {},
      texts: { cost: texts.COST, desc: texts.DESC, rules: texts.RULES, cond: texts.CONDITIONS, acept}
    }
  }
)

export const getPowersData =  (character: Character): any[] => character.getPowers().map(
  gift =>({
    name: gift.getName(),
    af: gift.getMinimumAfinity(),
    am: gift.getAction(),
    ae: gift.getSpecialResistAction(),
    effect: gift.getEffect(),
    cost: gift.getCost(),
    duration: gift.getDuration(),
  }));

export const getAfinitiesData = (character: Character): any[] => character.getGodAfinities().map(
  godAfinity =>({
    god: godAfinity.getGod(),
    afinity: godAfinity.getAffinity(),
    aretes: godAfinity.getAretes(),
    hamartias: godAfinity.getHamartias()
  }));

export const  getAtributesData = (character: Character, translate: TranslateService): any[] =>{
    const transLations = translate.instant('DETAIL_PAGE.GENERAL_SEC');
    const atributes = character.getAtributes();
    const data = [
      {
        name: transLations.AGILITY,
        atribute: atributes.getAgility().getValue(),
        modif: ModificatorController.getModsString(atributes.getAgility().getMods())
      },
      {
        name: transLations.APPEAR,
        atribute: atributes.getAppearance().getValue(),
        modif: ModificatorController.getModsString(atributes.getAppearance().getMods())
      },
      {
        name: transLations.COMMUN,
        atribute: atributes.getComunication().getValue(),
        modif: ModificatorController.getModsString(atributes.getComunication().getMods())
      },
      {
        name: transLations.MIND,
        atribute: atributes.getMind().getValue(),
        modif: ModificatorController.getModsString(atributes.getMind().getMods())
      },
      {
        name: transLations.REFLEX,
        atribute: atributes.getReflexes().getValue(),
        modif: ModificatorController.getModsString(atributes.getReflexes().getMods())
      },
      {
        name: transLations.RESIST,
        atribute: atributes.getResistance().getValue(),
        modif: ModificatorController.getModsString(atributes.getResistance().getMods())
      },
      {
        name: transLations.SENSE,
        atribute: atributes.getSense().getValue(),
        modif: ModificatorController.getModsString(atributes.getSense().getMods())
      },
      {
        name: transLations.SOUL,
        atribute: atributes.getSoul().getValue(),
        modif: ModificatorController.getModsString(atributes.getSoul().getMods())
      },
      {
        name: transLations.STRENGTH,
        atribute: atributes.getStrength().getValue(),
        modif: ModificatorController.getModsString(atributes.getStrength().getMods())
      }
    ];
    return data;
};
