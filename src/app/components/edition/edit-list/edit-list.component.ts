import { Component, EventEmitter, Input, OnInit, OnDestroy, Output} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Character } from 'src/app/model/character';
import { getListConfiguration, TableDataConfiguration } from '../../table/table.component';
import { easyConfirmAlert, openAlert } from 'src/app/utils/alert.utils';
import { CharactersService } from 'src/app/services/characters.service';
import { cloneList } from 'src/app/utils/custom.utils';
import { LIST_TYPES } from 'src/app/constants/constants';
import { AlertInput, AlertOptions } from '@ionic/angular';
import { FormControl } from '@angular/forms';
import { noSpecialCharactersValidator } from 'src/app/controller/custom.validator';
import { MAGIC_NUMBERS } from 'src/app/constants/number.constants';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.scss'],
})
export class EditListComponent implements OnInit, OnDestroy{

  @Input() listType = '';
  @Input() title = '';
  @Output() saveCharacter: EventEmitter<any> = new EventEmitter<any>();
  @Output() exitModal: EventEmitter<any> = new EventEmitter<any>();

  public tabledata: any[] = []
  public list: string[] = [];
  public character: Character = new Character('Pepe');
  public tableConfiguration: TableDataConfiguration = getListConfiguration();
  public types = LIST_TYPES;
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  private initialList: string[] = [];
  private enterRenow = 0;

  constructor(
    private translate: TranslateService,
    private charactersService: CharactersService
  ) {}

  ngOnInit(): void {
    this.charactersService.character
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((character)=> {
      this.character = character;
      this.enterRenow = this.listType === LIST_TYPES.GLORY ? this.character.getGlory() : 0;
      this.enterRenow = this.listType === LIST_TYPES.INFAMY ? this.character.getInfamy() : this.enterRenow;
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

  public removeGlory() {
    const target: number = this.character.getGlory() - MAGIC_NUMBERS.N_1;
    this.character.setGlory(target <= -MAGIC_NUMBERS.N_1 ? this.character.getGlory() : target)
  }

  public addGlory() {
    const target: number = this.character.getGlory() + MAGIC_NUMBERS.N_1;
    this.character.setGlory(target > MAGIC_NUMBERS.N_10 ? this.character.getGlory() : target)
  }

  public removeInfamy() {
    const target: number = this.character.getInfamy() - MAGIC_NUMBERS.N_1;
    this.character.setInfamy(target <= -MAGIC_NUMBERS.N_1 ? this.character.getInfamy() : target)
  }

  public addInfamy() {
    const target: number = this.character.getInfamy() + MAGIC_NUMBERS.N_1;
    this.character.setInfamy(target > MAGIC_NUMBERS.N_10 ? this.character.getInfamy() : target)
  }

  public handleExit(){
    easyConfirmAlert(
      this.translate.instant('EDIT.MAIN_INFO.CHANGES_LOST'),
      () => {
        if(this.listType === LIST_TYPES.GLORY){
          this.character.setGlory(this.enterRenow);
        }else if(this.listType === LIST_TYPES.INFAMY){
          this.character.setInfamy(this.enterRenow);
        }
        this.getSaver()[this.listType](this.initialList);
        this.fetch();
        this.exitModal.emit();
      },
      this.translate);
  }

  private fetch(){
    this.list = this.getLoader()[this.listType]();
    this.tabledata = this.getTableData(this.list);
    this.initialList= cloneList(this.list);
  }

  public removeItem(){
    const alertParams: AlertOptions = {
      header: this.translate.instant('EDIT.REMOVE_SKILL_TITLE'),
      inputs : this.list.map((item): AlertInput=> ({
        type: 'radio',
        label: item,
        value: item
      })),
      buttons: [
        { text:  this.translate.instant('SHARED.CANCEL'), cssClass: 'alert-secondaryButton' },
        {
          text:  this.translate.instant('SHARED.DELETE'),
          cssClass: 'alert-primaryButton',
          handler:  (data: any) => {
            this.list = this.list.filter(str => str !== data);
            this.getSaver()[this.listType](this.list);
            this.tabledata = this.getTableData(this.list);
    }}]};
    openAlert(alertParams);
  }

  public addItem(){
    const alertParams: AlertOptions = {
      header: this.translate.instant('EDIT.ADD'),
      inputs : [{
        type: 'text',
        placeholder: this.translate.instant('SHARED.DESC'),
        name: 'itenName'
      }],
      buttons: [
        { text:  this.translate.instant('SHARED.CANCEL'), cssClass: 'alert-secondaryButton' },
        {
          text:  this.translate.instant('EDIT.ADD'),
          cssClass: 'alert-primaryButton',
          handler:  (data: {itenName: string}) => {
            const control = new FormControl();
            control.setValue(data.itenName);
            const invalid = noSpecialCharactersValidator(control)?.specialCharacters;
            if(!invalid){
              this.getPusher()[this.listType](data.itenName);
              this.list = this.getLoader()[this.listType]();
              this.tabledata = this.getTableData(this.list);
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

  private getSaver() {
    return {
      [LIST_TYPES.TITLES]: (list: string[]) => this.character.setTitles(list),
      [LIST_TYPES.GLORY]: (list: string[]) => this.character.setGloryLines(list),
      [LIST_TYPES.INFAMY]: (list: string[]) => this.character.setInfamyLines(list),
      [LIST_TYPES.EQUIP]: (list: string[]) => this.character.setOtherEquip(list),
      [LIST_TYPES.OTHERS_NOTES]: (list: string[]) => this.character.setOtherNotes(list)
    }
  }

  private getPusher() {
    return {
      [LIST_TYPES.TITLES]: (item: string) => this.character.getTitles().push(item),
      [LIST_TYPES.GLORY]: (item: string) => this.character.getGloryLines().push(item),
      [LIST_TYPES.INFAMY]: (item: string) => this.character.getInfamyLines().push(item),
      [LIST_TYPES.EQUIP]: (item: string) => this.character.getOtherEquip().push(item),
      [LIST_TYPES.OTHERS_NOTES]: (item: string) => this.character.getOtherNotes().push(item)
    }
  }

  private getLoader() {
    return {
      [LIST_TYPES.TITLES]: () => this.character.getTitles(),
      [LIST_TYPES.GLORY]: () => this.character.getGloryLines(),
      [LIST_TYPES.INFAMY]: () => this.character.getInfamyLines(),
      [LIST_TYPES.EQUIP]: () => this.character.getOtherEquip(),
      [LIST_TYPES.OTHERS_NOTES]: () => this.character.getOtherNotes()
    }
  }

  private getTableData(list: string[]){
    return list.map( listObj => ({
      name: listObj
    }))
  }
}
