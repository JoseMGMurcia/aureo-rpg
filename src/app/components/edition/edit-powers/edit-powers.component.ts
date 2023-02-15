import { Component, EventEmitter, Input, Output} from '@angular/core';
import { AlertInput, AlertOptions, LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';
import { MAGIC_NUMBERS } from 'src/app/constants/number.constants';
import { clonePowers, getCultsPowers, getPower, openPowerDetail } from 'src/app/controller/power.controller';
import { Character } from 'src/app/model/character';
import { Power } from 'src/app/model/power';
import { CultPowers, PowerData, PowersData } from 'src/app/model/powerData';
import { getPowersDataConfiguration } from 'src/app/pages/detail/detail.page.configuration.helper';
import { getPowersData } from 'src/app/pages/detail/detail.page.data.helper';
import { CharactersService } from 'src/app/services/characters.service';
import { easyConfirmAlert, openAlert } from 'src/app/utils/alert.utils';
import { TableDataConfiguration } from '../../table/table.component';

@Component({
  selector: 'app-edit-powers',
  templateUrl: './edit-powers.component.html',
  styleUrls: ['./edit-powers.component.scss'],
})
export class EditPowersComponent{

  @Output() saveCharacter: EventEmitter<any> = new EventEmitter<any>();
  @Output() exitModal: EventEmitter<any> = new EventEmitter<any>();

  public tabledata: any[] =[];
  public tableConfiguration: TableDataConfiguration = getPowersDataConfiguration(this.translate, this.showCombatEquipDetail);
  public character: Character = new Character('Pepe');
  public powersData: PowersData = new PowersData();
  public powers: Power[] = [];
  public initialPowers: Power[] = [];
  public loading = MAGIC_NUMBERS.N_2;

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

    this.charactersService.powersData
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data)=> {
      this.powersData = data;
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
      inputs : this.powers.map((power): AlertInput =>{
        const powerJ = getPower(this.powersData, power.getName());
        return {
        type: 'radio',
        label: powerJ.NAME,
        value: powerJ.ID
      }}),
      buttons: [
        { text:  this.translate.instant('SHARED.CANCEL'), cssClass: 'alert-secondaryButton' },
        {
          text:  this.translate.instant('SHARED.DELETE'),
          cssClass: 'alert-primaryButton',
          handler:  (data: any) => {
            this.powers = this.powers.filter(pow => pow.getName() !== data);
            this.character.setPowers(this.powers);
            this.tabledata = getPowersData(this.character, this.powersData, this.translate);
    }}]};
    openAlert(alertParams);
  }

  public addItem(){
    // Add Power 1ST step: Choose cult
    const inputs: AlertInput[] = getCultsPowers(this.powersData, this.translate).cults.map((cult: CultPowers) => (
     {type: 'radio', label: cult.cultName, value: cult.cultName }
    ));
   const alertParams: AlertOptions = {
     header: this.translate.instant('EDIT.ADD'),
     inputs : inputs,
     buttons: [
       { text:  this.translate.instant('SHARED.CANCEL'), cssClass: 'alert-secondaryButton' },
       {
         text:  this.translate.instant('SHARED.OK'),
         cssClass: 'alert-primaryButton',
         handler:  (cultName: string) => {
           this.addStep2(cultName);
       }}]};
       openAlert(alertParams);
 }

 public addStep2(cultName: string){
  // Add Power 2ND step: Choose power
  const cult = getCultsPowers(this.powersData, this.translate).cults.find(cult => cult.cultName === cultName);
  const inputs: AlertInput[] = cult?.powers.map((power: PowerData) => (
    {type: 'radio', label: power.NAME, value: power.ID }
    )) || [];
  const alertParams: AlertOptions = {
    header: this.translate.instant('EDIT.ADD'),
    inputs : inputs,
    buttons: [
      { text:  this.translate.instant('SHARED.CANCEL'), cssClass: 'alert-secondaryButton' },
      {
        text:  this.translate.instant('SHARED.OK'),
        cssClass: 'alert-primaryButton',
        handler:  (powerId: string) => {
        this.character.getPowers().push(new Power(powerId));
        this.powers = this.character.getPowers();
        this.tabledata = getPowersData(this.character, this.powersData, this.translate);
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
        this.character.setPowers(this.initialPowers);
        this.fetch();
        this.exitModal.emit();
      },
      this.translate);
  }

  private fetch(){
    this.powers = this.character.getPowers();
    this.tabledata = getPowersData(this.character, this.powersData, this.translate);
    this.initialPowers= clonePowers(this.powers);
}

  private finishLoading(loading: HTMLIonLoadingElement) {
    if(--this.loading === MAGIC_NUMBERS.N_0){
      this.fetch();
      loading.dismiss();
    }
  }

  private showCombatEquipDetail(row: any){
    openPowerDetail(row);
  }
}
