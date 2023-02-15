import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Character } from '../model/character';
import { GiftData } from '../model/giftData';
import { PowersData } from '../model/powerData';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  public characters: BehaviorSubject<any> = new BehaviorSubject([]);
  public characters$ = this.characters.asObservable();

  public character: BehaviorSubject<any> = new BehaviorSubject(null);
  public character$ = this.character.asObservable();

  public giftData: BehaviorSubject<any> = new BehaviorSubject(null);
  public giftData$ =this.giftData.asObservable();

  public powersData: BehaviorSubject<any> = new BehaviorSubject(null);
  public powersData$ =this.giftData.asObservable();

  public setGiftData(data: GiftData): void {
    this.giftData.next(data);
  }

  public setCharacters(characters: Character[]): void {
    this.characters.next(characters);
  }

  public setCharacter(character: Character): void {
    this.character.next(character);
  }

  public setPowersData(powers: PowersData): void {
    this.powersData.next(powers);
  }

}
