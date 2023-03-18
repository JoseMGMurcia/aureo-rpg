import { AlertOptions } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { Power } from "../model/power";
import { CultsPowers, PowerData, PowersData } from "../model/powerData";
import { openAlert } from "../utils/alert.utils";

export const getAfroditaPowers = (powers: PowersData): PowerData[] => {
  return powers.POWERS.filter((power: PowerData) => power.ID.indexOf("AF") > -1)
}

export const getApoloPowers = (powers: PowersData): PowerData[] => {
  return powers.POWERS.filter((power: PowerData) => power.ID.indexOf("AP") > -1)
}

export const getAresPowers = (powers: PowersData): PowerData[] => {
  return powers.POWERS.filter((power: PowerData) => power.ID.indexOf("ARE") > -1)
}

export const getArtemisaPowers = (powers: PowersData): PowerData[] => {
  return powers.POWERS.filter((power: PowerData) => power.ID.indexOf("ART") > -1)
}

export const getAteneaPowers = (powers: PowersData): PowerData[] => {
  return powers.POWERS.filter((power: PowerData) => power.ID.indexOf("ATE") > -1)
}

export const getDionisioPowers = (powers: PowersData): PowerData[] => {
  return powers.POWERS.filter((power: PowerData) => power.ID.indexOf("DIO") > -1)
}

export const getHadesPowers = (powers: PowersData): PowerData[] => {
  return powers.POWERS.filter((power: PowerData) => power.ID.indexOf("HAD") > -1)
}

export const getHefestoPowers = (powers: PowersData): PowerData[] => {
  return powers.POWERS.filter((power: PowerData) => power.ID.indexOf("HEF") > -1)
}

export const getHeraPowers = (powers: PowersData): PowerData[] => {
  return powers.POWERS.filter((power: PowerData) => power.ID.indexOf("HER") > -1)
}

export const getHermesPowers = (powers: PowersData): PowerData[] => {
  return powers.POWERS.filter((power: PowerData) => power.ID.indexOf("HRM") > -1)
}

export const getPoseidonPowers = (powers: PowersData): PowerData[] => {
  return powers.POWERS.filter((power: PowerData) => power.ID.indexOf("POS") > -1)
}

export const getZeusPowers = (powers: PowersData): PowerData[] => {
  return powers.POWERS.filter((power: PowerData) => power.ID.indexOf("ZEUS") > -1)
}

export const getCultsPowers = (powers: PowersData, translate: TranslateService): CultsPowers => {
  const cultsPowers: CultsPowers = new CultsPowers();
  const cults = translate.instant('WIKI_PAGE.CULTS');
  cultsPowers.cults.push({ cultName: cults.AFRODITA, powers: getAfroditaPowers(powers), show: false});
  cultsPowers.cults.push({ cultName: cults.APOLLO, powers: getApoloPowers(powers), show: false});
  cultsPowers.cults.push({ cultName: cults.ARES, powers: getAresPowers(powers), show: false});
  cultsPowers.cults.push({ cultName: cults.ARTEMISA, powers: getArtemisaPowers(powers), show: false});
  cultsPowers.cults.push({ cultName: cults.ATENEA, powers: getAteneaPowers(powers), show: false});
  cultsPowers.cults.push({ cultName: cults.DIONISIO, powers: getDionisioPowers(powers), show: false});
  cultsPowers.cults.push({ cultName: cults.HADES, powers: getHadesPowers(powers), show: false});
  cultsPowers.cults.push({ cultName: cults.HEFESTO, powers: getHefestoPowers(powers), show: false});
  cultsPowers.cults.push({ cultName: cults.HERA, powers: getHeraPowers(powers), show: false});
  cultsPowers.cults.push({ cultName: cults.HERMES, powers: getHermesPowers(powers), show: false});
  cultsPowers.cults.push({ cultName: cults.POSEIDON, powers: getPoseidonPowers(powers), show: false});
  cultsPowers.cults.push({ cultName: cults.ZEUS, powers: getZeusPowers(powers), show: false});
  return cultsPowers;
}

export const getPower = (powers: PowersData, powerId: string): PowerData => {
  const power = powers.POWERS.find((power: PowerData) => power.ID === powerId);
  return power ? power : new PowerData();
}

export const openPowerDetail = (row: any) => {
  const ae = row.ae ? `<p><b>${row.texts.ae}</b> ${row.ae}</p>` : '';
  const conditions = row.conditions ? `<p><b>${row.texts.cond}:</b> ${row.conditions}</p>` : '';
  const alertParams: AlertOptions = {
    header: `${row.name} (${row.cost}${row.texts.XP})`,
    message: `<p><b>${row.texts.am}:</b> ${row.am}</p>${ae}
              <p><b>${row.texts.af}:</b> ${row.af}</p>
              <p><b>${row.texts.afinity}:</b> ${row.afinity}</p>
              <p><b>${row.texts.duration}:</b> ${row.duration}</p>
              <p><b>${row.texts.desc}:</b> ${row.desc}</p>
              <p><b>${row.texts.rules}:</b> ${row.rules}</p>${conditions}`,
    buttons: [row.texts.acept]
  }

  openAlert(alertParams);
}

export const clonePowers = (powers: Power[]): Power[] =>
  powers.map(power => new Power(power.getName()) );
