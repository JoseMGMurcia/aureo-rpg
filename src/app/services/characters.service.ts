import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Character } from '../model/character';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  public characters: BehaviorSubject<any> = new BehaviorSubject([]);
  public characters$ = this.characters.asObservable();

  public character: BehaviorSubject<any> = new BehaviorSubject(null);
  public character$ = this.character.asObservable();

  public setCharacters(characters: Character[]): void {
    this.characters.next(characters);
  }

  public setCharacter(character: Character): void {
    this.character.next(character);
  }
}
