import { Component, OnDestroy } from '@angular/core';
import { alertController, AlertOptions } from '@ionic/core';
import { TranslateService } from '@ngx-translate/core';

import { CharacterController } from 'src/app/controller/characterController';
import { Character } from 'src/app/model/character';
import { CharactersService } from 'src/app/services/characters.service';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { DATABASE_NAME } from 'src/app/constants/constants';
import { NAMES, POLIS } from 'src/app/controller/character.constants';
import { openAlert } from 'src/app/utils/alert.utils';
import { CharacterFactory } from 'src/app/controller/character.factory';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.page.html',
  styleUrls: ['./characters.page.scss'],
})
export class CharactersPage implements OnDestroy{
  public characs: Character[] = [];
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private router: Router,
    private ts: TranslateService,
    private charactersService: CharactersService,
    private storageService: StorageService,
    private characterFactory: CharacterFactory
  ) {}

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ionViewWillEnter(){
    this.charactersService.characters
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((characters)=> {
        this.characs = characters;
      });
  }

  handleNavigation(character: Character){
    this.charactersService.setCharacter(character);
    const params = { character };
    this.router.navigate(['/detail'] , { state: params});
  }

  addCharacter(){
    const texts = this.ts.instant('CHAR_PAGE.ADD_ALERT');
    const alerParams: AlertOptions = {
      header: texts.HEADER,
      message: texts.TEXT,
      inputs: [{
        name: 'name1',
        placeholder: texts.NAME
      }],
      buttons: [{
        text: texts.AGREE,
        cssClass: 'secondary',
        handler: (data: any) => {
          if( CharacterController.isNameValid(data.name1) ){
            this.characs.push(this.characterFactory.getCharacter(data.name1));
            this.storageService.set(DATABASE_NAME, JSON.stringify(this.characs));
          }else{
            // Not a valid name
            const alerNotValidParams: AlertOptions = {
              header: texts.NO_VALID_NAME,
              buttons: [ texts.AGREE ]
            };
            alertController.create(alerNotValidParams).then(res => {
              res.present();
            });
          }
        }
      },
      {
        text: texts.RANDOM,
        handler: () => {
          const character = this.characterFactory.getCharacter(CharacterController.getRandomName(NAMES));
          character.setPolis(CharacterController.getRandomName(POLIS));
          this.characs.push(character);
          this.storageService.set(DATABASE_NAME, JSON.stringify(this.characs));
        }
      },
      texts.CANCEL
    ]
    };
    alertController.create(alerParams).then(alert => {
      alert.present();
    });
  }

  deleteCharacter(character: Character){
    const texts = this.ts.instant('CHAR_PAGE.DELETE_ALERT');
    const alerParams: AlertOptions = {
      header: texts.HEADER,
      message: this.ts.instant('CHAR_PAGE.DELETE_ALERT.TEXT', { character: character.getName() }),
      buttons: [{
        text: texts.AGREE,
        cssClass: 'secondary',
        handler: () => {
          const index = this.characs.indexOf(character);
          if (index > -1) {
            this.characs.splice(index, 1);
            this.storageService.set(DATABASE_NAME, JSON.stringify(this.characs));
          }
        }
      }, texts.CANCEL
    ]
    };
    openAlert(alerParams);
  }
}
