import { MAGIC_NUMBERS } from '../constants/number.constants';
import { Modificator } from '../model/modificator';
import { TranslateService } from '@ngx-translate/core';

   export class ModificatorController {
    public static getModsString(mods: Modificator[]): string{
        let modsString = '';
        mods.forEach((mod)=> {
            let modString = '';
            if (mod.getValue() !== MAGIC_NUMBERS.N_0 ){
                modString = mod.getValue()> MAGIC_NUMBERS.N_0 ? '+'.concat(mod.getValue().toString()) : mod.getValue().toString();
                modsString = modsString.concat(' ', modString);
            }
        });
        return modsString ? modsString : '-';
    }
    public static getModDetails(mod: Modificator, translate: TranslateService): string{
      const partial = mod.isPartial() ? translate.instant('SHARED.PARCIAL') : '';
      return `${mod.getName()}, ${mod.getValue()}, ${partial}`
    }


   }


