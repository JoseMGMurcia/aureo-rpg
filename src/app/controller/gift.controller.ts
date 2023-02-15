import { AlertOptions } from "@ionic/angular";
import { Gift } from "../model/gift";
import { GiftData, TextGift } from "../model/giftData";
import { openAlert } from "../utils/alert.utils";
import { MAGIC_NUMBERS } from "../constants/number.constants";
import { findMinMax } from "../utils/custom.utils";


export const cloneGifts = (giftArray: Gift[]): Gift[] => {
  return giftArray.map(gift => new Gift(gift.getName(), gift.getCost()));
};

export const getTextGift = (id: string, giftData: GiftData): TextGift => {
  const allTextGifts = [
    ...giftData.COMMON_GIFTS.PHYSICAL,
    ...giftData.COMMON_GIFTS.MENTAL,
    ...giftData.COMMON_GIFTS.SUPERNATURALS,
    ...giftData.COMMON_GIFTS.SOCIAL,
    ...giftData.CURSES.PHYSICAL,
    ...giftData.CURSES.MENTAL,
    ...giftData.CURSES.SUPERNATURALS,
    ...giftData.CURSES.SOCIAL,
    ...giftData.DIVINE_GIFTS,
  ];
  const index = allTextGifts.findIndex( giftDat => giftDat.ID === id);
  return allTextGifts[index];
}

export const openGiftDetail = (row: any) => {
  let costText = '';
  const xp = 'XP';
    if(row.detail.COST.length === MAGIC_NUMBERS.N_1){
      costText =  `${row.detail.COST[0] > 0 ? '+' : ''}${row.detail.COST}${xp}`;
    }else {
      const minMax = findMinMax(row.detail.COST);
      costText = `${minMax.min}${xp} / ${minMax.max}${xp}`;
    }

  const alertParams: AlertOptions = {
    header: row.name,
    message: `<p><b>${row.texts.cost}</b> ${costText}</p>
              <p><b>${row.texts.desc}</b> ${row.detail.DESCRIPTION}</p>
              <p><b>${row.texts.rules}</b> ${row.detail.RULES}</p>
              <p><b>${row.texts.cond}</b> ${row.detail.CONDITIONS}</p>`,
    buttons: [row.texts.acept]
  }

  openAlert(alertParams);
}
