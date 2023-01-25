import { Atributes } from './atributes';
import { CombatEquip } from './combatEquip';
import { Companion } from './companion';
import { Follower } from './follower';
import { GodAffinity } from './godAffinity';
import { Power } from './power';
import { Skill } from './skill';
import { CharacterController } from 'src/app/controller/characterController';
import { MAGIC_NUMBERS } from '../constants/number.const';
import { Gift } from './gift';

export class Character {

  private id = '';
  private name = '';

  private cult = '';
  private polis = '';
  private arquetype = '';
  private socialGroup = '';
  private sex = '';
  private age = MAGIC_NUMBERS.N_0;
  private player = '';
  private aureo: number = MAGIC_NUMBERS.N_3;
  private aureoRemaining: number = MAGIC_NUMBERS.N_0;
  private hibris: number = MAGIC_NUMBERS.N_0;

  private lifePoints = MAGIC_NUMBERS.N_0;// Not yet in detail.
  private actualLifeP = MAGIC_NUMBERS.N_0;// Not yet in detail.
  private titles: string[] = [];

  private atributes: Atributes;

  private primarySkills: Skill[] = [];
  private secondarySkills: Skill[] = [];
  private socialFeatures: Skill[] = [];
  private commonGifts: Gift[] = [];
  private divineGifts: Gift[] = [];
  private curses: Gift[] = [];
  private powers: Power[] = [];

  private godAfinities: GodAffinity[];
  private combatEquipment: CombatEquip[] = [];

  private glory = MAGIC_NUMBERS.N_0;
  private gloryLines: string[] = [];
  private infamy = MAGIC_NUMBERS.N_0;
  private infamyLines: string[] = [];

  private followers: Follower[] = [];
  private companions: Companion[] = [];

  private otherNotes: string[] = [];
  private otherEquip: string[] = [];
  private history = '';


  private savedXP = MAGIC_NUMBERS.N_0;
  private accumulatedXP = MAGIC_NUMBERS.N_0;
  private aureoXP = MAGIC_NUMBERS.N_0;

  constructor(name: string) {
      this.name = name;
      this.id = CharacterController.generateId(name);

      this.atributes = new  Atributes();

      this.godAfinities = [
          new GodAffinity('Afrodita', 0, 0, 0),
          new GodAffinity('Apolo',    0, 0, 0),
          new GodAffinity('Ares',     0, 0, 0),
          new GodAffinity('Artemisa', 0, 0, 0),
          new GodAffinity('Atenea',   0, 0, 0),
          new GodAffinity('Dioniso',  0, 0, 0),
          new GodAffinity('Hades',    0, 0, 0),
          new GodAffinity('Hefesto',  0, 0, 0),
          new GodAffinity('Hermes',   0, 0, 0),
          new GodAffinity('Hera',     0, 0, 0),
          new GodAffinity('Poseidon', 0, 0, 0),
          new GodAffinity('Zeus',     0, 0, 0)
      ];
  }
    //Getters & Setters

  public getId(): string {
      return this.id;
  }

  public setId(id: string): void {
      this.id = id;
  }

  public getName(): string {
      return this.name;
  }

  public setName(name: string): void {
      this.name = name;
  }

  public getCult(): string {
      return this.cult;
  }

  public setCult(cult: string): void {
      this.cult = cult;
  }

  public getPolis(): string {
      return this.polis;
  }

  public setPolis(polis: string): void {
      this.polis = polis;
  }

  public getArquetype(): string {
      return this.arquetype;
  }

  public setArquetype(arquetype: string): void {
      this.arquetype = arquetype;
  }

  public getSocialGroup(): string {
      return this.socialGroup;
  }

  public setSocialGroup(socialGroup: string): void {
      this.socialGroup = socialGroup;
  }

  public getSex(): string {
      return this.sex;
  }

  public setSex(sex: string): void {
      this.sex = sex;
  }

  public getAge(): number {
      return this.age;
  }

  public setAge(age: number): void {
      this.age = age;
  }

  public getPlayer(): string {
      return this.player;
  }

  public setPlayer(player: string): void {
      this.player = player;
  }

  public getAureo(): number {
      return this.aureo;
  }

  public setAureo(aureo: number): void {
      this.aureo = aureo;
  }

  public getAureoRemaining(): number {
      return this.aureoRemaining;
  }

  public setAureoRemaining(aureoRemaining: number): void {
      this.aureoRemaining = aureoRemaining;
  }

