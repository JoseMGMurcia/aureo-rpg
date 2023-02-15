import { type } from "os";

/* eslint-disable @typescript-eslint/naming-convention */
export const AVALIABLE_LANGUAJES = ['en', 'es'];
export const DATABASE_NAME = 'AureoDatabase.db';
export const APP_NAME = 'Áureo RPG';
export const URL_AUREO = 'http://aureorpg.com';
export const SECTION = 'SECTION';
export const CHARACTER_ID = 'CHARACTER_ID';
export const CARD_ID = {
  MAIN_INFO: 'MAIN_INFO',
  ATRIBUTES: 'ATRIBUTES',
  TITLES: 'TITLES',
  GLORY: 'GLORY',
  INFAMY: 'INFAMY',
  AFINITIES: 'AFINITIES',
  XP: 'XP',
  COMBAT_EQUIPMENT: 'COMBAT_EQUIPMENT',
  POWERS: 'POWERS',
  COMMON_GIFTS: 'COMMON_GIFTS',
  DIVINE_GIFTS: 'DIVINE_GIFTS',
  CURSES: 'CURSES',
  PRIMARY_SKILLS: 'PRIMARY_SKILLS',
  SECONDARY_SKILLS: 'SECONDARY_SKILLS',
  SOCIAL_FEATS: 'SOCIAL_FEATS',
  OTHER_EQIUP: 'OTHER_EQIUP',
  FOLLOWERS: 'FOLLOWERS',
  COMPANIONS: 'COMPANIONS',
  OTHERS_NOTES: 'OTHERS_NOTES',
  HISTORY: 'HISTORY'
};

export const MAIN_INFO_FIELDS = {
  NAME: 'NAME',
  PLAYER: 'PLAYER',
  POLIS: 'POLIS',
  CULT: 'CULT',
  ARQUETYPE: 'ARQUETYPE',
  SOCIAL_GROUP: 'SOCIAL_GROUP',
  AGE: 'AGE'
};

export const ATRIBUTE_FIELDS = {
  AGILITY: 'AGILITY',
  APPEAR: 'APPEAR',
  COMMUN: 'COMMUN',
  MIND: 'MIND',
  REFLEX: 'REFLEX',
  RESIST: 'RESIST',
  SENSE: 'SENSE',
  SOUL: 'SOUL',
  STRENGTH: 'STRENGTH'
};

export const SKILL_TYPES = {
  PRIMARY: 'PRIMARY',
  SECONDARY: 'SECONDARY',
  SOCIAL: 'SOCIAL'
}

export const LIST_TYPES = {
  TITLES: 'TITLES',
  GLORY: 'GLORY',
  INFAMY: 'INFAMY',
  EQUIP: 'EQUIP',
  OTHERS_NOTES: 'OTHERS_NOTES'
}

export const FILES = {
  GIFTS: '../assets/i18n/gifts.es.json',
  POWERS: '../assets/i18n/powers.es.json'
}

export enum GiftTypesEnum  {
  COMMON_GIFTS =  'COMMON_GIFTS',
  CURSES =  'CURSES',
  DIVINE_GIFTS = 'DIVINE_GIFTS'
}

export type GiftType = GiftTypesEnum.COMMON_GIFTS | GiftTypesEnum.CURSES | GiftTypesEnum.DIVINE_GIFTS;

export enum GiftSubTypesEnum {
  PHYSICAL =  "PHYSICAL",
  MENTAL = "MENTAL",
  SUPERNATURAL = "SUPERNATURAL",
  SOCIAL = "SOCIAL"
}

export type GiftSubType = GiftSubTypesEnum.PHYSICAL | GiftSubTypesEnum.MENTAL | GiftSubTypesEnum.SUPERNATURAL | GiftSubTypesEnum.SOCIAL;
