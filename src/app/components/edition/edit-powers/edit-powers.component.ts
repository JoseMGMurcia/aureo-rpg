import { Component, EventEmitter, Input, Output} from '@angular/core';
import { Character } from 'src/app/model/character';

@Component({
  selector: 'app-edit-powers',
  templateUrl: './edit-powers.component.html',
  styleUrls: ['./edit-powers.component.scss'],
})
export class EditPowersComponent{

  @Output() saveCharacter: EventEmitter<any> = new EventEmitter<any>();
  @Output() exitModal: EventEmitter<any> = new EventEmitter<any>();


}
