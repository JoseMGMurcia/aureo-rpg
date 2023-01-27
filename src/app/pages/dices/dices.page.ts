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

  public data: any = {
    attribute: 5,
    skill: 3,
    modif: 0
  };

  constructor(private translate: TranslateService) {}

  public rollDice(data: any){
    const texts = this.translate.instant('DICES_PAGE.ALERT');
    const rndInt = Math.floor(Math.random() * 10) + 1 + data.attribute + data.skill + data.modif;

    const alerParams: AlertOptions = {
      header: texts.HEADER,
      message: `<p class="center bold">${this.translate.instant('DICES_PAGE.ALERT.TEXT', {
                  attribute: `${getSymbol(data.attribute)}${data.attribute}`,
                  skill: `${getSymbol(data.skill)}${data.skill}`,
                  modif: `${getSymbol(data.modif)}${data.modif}`
                  })}
                </p>
                <p class="center">${texts.RESULT}</p>
                <p class="dice-result center">${rndInt} </p>`,
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
