import { Component } from '@angular/core';
import { alertController } from '@ionic/core';
import { TranslateService } from '@ngx-translate/core';

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
    const alerParams: any = {
      header: texts.HEADER,
      subHeader: this.translate.instant('DICES_PAGE.ALERT.TEXT', {
        attribute: data.attribute,
        skill: data.skill,
        modif: data.modif
      }),
      message: texts.RESULT.concat(rndInt.toString()),
      buttons: [texts.AGREE]
    };

    alertController.create(alerParams).then(res => {
      res.present();
    });
  }
}
