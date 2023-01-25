import { MAGIC_NUMBERS } from '../constants/number.constants';
import { Modificator } from '../model/modificator';

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
   }
