import { TranslateService } from '@ngx-translate/core';
import { MAGIC_NUMBERS } from 'src/app/constants/number.constants';
import { getAtributePlusModsValue } from 'src/app/controller/atribute.controller';
import { getTotalDamage } from 'src/app/controller/combat.equip.controller';
import { ModificatorController } from 'src/app/controller/modificatorController';
import { getPower } from 'src/app/controller/power.controller';
import { getSkillAndModsValue } from 'src/app/controller/skillController';
import { Character } from 'src/app/model/character';
import { Gift } from 'src/app/model/gift';
import { TextGift } from 'src/app/model/giftData';
import { PowersData } from 'src/app/model/powerData';

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
    pjs: `${refexes + evade  + 5} + ${transLations.SHIELD}`,
    pnjs: `${refexes + evade} + ${transLations.SHIELD}`
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
    dmg: `${strength} + ${transLations.WEAPON}`
  },
  {
    type: transLations.DISTANCE_COMBAT,
    roll: agility + rankedCombat,
    dmg: `${sense} + ${transLations.WEAPON}`
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
    mods = follower.getCombat() ? `${mods}${transLations.COMBAT}${getSymbol(follower.getCombat())}${follower.getCombat()}, ` : mods;
    mods = follower.getPhysical() ?  `${mods}${transLations.PHYSICAL}${getSymbol(follower.getPhysical())}${follower.getPhysical()}, ` : mods;
    mods = follower.getSpiritual() ? `${mods}${transLations.SPIRITUAL}${getSymbol(follower.getSpiritual())}${follower.getSpiritual()}, ` : mods;
    mods = follower.getMental() ?   `${mods}${transLations.MENTAL}${getSymbol(follower.getMental())}${follower.getMental()}, ` : mods;
    mods = follower.getSocial() ?   `${mods}${transLations.SOCIAL}${getSymbol(follower.getSocial())}${follower.getSocial()}, ` : mods;
    return {
      name: `${follower.getName()} (${follower.getArquetype()})`,
      mods,
    };
  });

export const getSymbol = (value: number): string => value >= 0 ? '+' : '';

export const getCombatEquipData =  (character: Character, translate: TranslateService): any[] => character.getCombatEquipment().map(
  equip =>{
    const texts = translate.instant('WIKI_PAGE.COMBAT_EQUIP_DETAIL');
    return{
    name: equip.getName(),
    initialDamage: getTotalDamage(equip, character),
    activeDefence: equip.getActiveDefence(),
    armor: equip.getArmor(),
    hands: equip.getHands(),
    precision: equip.getPrecision(),
    price: equip.getPrice(),
    atlethism: equip.getAtletism(),
    sense: equip.getSense(),
    texts: {
      initialDamage: texts.DAMAGE,
      activeDefence: texts.DEFENCE,
      armor: texts.ARMOR,
      hands: texts.HANDS,
      precision: texts.PRECISION,
      price: texts.PRICE,
      atlethism: texts.ATLETHISM,
      sense: texts.SENSE,
      acept: translate.instant('SHARED.OK')
    }
  }});

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

export const getPowersData =  (character: Character, powersData: PowersData, translate: TranslateService): any[] => character.getPowers().map(
  power => {
    const texts = translate.instant('DETAIL_PAGE.POWERS_SEC');
    const pray = getPower(powersData, power.getName());
    return {
      name: pray.NAME,
      af: pray.AFFECT,
      am: pray.AM,
      ae: pray.AE ? pray.AE : '',
      cost: pray.COST,
      afinity: pray.AFINITY,
      duration: pray.DURATION,
      desc: pray.DESCRIPTION,
      rules: pray.RULES,
      conditions: pray.CONDITIONS ? pray.CONDITIONS : '',
      texts: {
        cost: texts.COST,
        desc: texts.DESC,
        af: texts.AF,
        am: texts.AM,
        ae: texts.AE,
        afinity: texts.AFINITY,
        duration: texts.DURATION,
        rules: texts.RULES,
        cond: texts.CONDITIONS,
        acept: translate.instant('SHARED.OK'),
        XP: translate.instant('SHARED.XP')
      }
    };
});

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
