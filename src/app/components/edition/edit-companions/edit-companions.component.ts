import { Component, EventEmitter, Input, Output} from '@angular/core';
import { AlertInput, AlertOptions, LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';
import { MAGIC_NUMBERS } from 'src/app/constants/number.constants';
import { CharacterController } from 'src/app/controller/characterController';
import { cloneCompanions } from 'src/app/controller/follower-companion.controller';
import { clonePowers, getCultsPowers, getPower, openPowerDetail } from 'src/app/controller/power.controller';
import { Character } from 'src/app/model/character';
import { Companion } from 'src/app/model/companion';
import { Power } from 'src/app/model/power';
import { CultPowers, PowerData, PowersData } from 'src/app/model/powerData';
import { getCompanionsDataConfiguration, getPowersDataConfiguration } from 'src/app/pages/detail/detail.page.configuration.helper';
import { getCompanionsData, getPowersData } from 'src/app/pages/detail/detail.page.data.helper';
import { CharactersService } from 'src/app/services/characters.service';
import { easyConfirmAlert, openAlert } from 'src/app/utils/alert.utils';
import { TableDataConfiguration } from '../../table/table.component';

@Component({
  selector: 'app-edit-companions',
  templateUrl: './edit-companions.component.html',
  styleUrls: ['./edit-companions.component.scss'],
})
export class EditCompanionsComponent{

  @Output() saveCharacter: EventEmitter<any> = new EventEmitter<any>();
  @Output() exitModal: EventEmitter<any> = new EventEmitter<any>();

  public tabledata: any[] =[];
  public tableConfiguration: TableDataConfiguration = getCompanionsDataConfiguration(this.translate);
  public character: Character = new Character('Pepe');
  public companions: Companion[] = [];
  public initialCompanions: Companion[] = [];
  public loading = MAGIC_NUMBERS.N_1;

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private translate: TranslateService,
    private charactersService: CharactersService,
    private loadingController: LoadingController,
  ) { }


  async ngOnInit() {
    const loading: HTMLIonLoadingElement = await this.loadingController.create({
      message: this.translate.instant('SHARED.LOADING')
    });
    await loading.present();

    this.charactersService.character
      .pipe(
        takeUntil(this.ngUnsubscribe))
      .subscribe((character)=> {
      this.character = character;
      this.finishLoading(loading);
    });

  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public removeItem(){
    const alertParams: AlertOptions = {
      header: this.translate.instant('EDIT.REMOVE_POWER'),
      inputs : this.companions.map((companion): AlertInput =>{
        return {
        type: 'radio',
        label: companion.getName(),
        value: companion.getName(),
      }}),
      buttons: [
        { text:  this.translate.instant('SHARED.CANCEL'), cssClass: 'alert-secondaryButton' },
        {
          text:  this.translate.instant('SHARED.DELETE'),
          cssClass: 'alert-primaryButton',
          handler:  (data: any) => {
            this.companions = this.companions.filter(pow => pow.getName() !== data);
            this.character.setCompanions(this.companions);
            this.tabledata = getCompanionsData(this.character);
    }}]};
    openAlert(alertParams);
  }

  public addItem(){
    const inputs: AlertInput[] = [{
      type: 'text',
      name: 'name',
      label: this.translate.instant('DETAIL_PAGE.BACKGROUND_SEC.NAME'),
      placeholder: this.translate.instant('DETAIL_PAGE.BACKGROUND_SEC.NAME'),
    },
    {
      type: 'text',
      name: 'player',
      label: this.translate.instant('DETAIL_PAGE.BACKGROUND_SEC.PLAYER'),
      placeholder: this.translate.instant('DETAIL_PAGE.BACKGROUND_SEC.PLAYER'),
    },
    {
      type: 'text',
      name: 'cult',
      label: this.translate.instant('DETAIL_PAGE.BACKGROUND_SEC.CULT'),
      placeholder: this.translate.instant('DETAIL_PAGE.BACKGROUND_SEC.CULT'),
    }
  ];
   const alertParams: AlertOptions = {
     header: this.translate.instant('EDIT.ADD'),
     inputs : inputs,
     buttons: [
       { text:  this.translate.instant('SHARED.CANCEL'), cssClass: 'alert-secondaryButton' },
       {
         text:  this.translate.instant('SHARED.OK'),
         cssClass: 'alert-primaryButton',
         handler:  (data: any) => {
          const validValues =  CharacterController.isNameValid(data.name) &&
                              CharacterController.isNameValid(data.player) &&
                              CharacterController.isNameValid(data.cult);
          if (!validValues){
          easyConfirmAlert(this.translate.instant('EDIT.INVALID_FIELDS'), ()=>{return;}, this.translate);
          }
          this.character.getCompanions().push(new Companion(data.name, data.player, data.cult));
          this.companions = this.character.getCompanions();
          this.tabledata = getCompanionsData(this.character);
       }}]};
       openAlert(alertParams);
 }

  public handleSave(){
    this.saveCharacter.emit();
  }

  public handleExit(){
    easyConfirmAlert(
      this.translate.instant('EDIT.MAIN_INFO.CHANGES_LOST'),
      () => {
        this.character.setCompanions(this.initialCompanions);
        this.fetch();
        this.exitModal.emit();
      },
      this.translate);
  }

  private fetch(){
    this.companions = this.character.getCompanions();
    this.tabledata = getCompanionsData(this.character);
    this.initialCompanions= cloneCompanions(this.companions);
}

  private finishLoading(loading: HTMLIonLoadingElement) {
    if(--this.loading === MAGIC_NUMBERS.N_0){
      this.fetch();
      loading.dismiss();
    }
  }

}
