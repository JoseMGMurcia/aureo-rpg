import { Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import { FormControl } from '@angular/forms';
import { AlertInput, AlertOptions, LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';
import { cloneCombatEquip, combatEquipFactory, getCombatEquipArray, openEquipDetail } from 'src/app/controller/combat.equip.controller';
import { noSpecialCharactersValidator } from 'src/app/controller/custom.validator';
import { Character } from 'src/app/model/character';
import { CombatEquip } from 'src/app/model/combatEquip';
import { getCombatEquipDataConfiguration } from 'src/app/pages/detail/detail.page.configuration.helper';
import { getCombatEquipData } from 'src/app/pages/detail/detail.page.data.helper';
import { CharactersService } from 'src/app/services/characters.service';
import { easyConfirmAlert, openAlert } from 'src/app/utils/alert.utils';
import { TableDataConfiguration } from '../../table/table.component';

@Component({
  selector: 'app-edit-combat',
  templateUrl: './edit-combat.component.html',
  styleUrls: ['./edit-combat.component.scss'],
})
export class EditCombatComponent implements OnInit, OnDestroy{

  @Output() saveCharacter: EventEmitter<any> = new EventEmitter<any>();
  @Output() exitModal: EventEmitter<any> = new EventEmitter<any>();

  public tabledata: any[] =[];
  public tableConfiguration: TableDataConfiguration = getCombatEquipDataConfiguration(this.translate, this.showCombatEquipDetail);
  public initialEquip: CombatEquip[] = [];
  public equip: CombatEquip[] = [];
  public character: Character = new Character('Pepe');
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private translate: TranslateService,
    private charactersService: CharactersService,
  ) { }

  async ngOnInit() {


    this.charactersService.character
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((character)=> {
      this.character = character;
      this.fetch();
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public handleSave(){
    this.saveCharacter.emit();
  }

  public handleExit(){
    easyConfirmAlert(
      this.translate.instant('EDIT.MAIN_INFO.CHANGES_LOST'),
      () => {
        this.saveEquip(this.initialEquip);
        this.fetch();
        this.exitModal.emit();
      },
      this.translate);
  }

  public addItem(){
     // Add gift 1ST step: Choose type
     const inputs: AlertInput[] = getCombatEquipArray().map((equip: CombatEquip) => (
      {type: 'radio', label: equip.getName(), value: equip.getName() }
    ));
    const alertParams: AlertOptions = {
      header: this.translate.instant('EDIT.ADD'),
      inputs : inputs,
      buttons: [
        { text:  this.translate.instant('SHARED.CANCEL'), cssClass: 'alert-secondaryButton' },
        {
          text:  this.translate.instant('SHARED.OK'),
          cssClass: 'alert-primaryButton',
          handler:  (equipType: string) => {
            this.addStep2(equipType);
        }}]};
        openAlert(alertParams);
  }

  public addStep2(equipType: string){
    const alertParams: AlertOptions = {
      header: this.translate.instant('EDIT.ADD'),
      inputs : [{
        type: 'text',
        placeholder: this.translate.instant('SHARED.DESC'),
        name: 'equipName'
      }],
      buttons: [
        { text:  this.translate.instant('SHARED.CANCEL'), cssClass: 'alert-secondaryButton' },
        {
          text:  this.translate.instant('EDIT.ADD'),
          cssClass: 'alert-primaryButton',
          handler:  (data: {equipName: string}) => {
            const control = new FormControl();
            control.setValue(data.equipName);
            const invalid = noSpecialCharactersValidator(control)?.specialCharacters;
            if(!invalid){
              const catalog = getCombatEquipArray();
              const combatEquipGenericType = catalog.find((equip: CombatEquip) => equip.getName() === equipType);
              if(combatEquipGenericType){
                const combatEquip = combatEquipFactory(combatEquipGenericType, data.equipName);
                this.character.getCombatEquipment().push(combatEquip);
                this.equip = this.character.getCombatEquipment();
                this.tabledata = getCombatEquipData( this.character, this.translate);
              }
            }else {
              const alertParams: AlertOptions = {
                header: this.translate.instant('EDIT.INVALID_NAME'),
                buttons: [this.translate.instant('SHARED.OK')]
              }
              openAlert(alertParams);
            }
    }}]};
    openAlert(alertParams);
  }

  public removeItem(){
    const alertParams: AlertOptions = {
      header: this.translate.instant('EDIT.REMOVE_COMBAT_EQUIP_TITLE'),
      inputs : this.equip.map((item): AlertInput => ({
        type: 'radio',
        label: item.getName(),
        value: item.getName()
      })),
      buttons: [
        { text:  this.translate.instant('SHARED.CANCEL'), cssClass: 'alert-secondaryButton' },
        {
          text:  this.translate.instant('SHARED.DELETE'),
          cssClass: 'alert-primaryButton',
          handler:  (data: any) => {
            this.equip = this.equip.filter(equi => equi.getName() !== data);
            this.saveEquip( this.equip);
            this.tabledata = getCombatEquipData( this.character, this.translate);

    }}]};
    openAlert(alertParams);
  }

  private saveEquip(equip : CombatEquip[]){
    this.character.setCombatEquipment(equip);
  }

  private fetch(){
      this.equip = this.character.getCombatEquipment();
      this.tabledata = getCombatEquipData(this.character, this.translate);
      this.initialEquip= cloneCombatEquip(this.equip);
  }

  private showCombatEquipDetail(row: any){
    openEquipDetail(row);
  }
}
