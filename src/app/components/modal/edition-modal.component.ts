import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil} from 'rxjs';
import { ModalController, NavParams } from '@ionic/angular';
import { Character } from 'src/app/model/character';
import { CharactersService } from 'src/app/services/characters.service';
import { StorageService } from 'src/app/services/storage.service';
import { CARD_ID, DATABASE_NAME, GiftTypesEnum, LIST_TYPES, SECTION, SKILL_TYPES } from 'src/app/constants/constants';

@Component({
  selector: 'app-custom-modal',
  templateUrl: 'edition-modal.component.html',
  styleUrls: ['./edition-modal.component.scss'],
})
export class EditionModalComponent implements OnInit, OnDestroy{

  public section = '';
  public character: Character = new Character('Pepe');
  public characters: Character[] = [];
  public id = CARD_ID;
  public skillTypes = SKILL_TYPES;
  public listTypes = LIST_TYPES;
  public giftsTypes = GiftTypesEnum;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private characterService: CharactersService,
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private storage: StorageService
  ) {}

 ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit(): void {
    this.section = this.navParams.get(SECTION);
    this.characterService.character
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((character)=> {
        this.character = character;
      });
    this.characterService.characters
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((characters)=> {
        this.characters = characters;
      });
  }

  cancel() {
    this.modalCtrl.dismiss();
  }

  confirm() {
    const index = this.characters.findIndex( pj => pj.getId() === this.character.getId());
    if (index > -1){
      this.characters[index] = this.character;
    }
    this.storage.set(DATABASE_NAME, JSON.stringify(this.characters));
    this.characterService.setCharacter(this.character);
    this.modalCtrl.dismiss();
  }

}
