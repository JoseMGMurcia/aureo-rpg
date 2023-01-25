import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { UntypedFormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ATRIBUTE_FIELDS } from 'src/app/constants/constants';
import { Atributes } from 'src/app/model/atributes';
import { Character } from 'src/app/model/character';
import { easyConfirmAlert } from 'src/app/utils/alert.utils';

@Component({
  selector: 'app-edit-atributes',
  templateUrl: './edit-atributes.component.html',
  styleUrls: ['./edit-atributes.component.scss'],
})
export class EditAtributesComponent implements OnInit{

  @Input() character: Character = new Character('pepe');
  @Input() title = '';
  @Input() list: any = [];
  @Output() saveCharacter: EventEmitter<any> = new EventEmitter<any>();
  @Output() exitModal: EventEmitter<any> = new EventEmitter<any>();

  public atributeFields = ATRIBUTE_FIELDS;
  public atributes: Atributes = new Atributes();

  public selectedAtribute = '';
  public selectedAtributeName = '';


  constructor(
    private formBuilder: UntypedFormBuilder,
    private translate: TranslateService
    ){}

  ngOnInit(): void {
    this.atributes = this.character.getAtributes();
  }

  public handleSave(){
    this.saveCharacter.emit();
  }

  public handleChange(event: any){
    this.selectedAtribute = event.detail.value;
    this.selectedAtributeName = this.translate.instant(`EDIT.ATRIBUTES.${this.selectedAtribute}`);
  }

  public handleExit(){
    easyConfirmAlert(
      this.translate.instant('EDIT.MAIN_INFO.CHANGES_LOST'),
      () => {
        this.exitModal.emit();
      },
      this.translate);
  }
}

