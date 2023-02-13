import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AVALIABLE_LANGUAJES, DATABASE_NAME, FILES } from './constants/constants';
import { MAGIC_NUMBERS } from './constants/number.constants';
import { CharacterController } from './controller/characterController';
import { Character } from './model/character';
import { getMockCharacter } from './services/character.service.mock';
import { CharactersService } from './services/characters.service';
import { JsonService } from './services/json.service';
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
    private router: Router,
    private jsonService: JsonService
  ) {}

  async ngOnInit() {
    this.fetch();
  }

  public changelanguage(language: string): void{
    if( AVALIABLE_LANGUAJES.includes(language) ){
      this.translate.setDefaultLang( language );
    }
  }

  public navigateToDetail(character: Character){
    this.characterService.setCharacter(character);
    if(this.router.url.substring(0,7) !== '/detail') {
      this.router.navigate(['/detail']);
    }
  }

  private async fetch() {
    this.setTranslations();
    this.loadCharacters();
    this.loadGiftData();
  }

  private setTranslations() {
    const devideLanguaje = window.navigator.language.substring(0,2).toLowerCase();
    if( AVALIABLE_LANGUAJES.includes(devideLanguaje) ){
      this.translate.setDefaultLang( devideLanguaje );
    }else{
      this.translate.setDefaultLang('es');
    }
  }

  private async loadCharacters() {
    const protoCharacters = JSON.parse( await this.storageService.get(DATABASE_NAME) );
    this.characters = CharacterController.converToCharacters(protoCharacters);
    this.characterService.setCharacters(this.characters);
    if(this.characters.length === MAGIC_NUMBERS.N_0){
      this.characters.push(getMockCharacter());
    }
  }

  private loadGiftData(){
    this.jsonService.getGiftsDataFromJson(FILES.GIFTS)
    .subscribe(data => {
      this.characterService.setGiftData(data);
    });
  }
}
