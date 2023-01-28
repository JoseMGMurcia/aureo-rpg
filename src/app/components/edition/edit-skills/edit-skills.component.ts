import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { AlertInput, AlertOptions } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { type } from 'os';
import { Subject, takeUntil } from 'rxjs';
import { SKILL_TYPES } from 'src/app/constants/constants';
import { MAGIC_NUMBERS } from 'src/app/constants/number.constants';
import { ModificatorController } from 'src/app/controller/modificatorController';
import { cloneSkills } from 'src/app/controller/skillController';
import { Character } from 'src/app/model/character';
import { Modificator } from 'src/app/model/modificator';
import { Skill } from 'src/app/model/skill';
import { getSymbol } from 'src/app/pages/detail/detail.page.data.helper';
import { CharactersService } from 'src/app/services/characters.service';
import { easyConfirmAlert, openAlert } from 'src/app/utils/alert.utils';
import { TableDataConfiguration } from '../../table/table.component';

@Component({
  selector: 'app-edit-skills',
  templateUrl: './edit-skills.component.html',
  styleUrls: ['./edit-skills.component.scss'],
})
export class EditSkillsComponent implements OnInit, OnDestroy{

  @Input() title = '';
  @Input() type = '';
  @Output() saveCharacter: EventEmitter<any> = new EventEmitter<any>();
  @Output() exitModal: EventEmitter<any> = new EventEmitter<any>();

  public skills: Skill[] = [];

  public selectedSkill: Skill = new Skill('', 0);
  public modData: any[] = [];
  public monDataConf: TableDataConfiguration = this.getModDataConfiguration();
  public inSkills:  Skill[] = [];
  public character: Character = new Character('pepe');
  public skillTypes = SKILL_TYPES;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
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
    const foundSkill =  this.skills.find( skill=> skill.getName() === event.detail.value);
    this.selectedSkill = foundSkill ? foundSkill : this.selectedSkill;
    this.setModDdata();
  }

  public handleExit(){
    easyConfirmAlert(
      this.translate.instant('EDIT.MAIN_INFO.CHANGES_LOST'),
      () => {
        if(this.type === SKILL_TYPES.PRIMARY){
          this.character.setPrymarySkills(this.inSkills);
        }else if(this.type === SKILL_TYPES.SECONDARY){
          this.character.setSecondarySkills(this.inSkills);
        }
        this.fetch();
        this.exitModal.emit();
      },
      this.translate);
  }

  public getModDataConfiguration(): TableDataConfiguration{
    const transLations = this.translate.instant('SHARED');
    return { columns: [
        {id: 'name', name: transLations.DESC},
        {id: 'value', name: transLations.VALUE},
        {id: 'partial', name: transLations.PARCIAL}
      ]};
  }

  public addSkill() {
    const target: number = this.selectedSkill.getLevel() + MAGIC_NUMBERS.N_1;
    this.selectedSkill.setLevel(target > MAGIC_NUMBERS.N_6 ? this.selectedSkill.getLevel() : target)
  }

  public removeSkill() {
    const target: number = this.selectedSkill.getLevel() - MAGIC_NUMBERS.N_1;
    this.selectedSkill.setLevel(target < MAGIC_NUMBERS.N_1 ? this.selectedSkill.getLevel() : target)
  }


  public addMod() {
    const texts = this.translate.instant('SHARED');
    const alertParams: AlertOptions = {
      header: this.translate.instant('EDIT.NEW_MOD'),
      message: this.translate.instant('EDIT.ADD_MOD_TEXT'),
      inputs: [
        { type: 'text', placeholder:  texts.DESC, name: 'desc' },
        { type: 'number', placeholder:  texts.VALUE,  name: 'value' },
        { type: 'checkbox', name: 'partial', label: texts.PARCIAL }
      ],
      buttons: [
        { text:  texts.CANCEL, cssClass: 'alert-secondaryButton' },
        {
          text:  this.translate.instant('EDIT.ADD'),
          cssClass: 'alert-primaryButton',
          handler:  (data: any) => {
            // VALIDATE
            this.selectedSkill.getMods().push(new Modificator(data.value, data.desc, data.partial ===  'on'));
            this.setChatacterSkills();
    }}]};
    openAlert(alertParams);
  }

  public removeMod() {
    const inputs: AlertInput[] =[];
    this.selectedSkill.getMods().forEach( mod => {
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
            const modIndex: number =  this.selectedSkill.getMods().findIndex( mod =>
              this.getModDetails(mod) === data );
            this.selectedSkill.getMods().splice(modIndex, 1);
            this.setChatacterSkills();
    }}]};
    openAlert(alertParams);
  }

  public getModDetails(mod: Modificator): string  {
    return ModificatorController.getModDetails(mod, this.translate);
  }

  public addNewSkill(){
    const alertParams: AlertOptions = {
      header: this.translate.instant('EDIT.ADD_SKILL_TITLE'),
      inputs : [{
        type: 'text',
        placeholder: this.translate.instant('EDIT.MAIN_INFO.NAME'),
        name: 'skillName'
      }],
      buttons: [
        { text:  this.translate.instant('SHARED.CANCEL'), cssClass: 'alert-secondaryButton' },
        {
          text:  this.translate.instant('EDIT.ADD'),
          cssClass: 'alert-primaryButton',
          handler:  (data: any) => {
            if(this.type === SKILL_TYPES.SECONDARY && data.skillName){
              this.character.getSecondarySkills().push(new Skill(data.skillName, MAGIC_NUMBERS.N_1));
            }
            this.setChatacterSkills();
    }}]};
    openAlert(alertParams);
  }

  private fetch(){
    if(this.type === SKILL_TYPES.PRIMARY){
      this.skills = this.character.getPrymarySkills();
    }else  if(this.type === SKILL_TYPES.SECONDARY){
      this.skills = this.character.getSecondarySkills();
    }
    this.inSkills = cloneSkills(this.skills);
  }

  private setModDdata(){
    this.modData = this.selectedSkill.getMods().map( mod => ({
      name: mod.getName(),
      value: `${getSymbol( mod.getValue())}${mod.getValue()}`,
      partial: mod.isPartial() ? 'X' : '-'
    }));
  }

  private setChatacterSkills(){
    if(this.type === SKILL_TYPES.PRIMARY){
      this.character.setPrymarySkills(this.skills);
    }else if(this.type === SKILL_TYPES.SECONDARY){
      this.character.setSecondarySkills(this.skills);
    }
    this.setModDdata();
  }
}
