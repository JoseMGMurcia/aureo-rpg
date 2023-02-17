import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil} from 'rxjs';
import { getListConfiguration, TableDataConfiguration } from 'src/app/components/table/table.component';
import { edit } from 'src/app/utils/editor.utils';
import { Character } from 'src/app/model/character';
import { CharactersService } from 'src/app/services/characters.service';
import { getAfinitiesDataConfiguration,
  getAtackDataConfiguration,
  getAtributesDataConfiguration,
  getCalculatedSkillDataConfiguration,
  getCombatEquipDataConfiguration,
  getCompanionsDataConfiguration,
  getDefenceDataConfiguration,
  getFollowersDataConfiguration,
  getGiftsDataConfiguration,
  getPowersDataConfiguration,
  getSkillsDataConfiguration,
} from './detail.page.configuration.helper';
import { getAfinitiesData,
  getAtacksData,
  getAtributesData,
  getCalculatedSkillData,
  getCombatEquipData,
  getCombatRankslData,
  getCompanionsData,
  getDefenceData,
  getFollowersData,
  getGiftData,
  getListData,
  getPowersData,
  getPrymarySkillsData,
  getSecondarySkillsData,
  getSocialFeaturesData,
} from './detail.page.data.helper';
import { LoadingController, ModalController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { CARD_ID, DATABASE_NAME } from 'src/app/constants/constants';
import { MAGIC_NUMBERS } from 'src/app/constants/number.constants';
import { getSexIcon } from 'src/app/utils/custom.utils';
import { GiftData } from 'src/app/model/giftData';
import { openGiftDetail } from 'src/app/controller/gift.controller';
import { IconTypes } from 'src/app/constants/icon.constants';
import { openEquipDetail } from 'src/app/controller/combat.equip.controller';
import { PowersData } from 'src/app/model/powerData';
import { openPowerDetail } from 'src/app/controller/power.controller';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit, OnDestroy{
  public section = '1';
  public character: Character = new Character('Pepe');
  public characters: Character[] = [];
  public giftData: GiftData = new GiftData();
  public powersJData: PowersData = new PowersData();
  public id = CARD_ID;
  public loading = MAGIC_NUMBERS.N_4;

  public afinitiesDataConfiguration: TableDataConfiguration = getAfinitiesDataConfiguration(this.translate);
  public afinitiesData: any[] =[];
  public atributesDataConfiguration: TableDataConfiguration = getAtributesDataConfiguration(this.translate);
  public atributesData: any[] =[];
  public giftsDataConfiguration: TableDataConfiguration = getGiftsDataConfiguration(this.translate, this.showGiftDetail);
  public commonGiftsData: any[] =[];
  public divineGiftsData: any[] =[];
  public cursesData: any[] =[];
  public skillsDataConfiguration: TableDataConfiguration = getSkillsDataConfiguration(this.translate);
  public primarySkillsData: any[] =[];
  public secondarySkillsData: any[] =[];
  public socialFeaturesData: any[] =[];
  public calculatedSkillDataConfiguration: TableDataConfiguration = getCalculatedSkillDataConfiguration();
  public calculatedSkillData: any[] =[];
  public combatRanksData: any[] =[];
  public powersDataConfiguration: TableDataConfiguration = getPowersDataConfiguration(this.translate, this.openPowerDetail);
  public powersData: any[] =[];
  public listDataConfiguration: TableDataConfiguration = getListConfiguration();
  public otherEquipData: any[] =[];
  public otherNotesData: any[] =[];
  public titlesData: any[] =[];
  public gloryData: any[] =[];
  public infamyData: any[] =[];
  public combatEquipDataConfiguration: TableDataConfiguration = getCombatEquipDataConfiguration(this.translate, this.showCombatEquipDetail);
  public combatEquipData: any[] =[];
  public followersDataConfiguration: TableDataConfiguration = getFollowersDataConfiguration(this.translate);
  public followersData: any[] =[];
  public companionsDataConfiguration: TableDataConfiguration = getCompanionsDataConfiguration(this.translate);
  public companionsData: any[] =[];
  public attackDataConfiguration: TableDataConfiguration = getAtackDataConfiguration(this.translate);
  public attackData: any[] =[];
  public defenceDataConfiguration: TableDataConfiguration = getDefenceDataConfiguration(this.translate);
  public defenceData: any[] =[];
  public swNotEditingHistory = true;
  public historyIcon = IconTypes.EDIT;
  public history = '';
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private translate: TranslateService,
    private characterService: CharactersService,
    private loadingController: LoadingController,
    private modalCtrl: ModalController,
    private storage: StorageService
  ) {}

  async ngOnInit() {
    const loading: HTMLIonLoadingElement = await this.loadingController.create({
      message: this.translate.instant('SHARED.LOADING'),
      duration: MAGIC_NUMBERS.N_3000
    });
    await loading.present();

    this.characterService.character
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((character)=> {
        if(character.getId() !== this.character.getId()){
          this.switchCaracter(character);
        }
        this.finishLoading(loading);
      });

      this.characterService.characters
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((characters)=> {
        this.characters = characters;
        this.finishLoading(loading);
      });

      this.characterService.giftData
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data)=> {
        this.giftData = data;
        this.finishLoading(loading);
      });

      this.characterService.powersData
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data)=> {
        this.powersJData = data;
        this.finishLoading(loading);
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  sectionChanged(event: any) {
    if(event.detail.value === '5'){
      this.swNotEditingHistory = true;
      this.historyIcon = IconTypes.EDIT;
      this.history = this.character.getHistory();
    }
    this.section = event.detail.value;
  }

  public getSexIcons(){
    return getSexIcon(this.character.getSex());
  }

  public edit(card = ''){
    if(card){
    edit(card, this.character, this.modalCtrl);
    }
  }

  public addTemporalAureo(){
    const target = this.character.getAureoRemaining() + MAGIC_NUMBERS.N_1;
    const aureo = this.character.getAureo();
    this.character.setAureoRemaining(target > aureo ? aureo : target);
    this.saveCharacter();
  }

  public removeTemporalAureo(){
    const target = this.character.getAureoRemaining() - MAGIC_NUMBERS.N_1;
    this.character.setAureoRemaining(target < MAGIC_NUMBERS.N_0 ? MAGIC_NUMBERS.N_0 : target);
    this.saveCharacter();
 }

  public getPolisText(): string {
    return this.character.getPolis() ? `${this.translate.instant('SHARED.FROM')} ${this.character.getPolis()}` : '';
  }

  public addSavedXp(){
    this.character.setSavedXP(this.character.getSavedXP() + MAGIC_NUMBERS.N_1);
    this.saveCharacter();
  }

  public removeSavedXp(){
    const target = this.character.getSavedXP() - MAGIC_NUMBERS.N_1;
    this.character.setSavedXP(target < MAGIC_NUMBERS.N_0 ? MAGIC_NUMBERS.N_0 : target);
    this.saveCharacter();
  }

  public addAccumulatedXp(){
    this.character.setAccumulatedXP(this.character.getAccumulatedXP() + MAGIC_NUMBERS.N_1);
    this.saveCharacter();
  }

  public removeAccumulatedXp(){
    const target = this.character.getAccumulatedXP() - MAGIC_NUMBERS.N_1;
    this.character.setAccumulatedXP(target < MAGIC_NUMBERS.N_0 ? MAGIC_NUMBERS.N_0 : target);
    this.saveCharacter();
  }

  public addAureoXp(){
    this.character.setAureoXP(this.character.getAureoXP() + MAGIC_NUMBERS.N_1);
    this.saveCharacter();
  }

  public removeAureoXp(){
    const target = this.character.getAureoXP() - MAGIC_NUMBERS.N_1;
    this.character.setAureoXP(target < MAGIC_NUMBERS.N_0 ? MAGIC_NUMBERS.N_0 : target);
    this.saveCharacter();
  }

  public editHistory(){
    if(!this.swNotEditingHistory){
      this.character.setHistory(this.history);
      this.saveCharacter();
    }
    this.swNotEditingHistory = !this.swNotEditingHistory;
    this.historyIcon = this.swNotEditingHistory ? IconTypes.EDIT : IconTypes.SAVE;
  }

  public getHistoryClass(){
    return this.swNotEditingHistory ? 'history' : 'history-editing';
  }

  private fetch() {
    this.afinitiesData = getAfinitiesData(this.character);
    this.atributesData = getAtributesData(this.character, this.translate);
    this.commonGiftsData = getGiftData( this.character.getCommonGifts(),
      [...this.giftData.COMMON_GIFTS.SOCIAL, ...this.giftData.COMMON_GIFTS.PHYSICAL, ...this.giftData.COMMON_GIFTS.MENTAL, ...this.giftData.COMMON_GIFTS.SUPERNATURALS], this.translate);
    this.divineGiftsData = getGiftData( this.character.getDivineGifts(), this.giftData.DIVINE_GIFTS, this.translate);
    this.cursesData = getGiftData( this.character.getCurses(),
      [...this.giftData.CURSES.SOCIAL, ...this.giftData.CURSES.PHYSICAL, ...this.giftData.CURSES.MENTAL, ...this.giftData.CURSES.SUPERNATURALS], this.translate);
    this.powersData = getPowersData(this.character, this.powersJData, this.translate);
    this.primarySkillsData = getPrymarySkillsData(this.character);
    this.secondarySkillsData = getSecondarySkillsData(this.character);
    this.socialFeaturesData = getSocialFeaturesData(this.character);
    this.otherEquipData = getListData(this.character.getOtherEquip());
    this.titlesData = getListData(this.character.getTitles());
    this.gloryData = getListData(this.character.getGloryLines());
    this.infamyData = getListData(this.character.getInfamyLines());
    this.otherNotesData = getListData(this.character.getOtherNotes());
    this.combatEquipData = getCombatEquipData(this.character, this.translate);
    this.followersData = getFollowersData(this.character, this.translate);
    this.companionsData = getCompanionsData(this.character);
    this.calculatedSkillData = getCalculatedSkillData(this.character, this.translate);
    this.combatRanksData = getCombatRankslData(this.character, this.translate);
    this.attackData = getAtacksData(this.character, this.translate);
    this.defenceData = getDefenceData(this.character, this.translate);
    this.history = this.character.getHistory();
  }

  private finishLoading(loading: HTMLIonLoadingElement) {
    this.fetch();
    if(--this.loading === MAGIC_NUMBERS.N_0 ){
      loading.dismiss();
    }
  }

  private switchCaracter(character: Character){
    this.character = character;
    this.section = '1';
  }

  private saveCharacter(){
    const index = this.characters.findIndex( pj => pj.getId() === this.character.getId());
    if (index > -MAGIC_NUMBERS.N_1){
      this.characters[index] = this.character;
    }
    this.storage.set(DATABASE_NAME, JSON.stringify(this.characters));
  }

  private showGiftDetail(row: any){
    openGiftDetail(row);
  }

  private showCombatEquipDetail(row: any){
    openEquipDetail(row);
  }

  private openPowerDetail(row: any){
    openPowerDetail(row);
  }

}