  public getHibris(): number {
      return this.hibris;
  }

  public setHibris(hibris: number): void {
      this.hibris = hibris;
  }

  public getLifePoints(): number {
      return this.lifePoints;
  }

  public setLifePoints(lifePoints: number): void {
      this.lifePoints = lifePoints;
  }

  public getActualLifeP(): number {
      return this.actualLifeP;
  }

  public setActualLifeP(actualLifeP: number): void {
      this.actualLifeP = actualLifeP;
  }

  public getTitles(): string[] {
      return this.titles;
  }

  public setTitles(titles: string[]): void {
      this.titles = titles;
  }

  public getAtributes(): Atributes {
      return this.atributes;
  }

  public setAtributes(atributes: Atributes): void {
      this.atributes = atributes;
  }

  public getPrymarySkills(): Skill[] {
      return this.primarySkills;
  }

  public setPrymarySkills(skills: Skill[]): void {
      this.primarySkills = skills;
  }

  public getSecondarySkills(): Skill[] {
    return this.secondarySkills;
  }

  public setSecondarySkills(skills: Skill[]): void {
    this.secondarySkills = skills;
  }

  public getSocialFeatures(): Skill[] {
      return this.socialFeatures;
  }

  public setSocialFeatures(socialFeatures: Skill[]): void {
      this.socialFeatures = socialFeatures;
  }

  public getCommonGifts(): Gift[] {
      return this.commonGifts;
  }

  public setCommonGifts(commonGifts: Gift[]): void {
      this.commonGifts = commonGifts;
  }

  public getDivineGifts(): Gift[] {
      return this.divineGifts;
  }

  public setDivineGifts(divineGifts: Gift[]): void {
      this.divineGifts = divineGifts;
  }

  public getCurses(): Gift[] {
      return this.curses;
  }

  public setCurses(curses: Gift[]): void {
      this.curses = curses;
  }

  public getPowers(): Power[] {
      return this.powers;
  }

  public setPowers(powers: Power[]): void {
      this.powers = powers;
  }

  public getGodAfinities(): GodAffinity[] {
      return this.godAfinities;
  }

  public setGodAfinities(godAfinities: GodAffinity[]): void {
      this.godAfinities = godAfinities;
  }

  public getCombatEquipment(): CombatEquip[] {
      return this.combatEquipment;
  }

  public setCombatEquipment(combatEquipment: CombatEquip[]): void {
      this.combatEquipment = combatEquipment;
  }

  public getGlory(): number {
      return this.glory;
  }

  public setGlory(glory: number): void {
      this.glory = glory;
  }

  public getGloryLines(): string[] {
      return this.gloryLines;
  }

  public setGloryLines(gloryLines: string[]): void {
      this.gloryLines = gloryLines;
  }

  public getInfamy(): number {
      return this.infamy;
  }

  public setInfamy(infamy: number): void {
      this.infamy = infamy;
  }

  public getInfamyLines(): string[] {
      return this.infamyLines;
  }

  public setInfamyLines(infamyLines: string[]): void {
      this.infamyLines = infamyLines;
  }

  public getFollowers(): Follower[] {
      return this.followers;
  }

  public setFollowers(followers: Follower[]): void {
      this.followers = followers;
  }

  public getCompanions(): Companion[] {
      return this.companions;
  }

  public setCompanions(companions: Companion[]): void {
      this.companions = companions;
  }

  public getOtherNotes(): string[] {
      return this.otherNotes;
  }

  public setOtherNotes(otherNotes: string[]): void {
      this.otherNotes = otherNotes;
  }

  public getOtherEquip(): string[] {
      return this.otherEquip;
  }

  public setOtherEquip(otherEquip: string[]): void {
      this.otherEquip = otherEquip;
  }

  public getSavedXP(): number {
      return this.savedXP;
  }

  public setSavedXP(savedXP: number): void {
      this.savedXP = savedXP;
  }

  public getAccumulatedXP(): number {
      return this.accumulatedXP;
  }

  public setAccumulatedXP(accumulatedXP: number): void {
      this.accumulatedXP = accumulatedXP;
  }

  public getAureoXP(): number {
      return this.aureoXP;
  }

  public setAureoXP(aureoXP: number): void {
      this.aureoXP = aureoXP;
  }

  public getHistory(): string {
    return this.history;
  }

  public setHistory(history: string): void {
      this.history = history;
  }
}
