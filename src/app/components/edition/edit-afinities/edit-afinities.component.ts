import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormControl } from '@angular/forms';
import { AlertInput, AlertOptions } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';
import { MAGIC_NUMBERS } from 'src/app/constants/number.constants';
import { noSpecialCharactersValidator } from 'src/app/controller/custom.validator';
import { cloneGodAffinities } from 'src/app/controller/godAfinity.controller';
import { Character } from 'src/app/model/character';
import { GodAffinity } from 'src/app/model/godAffinity';
import { CharactersService } from 'src/app/services/characters.service';
import { easyConfirmAlert, openAlert } from 'src/app/utils/alert.utils';

@Component({
  selector: 'app-edit-afinities',
  templateUrl: './edit-afinities.component.html',
  styleUrls: ['./edit-afinities.component.scss'],
})
export class EditAfinitiesComponent implements OnInit{

  @Output() saveCharacter: EventEmitter<any> = new EventEmitter<any>();
  @Output() exitModal: EventEmitter<any> = new EventEmitter<any>();
  public character: Character = new Character('Pepe');
  public godAfinities: GodAffinity[] = [];
  public inGodAfinities: GodAffinity[] = [];
  public selectedAfinity: GodAffinity = new GodAffinity('');
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private translate: TranslateService,
    private charactersService: CharactersService
  ){}

  public handleSave(){
    this.saveCharacter.emit();
  }

  ngOnInit(): void {
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

  public removeAfinity(){
    const target: number = this.selectedAfinity.getAffinity() - MAGIC_NUMBERS.N_1;
    this.selectedAfinity.setAffinity(target < MAGIC_NUMBERS.N_1 ?  this.selectedAfinity.getAffinity() : target)
  }

  public addAfinity(){
    const target: number = this.selectedAfinity.getAffinity() + MAGIC_NUMBERS.N_1;
    this.selectedAfinity.setAffinity(target > MAGIC_NUMBERS.N_5 ?  this.selectedAfinity.getAffinity() : target)
  }

  public removeAretes(){
    const target: number = this.selectedAfinity.getAretes() - MAGIC_NUMBERS.N_1;
    this.selectedAfinity.setAretes(target < MAGIC_NUMBERS.N_0 ?  this.selectedAfinity.getAretes() : target)
  }

  public addAretes(){
    const target: number = this.selectedAfinity.getAretes() + MAGIC_NUMBERS.N_1;
    this.selectedAfinity.setAretes(target > MAGIC_NUMBERS.N_10 ?  this.selectedAfinity.getAretes() : target)
  }

  public removeHamartias(){
    const target: number = this.selectedAfinity.getHamartias() - MAGIC_NUMBERS.N_1;
    this.selectedAfinity.setHamartias(target < MAGIC_NUMBERS.N_0 ?  this.selectedAfinity.getHamartias() : target)
  }

  public addHamartias(){
    const target: number = this.selectedAfinity.getHamartias() + MAGIC_NUMBERS.N_1;
    this.selectedAfinity.setHamartias(target > MAGIC_NUMBERS.N_10 ?  this.selectedAfinity.getHamartias() : target)
  }

  public handleChange(event: any){
    const findedGodAfinity = this.godAfinities.find( godAfin => godAfin.getGod() === event.detail.value);
    this.selectedAfinity = findedGodAfinity ? findedGodAfinity : this.selectedAfinity;
  }

  public removeGodAfinity(){
    const alertParams: AlertOptions = {
      header: this.translate.instant('EDIT.REMOVE_SKILL_TITLE'),
      inputs : this.godAfinities.map((godAf): AlertInput=> ({
        type: 'radio',
        label: godAf.getGod(),
        value: godAf.getGod()
      })),
      buttons: [
        { text:  this.translate.instant('SHARED.CANCEL'), cssClass: 'alert-secondaryButton' },
        {
          text:  this.translate.instant('SHARED.DELETE'),
          cssClass: 'alert-primaryButton',
          handler:  (data: any) => {
            const index = this.godAfinities.findIndex(godAf => godAf.getGod() === data);
            this.godAfinities.splice(index, MAGIC_NUMBERS.N_1);
            if(this.selectedAfinity.getGod() === data ){
              this.selectedAfinity = new GodAffinity('');
            }
            this.character.setGodAfinities(this.godAfinities);
    }}]};
    openAlert(alertParams);
  }

  public addGodAfinity(){
    const alertParams: AlertOptions = {
      header: this.translate.instant('EDIT.ADD_AFINITY'),
      inputs : [{
        type: 'text',
        placeholder: this.translate.instant('EDIT.MAIN_INFO.NAME'),
        name: 'afinityName'
      }],
      buttons: [
        { text:  this.translate.instant('SHARED.CANCEL'), cssClass: 'alert-secondaryButton' },
        {
          text:  this.translate.instant('EDIT.ADD'),
          cssClass: 'alert-primaryButton',
          handler:  (data: {afinityName: string}) => {
            const control = new FormControl();
            control.setValue(data.afinityName);
            const invalid = noSpecialCharactersValidator(control)?.specialCharacters;
            const index = this.godAfinities.findIndex(godAf => godAf.getGod().toUpperCase() === data.afinityName.toUpperCase());
            const repeated = index > -MAGIC_NUMBERS.N_1;
            if(data.afinityName && !invalid && !repeated){
              this.character.getGodAfinities().push(new GodAffinity(data.afinityName, MAGIC_NUMBERS.N_2));
            }else {
              const alertParams: AlertOptions = {
                header: this.translate.instant('EDIT.INVALID_NAME'),
                buttons: [this.translate.instant('SHARED.OK')]
              }
              openAlert(alertParams);
            }
           this.character.setGodAfinities(this.godAfinities);
    }}]};
    openAlert(alertParams);
  }

  public handleExit(){
    easyConfirmAlert(
      this.translate.instant('EDIT.MAIN_INFO.CHANGES_LOST'),
      () => {
        this.character.setGodAfinities(this.inGodAfinities);
        this.fetch();
        this.exitModal.emit();
      },
      this.translate);
  }

  private fetch(){
    this.godAfinities = this.character.getGodAfinities();
    this.inGodAfinities= cloneGodAffinities(this.godAfinities);
  }
}
