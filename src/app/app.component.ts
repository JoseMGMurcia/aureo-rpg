import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AVALIABLE_LANGUAJES, DATABASE_NAME } from './constants/constants';
import { CharacterController } from './controller/characterController';
import { Character } from './model/character';
import { getMockCharacter } from './services/character.service.mock';
import { CharactersService } from './services/characters.service';
import { StorageService } from './services/storage.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  public appPages = [
    { title: 'HOME',        url: '/home',       icon: 'home' },
    { title: 'CHARACTERS',  url: '/characters', icon: 'people' },
    { title: 'WIKI',        url: '/wiki',       icon: 'book' },
    { title: 'DICE_SET',    url: '/dices',      icon: 'dice' },
    { title: 'INFO',        url: '/info',       icon: 'information-circle' }
  ];
  public characters: Character[] = [];

  constructor(
    private translate: TranslateService,
    private storageService: StorageService,
    private characterService: CharactersService,
    private router: Router) {}

  async ngOnInit() {
    const devideLanguaje = window.navigator.language.substring(0,2).toLowerCase();
    if( AVALIABLE_LANGUAJES.includes(devideLanguaje) ){
      this.translate.setDefaultLang( devideLanguaje );
    }else{
      this.translate.setDefaultLang('en');
    }
    const protoCharacters = JSON.parse( await this.storageService.get(DATABASE_NAME) );
    this.characters = CharacterController.converToCharacters(protoCharacters);
    this.characterService.setCharacters(this.characters);
    if(this.characters.length === 0){
      this.characters.push(getMockCharacter());
    }
  }

  public changelanguage(language: string): void{
    if( AVALIABLE_LANGUAJES.includes(language) ){
      this.translate.setDefaultLang( language );
    }
  }

  public navigateToDetail(character: Character){
    this.characterService.setCharacter(character);
  //   if(this.router.url.substring(0,7) !== '/detail') {
  //     const params = { character };
  //     this.router.navigate(['/detail'] , { state: params});
  //   }
  }
}
