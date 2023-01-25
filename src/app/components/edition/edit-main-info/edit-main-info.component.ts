import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MAIN_INFO_FIELDS } from 'src/app/constants/constants';
import { MAGIC_NUMBERS } from 'src/app/constants/number.constants';
import { Character } from 'src/app/model/character';
import { easyConfirmAlert } from 'src/app/utils/alert.utils';

@Component({
  selector: 'app-edit-main-info',
  templateUrl: './edit-main-info.component.html',
  styleUrls: ['./edit-main-info.component.scss'],
})
export class EditMainInfoComponent implements OnInit{

  @Input() character: Character = new Character('pepe');
  @Output() saveCharacter: EventEmitter<any> = new EventEmitter<any>();
  @Output() exitModal: EventEmitter<any> = new EventEmitter<any>();

  public form: UntypedFormGroup = this.formBuilder.group({});
  public id = MAIN_INFO_FIELDS;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private translate: TranslateService
    ){}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      [this.id.NAME]: [this.character.getName(), [Validators.minLength(3), Validators.maxLength(19)]],
      [this.id.PLAYER]: [this.character.getPlayer(), [Validators.minLength(3), Validators.maxLength(19)]],
      [this.id.CULT]: [this.character.getCult(), [Validators.minLength(3), Validators.maxLength(19)]],
      [this.id.ARQUETYPE]: [this.character.getArquetype(), [Validators.minLength(3), Validators.maxLength(19)]],
      [this.id.POLIS]: [this.character.getPolis(), [Validators.minLength(3), Validators.maxLength(19)]],
      [this.id.SEX]: [this.character.getSex(), [Validators.minLength(1), Validators.maxLength(6)]],
      [this.id.SOCIAL_GROUP]: [this.character.getSocialGroup(), [Validators.minLength(3), Validators.maxLength(19)]],
      [this.id.AGE]: [this.character.getAge(), Validators.pattern('^[0-9]*$')]
    });
  }

  public handleSave(){
    const translations = this.translate.instant('EDIT.MAIN_INFO');
    //TODO Validate all fields
    let text = translations.INVALID_FIELDS;
    let swSomeInvalids = false;
    const validatedControls = Object.keys(this.form.controls).map( controlKey => this.form.controls[controlKey].valid ? controlKey : '');
    Object.keys(this.id).forEach( field => {
      if(!validatedControls.includes(field)){
        swSomeInvalids = true;
        text = text.concat(translations[field], ' ,');
      }
    });
    text = text.slice(0, -1);

    if (swSomeInvalids){
      easyConfirmAlert(text ,()=>{} , this.translate );
    }else{
      this.character.setName(this.form.controls[this.id.NAME].value);
      this.character.setPlayer(this.form.controls[this.id.PLAYER].value);
      this.character.setPolis(this.form.controls[this.id.POLIS].value);
      this.character.setCult(this.form.controls[this.id.CULT].value);
      this.character.setSex(this.form.controls[this.id.SEX].value);
      this.character.setArquetype(this.form.controls[this.id.ARQUETYPE].value);
      this.character.setSocialGroup(this.form.controls[this.id.SOCIAL_GROUP].value);
      this.character.setAge(this.form.controls[this.id.AGE].value);
      this.saveCharacter.emit();
    }
  }

  public handleExit(){
    easyConfirmAlert(
      this.translate.instant('EDIT.MAIN_INFO.CHANGES_LOST'),
      () => {
        this.exitModal.emit();
      },
      this.translate);
  }

  public removeAureo() {
    const target: number = this.character.getAureo() - MAGIC_NUMBERS.N_1;
    this.character.setAureo(target > MAGIC_NUMBERS.N_0 ? target : this.character.getAureo());
  }

  public addAureo() {
    const target: number = this.character.getAureo() + MAGIC_NUMBERS.N_1;
    this.character.setAureo(target);
  }

  public removeHibris() {
    const target: number = this.character.getHibris() - MAGIC_NUMBERS.N_1;
    this.character.setHibris(target > MAGIC_NUMBERS.N_0 ? target : this.character.getAureo());
  }

  public addHibris() {
    const target: number = this.character.getHibris() + MAGIC_NUMBERS.N_1;
    this.character.setHibris(target);
  }
}

