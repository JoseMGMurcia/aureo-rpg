import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil} from 'rxjs';
import { TableDataConfiguration } from 'src/app/components/table/table.component';
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
  getListConfiguration,
  getPowersDataConfiguration,
  getSkillsDataConfiguration,
  getXPDataConfiguration
} from './detail.page.configuration.helper';
import { getAfinitiesData,
  getAtacksData,
  getAtributesData,
  getCalculatedSkillData,
  getCombatEquipData,
  getCombatRankslData,
  getCommonGiftsData,
  getCompanionsData,
  getCursesData,
  getDefenceData,
  getDivineGiftsData,
  getFollowersData,
  getListData,
  getPowersData,
  getPrymarySkillsData,
  getSecondarySkillsData,
  getSocialFeaturesData,
  getXPData
} from './detail.page.data.helper';
import { ModalController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { CARD_ID, DATABASE_NAME } from 'src/app/constants/constants';
import { MAGIC_NUMBERS } from 'src/app/constants/number.constants';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit, OnDestroy{
  public section = '1';
  public character: Character = new Character('pepe');
  public characters: Character[] = [];
  public id = CARD_ID;

  public afinitiesDataConfiguration: TableDataConfiguration = getAfinitiesDataConfiguration(this.translate);
  public afinitiesData: any[] =[];
  public atributesDataConfiguration: TableDataConfiguration = getAtributesDataConfiguration(this.translate);
  public atributesData: any[] =[];
  public giftsDataConfiguration: TableDataConfiguration = getGiftsDataConfiguration(this.translate);
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
  public powersDataConfiguration: TableDataConfiguration = getPowersDataConfiguration(this.translate);
  public powersData: any[] =[];
  public listDataConfiguration: TableDataConfiguration = getListConfiguration();
  public otherEquipData: any[] =[];
  public otherNotesData: any[] =[];
  public titlesData: any[] =[];
  public gloryData: any[] =[];
  public infamyData: any[] =[];
  public combatEquipDataConfiguration: TableDataConfiguration = getCombatEquipDataConfiguration(this.translate);
  public combatEquipData: any[] =[];
  public followersDataConfiguration: TableDataConfiguration = getFollowersDataConfiguration(this.translate);
  public followersData: any[] =[];
  public companionsDataConfiguration: TableDataConfiguration = getCompanionsDataConfiguration(this.translate);
  public companionsData: any[] =[];
  public xpDataConfiguration: TableDataConfiguration = getXPDataConfiguration(this.translate);
  public xpData: any[] =[];
  public attackDataConfiguration: TableDataConfiguration = getAtackDataConfiguration(this.translate);
  public attackData: any[] =[];
  public defenceDataConfiguration: TableDataConfiguration = getDefenceDataConfiguration(this.translate);
  public defenceData: any[] =[];
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private translate: TranslateService,
    private characterService: CharactersService,
    private router: Router,
    private modalCtrl: ModalController,
    private storage: StorageService
  ) {}

  ngOnInit(): void {
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state) {
        this.character = state['character'];
        this.fetch();
    }

    this.characterService.character
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((character)=> {
        if(character.getId() !== this.character.getId()){
          this.switchCaracter(character);
          this.fetch();
        }
      });

      this.characterService.characters
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((characters)=> {
        this.characters = characters;
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  sectionChanged(event: any) {
    this.section = event.detail.value;
  }

  public edit(card: string = ''){
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
    return this.character.getPolis() ? this.translate.instant('SHARED.FROM').concat(' ', this.character.getPolis()) : '';
  }

  private fetch() {
    this.afinitiesData = getAfinitiesData(this.character);
    this.atributesData = getAtributesData(this.character, this.translate);
    this.commonGiftsData = getCommonGiftsData(this.character);
    this.divineGiftsData = getDivineGiftsData(this.character);
    this.cursesData = getCursesData(this.character);
    this.powersData = getPowersData(this.character);
    this.primarySkillsData = getPrymarySkillsData(this.character);
    this.secondarySkillsData = getSecondarySkillsData(this.character);
    this.socialFeaturesData = getSocialFeaturesData(this.character);
    this.otherEquipData = getListData(this.character.getOtherEquip());
    this.titlesData = getListData(this.character.getTitles());
    this.gloryData = getListData(this.character.getGloryLines());
    this.infamyData = getListData(this.character.getInfamyLines());
    this.otherNotesData = getListData(this.character.getOtherNotes());
    this.combatEquipData = getCombatEquipData(this.character);
    this.followersData = getFollowersData(this.character, this.translate);
    this.companionsData = getCompanionsData(this.character);
    this.xpData = getXPData(this.character);
    this.calculatedSkillData = getCalculatedSkillData(this.character, this.translate);
    this.combatRanksData = getCombatRankslData(this.character, this.translate);
    this.attackData = getAtacksData(this.character, this.translate);
    this.defenceData = getDefenceData(this.character, this.translate);
  }

  private switchCaracter(character: Character){
    this.character = character;
    this.section = '1';
  }

  private saveCharacter(){
    const index = this.characters.findIndex( pj => pj.getId() === this.character.getId());
    if (index > -1){
      this.characters[index] = this.character;
    }
    this.storage.set(DATABASE_NAME, JSON.stringify(this.characters));
    this.modalCtrl.dismiss();
  }
}
