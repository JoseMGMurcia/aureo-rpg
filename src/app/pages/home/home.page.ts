import { Component } from '@angular/core';
import { URL_AUREO } from 'src/app/constants/constants';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  handlerClickMore(){
    window.open(URL_AUREO, '_system');
  }

}
