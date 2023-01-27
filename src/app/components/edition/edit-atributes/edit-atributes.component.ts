import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { UntypedFormBuilder, FormGroup } from '@angular/forms';
import { AlertInput, AlertOptions } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';
import { ATRIBUTE_FIELDS } from 'src/app/constants/constants';
import { MAGIC_NUMBERS } from 'src/app/constants/number.constants';
import { cloneAtributes } from 'src/app/controller/atribute.controller';
import { ModificatorController } from 'src/app/controller/modificatorController';
import { Atribute, Atributes } from 'src/app/model/atributes';
import { Character } from 'src/app/model/character';
import { Modificator } from 'src/app/model/modificator';
import { getSymbol } from 'src/app/pages/detail/detail.page.data.helper';
import { CharactersService } from 'src/app/services/characters.service';
import { easyConfirmAlert, openAlert } from 'src/app/utils/alert.utils';
import { TableDataConfiguration } from '../../table/table.component';

@Component({
  selector: 'app-edit-atributes',
  templateUrl: './edit-atributes.component.html',
  styleUrls: ['./edit-atributes.component.scss'],
})
export class EditAtributesComponent implements OnInit, OnDestroy{

  @Input() title = '';
  @Input() list: any = [];
  @Output() saveCharacter: EventEmitter<any> = new EventEmitter<any>();
  @Output() exitModal: EventEmitter<any> = new EventEmitter<any>();

  public atributeFields = ATRIBUTE_FIELDS;
  public atributes: Atributes = new Atributes();

  public selectedAtribute = '';
  public selectedAtributeName = '';
  public modData: any[] = [];
  public monDataConf: TableDataConfiguration = this.getModDataConfiguration();
  public inAtributes: Atributes = new Atributes();
  public character: Character = new Character('pepe');
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private formBuilder: UntypedFormBuilder,
    private translate: TranslateService,
    private charactersServce : CharactersService
    ){}

  ngOnInit(): void {

    this.charactersServce.character
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

  public handleChange(event: any){
    this.selectedAtribute = event.detail.value;
    this.selectedAtributeName = this.translate.instant(`EDIT.ATRIBUTES.${this.selectedAtribute}`);
    this.setModDdata();
  }

  public handleExit(){
    easyConfirmAlert(
      this.translate.instant('EDIT.MAIN_INFO.CHANGES_LOST'),
      () => {
        this.character.setAtributes(this.inAtributes);
        this.fetch();
        this.exitModal.emit();
      },
      this.translate);
  }

  public handleSelectedMod(event: any){
    console.log(event);
  }

  public getAtribute(): Atribute {
    const atributeGetter = {
      [ATRIBUTE_FIELDS.AGILITY]: this.atributes.getAgility(),
      [ATRIBUTE_FIELDS.APPEAR]: this.atributes.getAppearance(),
      [ATRIBUTE_FIELDS.COMMUN]: this.atributes.getComunication(),
      [ATRIBUTE_FIELDS.MIND]:  this.atributes.getMind(),
      [ATRIBUTE_FIELDS.REFLEX]:  this.atributes.getReflexes(),
      [ATRIBUTE_FIELDS.RESIST]: this.atributes.getResistance(),
      [ATRIBUTE_FIELDS.SENSE]: this.atributes.getSense(),
      [ATRIBUTE_FIELDS.SOUL]: this.atributes.getSoul(),
      [ATRIBUTE_FIELDS.STRENGTH]: this.atributes.getStrength(),
    };
    return atributeGetter[this.selectedAtribute];
  }

  public getModDataConfiguration(): TableDataConfiguration{
    const transLations = this.translate.instant('SHARED');
    return {
      columns: [
        {id: 'name', name: transLations.DESC},
        {id: 'value', name: transLations.VALUE},
        {id: 'partial', name: transLations.PARCIAL}
      ]
    }
  }

  public addAtribute() {
    const target: number = this.getAtribute().getValue() + MAGIC_NUMBERS.N_1;
    this.getAtribute().setValue(target > MAGIC_NUMBERS.N_6 ? this.getAtribute().getValue() : target)
  }

  public removeAtribute() {
    const target: number = this.getAtribute().getValue() - MAGIC_NUMBERS.N_1;
    this.getAtribute().setValue(target < MAGIC_NUMBERS.N_1 ? this.getAtribute().getValue() : target)
  }


  public addMod() {
    const texts = this.translate.instant('SHARED');
    const alertParams: AlertOptions = {
      header: this.translate.instant('EDIT.NEW_MOD'),
      message: this.translate.instant('EDIT.ADD_MOD_TEXT'),
      inputs: [
        {
          type: 'text',
          placeholder:  texts.DESC,
          name: 'desc'
        },
        {
          type: 'number',
          placeholder:  texts.VALUE,
          name: 'value'
        },
        {
          type: 'checkbox',
          name: 'partial',
          label: texts.PARCIAL,
        }
      ],
      buttons: [
        { text:  texts.CANCEL, cssClass: 'alert-secondaryButton' },
        {
          text:  this.translate.instant('EDIT.ADD'),
          cssClass: 'alert-primaryButton',
          handler:  (data: any) => {
            // VALIDATE
            this.getAtribute().getMods().push(new Modificator(data.value, data.desc, data.partial ===  'on'));
            this.character.setAtributes(this.atributes);
            this.setModDdata();
    }}]};
    openAlert(alertParams);
  }

  public removeMod() {
    const inputs: AlertInput[] =[];
    this.getAtribute().getMods().forEach( mod => {
      inputs.push({ type: 'radio',  value: this.getModDetails(mod), label: this.getModDetails(mod) });
    });

    const alertParams: AlertOptions = {
      header: this.translate.instant('EDIT.SELECT_MOD'),
      inputs,
      buttons: [
        { text:  this.translate.instant('SHARED.CANCEL'), cssClass: 'alert-secondaryButton' },
        {
          text:  this.translate.instant('SHARED.DELETE'),
          cssClass: 'alert-primaryButton',
          handler:  (data: any) => {
            const modIndex: number =  this.getAtribute().getMods().findIndex( mod =>
              this.getModDetails(mod) === data );
            this.getAtribute().getMods().splice(modIndex, 1);
            this.character.setAtributes(this.atributes);
            this.setModDdata();
    }}]};
    openAlert(alertParams);
  }

  public getModDetails(mod: Modificator): string  {
    return ModificatorController.getModDetails(mod, this.translate);
  }

  private fetch(){
    this.atributes = this.character.getAtributes();
    this.inAtributes = cloneAtributes(this.atributes);
  }

  private setModDdata(){
    this.modData = this.getAtribute().getMods().map( mod => ({
      name: mod.getName(),
      value: `${getSymbol( mod.getValue())}${mod.getValue()}`,
      partial: mod.isPartial() ? 'X' : '-'
    }));
  }
}

