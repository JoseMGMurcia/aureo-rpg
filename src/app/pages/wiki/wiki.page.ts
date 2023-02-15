import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { COMBAT_EQUIP_CATALOG } from 'src/app/constants/equip.constants';
import { IconTypes } from 'src/app/constants/icon.constants';
import { MAGIC_NUMBERS } from 'src/app/constants/number.constants';
import { getCombatEquipArray } from 'src/app/controller/combat.equip.controller';
import { getCultsPowers } from 'src/app/controller/power.controller';
import { CultsPowers, PowersData } from 'src/app/model/powerData';
import { CharactersService } from 'src/app/services/characters.service';
import { findMinMax } from 'src/app/utils/custom.utils';

@Component({
  selector: 'app-wiki',
  templateUrl: './wiki.page.html',
  styleUrls: ['./wiki.page.scss'],
})
export class WikiPage implements OnInit, OnDestroy {

  public giftData: any = {};
  public cults: CultsPowers = new CultsPowers();
  public swShowgifts = false;
  public swPowerData = false;
  public swCommonPhysical = false;
  public swCommonMental = false;
  public swCommonSupernaturals = false;
  public swCommonSocial = false;
  public swCursePhysical = false;
  public swCurseMental = false;
  public swCurseSupernaturals = false;
  public swCurseSocial = false;
  public swDivine = false;
  public swGifts = false;
  public swCurses = false;
  public swCombat = false;
  public swCombatEquip = false;
  public swPrays = false;
  public combatEquip = getCombatEquipArray();
  private loading = MAGIC_NUMBERS.N_0;

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private charactersService: CharactersService,
    private translate: TranslateService,
    private loadingController: LoadingController,
    ){}

  async ngOnInit() {
    this.loading = MAGIC_NUMBERS.N_2;
    const loading: HTMLIonLoadingElement = await this.loadingController.create({
      message: this.translate.instant('SHARED.LOADING')
    });
    await loading.present();

     this.charactersService.giftData
    .subscribe(data => {
      this.giftData = data;
      this.swShowgifts = true;
      this.finishLoading(loading);
    });

    this.charactersService.powersData
    .subscribe(data => {
      this.cults = getCultsPowers(data as PowersData, this.translate);
      this.swPowerData = true;
      this.finishLoading(loading);
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public getIcon(open: boolean): string{
    return open ? IconTypes.UP : IconTypes.DOWN
  }

  public getCostText(cost: number[]){
    const xp = this.translate.instant('SHARED.XP');
    if(cost.length === MAGIC_NUMBERS.N_1){
      return `${cost[0] > 0 ? '+' : ''}${cost}${xp}`;
    }else {
      const minMax = findMinMax(cost);
      return `${minMax.min}${xp} / ${minMax.max}${xp}`;
    }
  }

 private finishLoading(loading: HTMLIonLoadingElement) {
    if(--this.loading === MAGIC_NUMBERS.N_0 ){
      loading.dismiss();
    }
  }

}

