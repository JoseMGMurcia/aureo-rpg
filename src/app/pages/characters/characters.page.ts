import { Component, OnDestroy } from '@angular/core';
import { alertController } from '@ionic/core';
import { TranslateService } from '@ngx-translate/core';

import { CharacterController } from 'src/app/controller/characterController';
import { Character } from 'src/app/model/character';
import { CharactersService } from 'src/app/services/characters.service';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { DATABASE_NAME } from 'src/app/constants/constants';

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
    private storageService: StorageService
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
    const alerParams: any = {
      header: texts.HEADER,
      subHeader: texts.TEXT,
      inputs: [{
        name: 'name1',
        placeholder: texts.NAME
      }],
      buttons: [{
          text: texts.AGREE,
          cssClass: 'secondary',
          handler: (data: any) => {
            if( CharacterController.isNameValid(data.name1) ){
              this.characs.push(new Character(data.name1));
              this.storageService.set(DATABASE_NAME, JSON.stringify(this.characs));
            }else{
              // Not a valid name
              const alerNotValidParams: any= {
                header: texts.NO_VALID_NAME,
                buttons: [ texts.AGREE ]
              };
              alertController.create(alerNotValidParams).then(res => {
                res.present();
              });
            }
          }
        }, texts.CANCEL
      ]
    };
    alertController.create(alerParams).then(alert => {
      alert.present();
    });
  }

  deleteCharacter(character: Character){
    const alerParams: any = {
      header: this.ts.instant('CHAR_PAGE.DELETE_ALERT.HEADER'),
      subHeader: this.ts.instant('CHAR_PAGE.DELETE_ALERT.TEXT', { character: character.getName() }),
      buttons: [{
        text: this.ts.instant('CHAR_PAGE.DELETE_ALERT.AGREE'),
        cssClass: 'secondary',
        handler: () => {
          const index = this.characs.indexOf(character);
          if (index > -1) {
            this.characs.splice(index, 1);
            this.storageService.set(DATABASE_NAME, JSON.stringify(this.characs));
          }
        }
      }, this.ts.instant('CHAR_PAGE.DELETE_ALERT.CANCEL')]
    };
    alertController.create(alerParams).then(alert => {
      alert.present();
    });
  }
}
