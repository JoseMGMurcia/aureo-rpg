import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { IconTypes } from 'src/app/constants/icon.constants';
import { MAGIC_NUMBERS } from 'src/app/constants/number.constants';
import { CharactersService } from 'src/app/services/characters.service';
import { findMinMax } from 'src/app/utils/custom.utils';

@Component({
  selector: 'app-wiki',
  templateUrl: './wiki.page.html',
  styleUrls: ['./wiki.page.scss'],
})
export class WikiPage implements OnInit, OnDestroy {

  public giftData: any = {};
  public swShowgifts = false;
  public swCommonPhysical = false;
  public swCommonMental = false;
  public swCommonSupernaturals = false;
  public swCommonSocial = false;
  public swCursePhysical = false;
  public swCurseMental = false;
  public swCurseSupernaturals = false;
  public swCurseSocial = false;
  public swDivine = false;

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private charactersService: CharactersService,
    private translate: TranslateService,
    ){}

  ngOnInit(): void {
     this.charactersService.giftData
    .subscribe(data => {
      this.giftData = data;
      this.swShowgifts = true;
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
}

