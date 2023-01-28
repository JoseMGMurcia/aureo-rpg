import { Component } from '@angular/core';
import { alertController, AlertOptions } from '@ionic/core';
import { TranslateService } from '@ngx-translate/core';
import { MAGIC_NUMBERS } from 'src/app/constants/number.constants';
import { openAlert } from 'src/app/utils/alert.utils';
import { getSymbol } from '../detail/detail.page.data.helper';

@Component({
  selector: 'app-dices',
  templateUrl: './dices.page.html',
  styleUrls: ['./dices.page.scss'],
})
export class DicesPage {

  public data: {attribute: number, skill: number, modif: number} = {
    attribute: 5,
    skill: 3,
    modif: 0
  };

  constructor(private translate: TranslateService) {}

  public rollDice(diceData: any){
    const texts = this.translate.instant('DICES_PAGE.ALERT');
    const result = Math.floor(Math.random() * 10) + 1;
    const secondResult = Math.floor(Math.random() * 10) + 1;
    const rndInt = result + diceData.attribute + diceData.skill + diceData.modif;
    const criticMsg = result === MAGIC_NUMBERS.N_10 ? `<p class="center bold">${texts.CRITICAL}</p><p class="dice-result center">${secondResult} </p>` : '';
    const fumbleMsm = result === MAGIC_NUMBERS.N_1 ? `<p class="center bold">${texts.FUMBLE} </p><p class="dice-result center">${secondResult} </p>` : '';
    const alerParams: AlertOptions = {
      header: texts.HEADER,
      message: `<p class="center bold">${this.translate.instant('DICES_PAGE.ALERT.TEXT', {
                  attribute: `${getSymbol(diceData.attribute)}${diceData.attribute}`,
                  skill: `${getSymbol(diceData.skill)}${diceData.skill}`,
                  modif: `${getSymbol(diceData.modif)}${diceData.modif}`
                  })}
                </p>
                <p class="center">${texts.RESULT}</p>
                <p class="dice-result center">${rndInt} </p>${criticMsg}${fumbleMsm}`,
      buttons: [{
        text: texts.AGREE,
        cssClass: 'alert-primaryButton'
      }]
    };

    openAlert(alerParams);
  }

  public addAtribute(){
    const target = this.data.attribute + MAGIC_NUMBERS.N_1;
    this.data.attribute = target > MAGIC_NUMBERS.N_6 ? this.data.attribute : target;
  }

  public removeAtribute(){
    const target = this.data.attribute - MAGIC_NUMBERS.N_1;
    this.data.attribute =target < MAGIC_NUMBERS.N_1 ? this.data.attribute : target;
  }

  public addSkill(){
    const target = this.data.skill + MAGIC_NUMBERS.N_1;
    this.data.skill = target > MAGIC_NUMBERS.N_6 ? this.data.skill : target;
  }

  public removeSkill(){
    const target = this.data.skill - MAGIC_NUMBERS.N_1;
    this.data.skill =target < MAGIC_NUMBERS.N_1 ? this.data.skill : target;
  }

  public addModif(){
    const target = this.data.modif + MAGIC_NUMBERS.N_1;
    this.data.modif = target > MAGIC_NUMBERS.N_9 ? this.data.modif : target;
  }

  public removeModif(){
    const target = this.data.modif - MAGIC_NUMBERS.N_1;
    this.data.modif =target < -MAGIC_NUMBERS.N_9 ? this.data.modif : target;
  }
}
