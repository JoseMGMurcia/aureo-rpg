import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MAGIC_NUMBERS } from '../constants/number.constants';
import { Atributes } from '../model/atributes';
import { Character } from '../model/character';
import { GodAffinity } from '../model/godAffinity';
import { Skill } from '../model/skill';


@Injectable({
  providedIn: 'root'
})
export class CharacterFactory {

    constructor(private translateService: TranslateService){}

    public getCharacter(name: string): Character{
      const pj = new Character(name);
      const skillsObject = this.translateService.instant('SKILLS.PRYMARY_SKILLS');
      pj.setGodAfinities([
        new GodAffinity('Afrodita'),
        new GodAffinity('Apolo'),
        new GodAffinity('Ares'),
        new GodAffinity('Artemisa'),
        new GodAffinity('Atenea'),
        new GodAffinity('Dioniso'),
        new GodAffinity('Hades'),
        new GodAffinity('Hefesto'),
        new GodAffinity('Hermes'),
        new GodAffinity('Hera'),
        new GodAffinity('Poseidon'),
        new GodAffinity('Zeus')
      ]);
      pj.setPrymarySkills(Object.keys(skillsObject).map(key =>
        new Skill(skillsObject[key], MAGIC_NUMBERS.N_0)));
      return pj;
    }
}
