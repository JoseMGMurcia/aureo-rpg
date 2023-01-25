import { alertController, AlertOptions } from '@ionic/core';
import { TranslateService } from '@ngx-translate/core';

export const openAlert = (alertParams: AlertOptions) =>{
  alertController.create(alertParams).then(res => {
    res.present();
  });
};

export const easyConfirmAlert =( warningText: string, fnOk: () => void, translate: TranslateService) => {

  const alerParams: AlertOptions = {
    header: translate.instant('SHARED.WARNING'),
    message: warningText ? warningText : '',
    backdropDismiss: false,
    buttons: [{
      text: translate.instant('SHARED.CANCEL'),
      cssClass: 'alert-secondaryButton'
    },
    {
      cssClass: 'alert-primaryButton',
      text: translate.instant('SHARED.OK'),
      handler: () => fnOk()
    }]
  };

  openAlert(alerParams);
};
