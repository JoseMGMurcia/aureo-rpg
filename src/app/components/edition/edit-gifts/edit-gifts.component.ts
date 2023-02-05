import { Component, EventEmitter, Input, Output} from '@angular/core';
import { Character } from 'src/app/model/character';
import { CharactersService } from 'src/app/services/characters.service';
import { TranslateService } from '@ngx-translate/core';
import { easyConfirmAlert, openAlert } from 'src/app/utils/alert.utils';
import { Subject, takeUntil } from 'rxjs';
import { Gift } from 'src/app/model/gift';
import { GiftData, TextGift } from 'src/app/model/giftData';
import { TableDataConfiguration } from '../../table/table.component';
import { getGiftsDataConfiguration } from 'src/app/pages/detail/detail.page.configuration.helper';
import { getGiftData } from 'src/app/pages/detail/detail.page.data.helper';
import { MAGIC_NUMBERS } from 'src/app/constants/number.constants';
import { AlertInput, AlertOptions, LoadingController } from '@ionic/angular';
import { FormControl } from '@angular/forms';
import { noSpecialCharactersValidator } from 'src/app/controller/custom.validator';
import { cloneGifts, getTextGift, openGiftDetail } from 'src/app/controller/gift.controller';
import { GiftSubType, GiftSubTypesEnum, GiftType, GiftTypesEnum } from 'src/app/constants/constants';

@Component({
  selector: 'app-edit-gifts',
  templateUrl: './edit-gifts.component.html',
  styleUrls: ['./edit-gifts.component.scss'],
})
export class EditGiftsComponent{

  @Input() gifts: Gift[] = [];
  @Input() title = '';
  @Input() giftType: GiftType = GiftTypesEnum.COMMON_GIFTS;
  @Output() saveCharacter: EventEmitter<any> = new EventEmitter<any>();
  @Output() exitModal: EventEmitter<any> = new EventEmitter<any>();


  public tabledata: any[] =[];
  public tableConfiguration: TableDataConfiguration = getGiftsDataConfiguration(this.translate, this.showGiftDetail);
  public character: Character = new Character('Pepe');
  public giftData: GiftData = new GiftData();
  public loading = MAGIC_NUMBERS.N_2;
  public initialGifts: Gift[] = [];

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private translate: TranslateService,
    private charactersService: CharactersService,
    private loadingController: LoadingController,
  ) {}

  async ngOnInit() {
    const loading: HTMLIonLoadingElement = await this.loadingController.create({
      message: this.translate.instant('SHARED.LOADING')
    });
    await loading.present();

    this.charactersService.character
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((character)=> {
      this.character = character;
      this.finishLoading(loading);
    });

    this.charactersService.giftData
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data)=> {
        this.giftData = data;
        this.finishLoading(loading);
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public handleSave(){
    this.saveCharacter.emit();
  }

  public removeItem(){
    const alertParams: AlertOptions = {
      header: this.translate.instant('EDIT.REMOVE_SKILL_TITLE'),
      inputs : this.gifts.map((item): AlertInput=> ({
        type: 'radio',
        label: getTextGift(item.getName(), this.giftData).NAME,
        value: item.getName()
      })),
      buttons: [
        { text:  this.translate.instant('SHARED.CANCEL'), cssClass: 'alert-secondaryButton' },
        {
          text:  this.translate.instant('SHARED.DELETE'),
          cssClass: 'alert-primaryButton',
          handler:  (data: any) => {
            this.gifts = this.gifts.filter(gift => gift.getName() !== data);
            this.saveCharacterGifts( this.gifts);
            if(this.giftType === GiftTypesEnum.COMMON_GIFTS){
              this.tabledata = getGiftData( this.character.getCommonGifts(),
                [...this.giftData.COMMON_GIFTS.SOCIAL, ...this.giftData.COMMON_GIFTS.PHYSICAL, ...this.giftData.COMMON_GIFTS.MENTAL, ...this.giftData.COMMON_GIFTS.SUPERNATURALS], this.translate);
            }else if(this.giftType === GiftTypesEnum.CURSES){
              this.tabledata = getGiftData( this.character.getCurses(),
                [...this.giftData.CURSES.SOCIAL, ...this.giftData.CURSES.PHYSICAL, ...this.giftData.CURSES.MENTAL, ...this.giftData.CURSES.SUPERNATURALS], this.translate);
            }else if(this.giftType === GiftTypesEnum.DIVINE_GIFTS){
              this.tabledata = getGiftData( this.character.getDivineGifts(), this.giftData.DIVINE_GIFTS, this.translate);
            }
    }}]};
    openAlert(alertParams);
  }

  public handleExit(){
    easyConfirmAlert(
      this.translate.instant('EDIT.MAIN_INFO.CHANGES_LOST'),
      () => {
        this.saveCharacterGifts(this.initialGifts);
        this.fetch();
        this.exitModal.emit();
      },
      this.translate);
  }

  public addItem(){
    // Add gift 1ST step: Choose Subtype
    const giftTypes = this.translate.instant('WIKI_PAGE.GIFTS_TYPES');
    if(this.giftType === GiftTypesEnum.COMMON_GIFTS  || this.giftType === GiftTypesEnum.CURSES){
      const alertParams: AlertOptions = {
          header: `${ this.translate.instant('DETAIL_PAGE.COMBAT_SEC.TYPE')}:`,
          inputs : [
            { type: 'radio', label: giftTypes.PHYSICAL, value: GiftSubTypesEnum.PHYSICAL },
            { type: 'radio', label: giftTypes.MENTAL, value: GiftSubTypesEnum.MENTAL },
            { type: 'radio', label: giftTypes.SUPERNATURAL, value: GiftSubTypesEnum.SUPERNATURAL },
            { type: 'radio', label: giftTypes.SOCIAL, value: GiftSubTypesEnum.SOCIAL },
        ],
          buttons: [
            { text:  this.translate.instant('SHARED.CANCEL'), cssClass: 'alert-secondaryButton' },
            {
              text:  this.translate.instant('SHARED.OK'),
              cssClass: 'alert-primaryButton',
              handler:  (data: GiftSubType) => {
                const select = {
                  [GiftTypesEnum.COMMON_GIFTS]: {
                    [GiftSubTypesEnum.PHYSICAL]: this.giftData.COMMON_GIFTS.PHYSICAL,
                    [GiftSubTypesEnum.MENTAL]: this.giftData.COMMON_GIFTS.MENTAL,
                    [GiftSubTypesEnum.SUPERNATURAL]: this.giftData.COMMON_GIFTS.SUPERNATURALS,
                    [GiftSubTypesEnum.SOCIAL]: this.giftData.COMMON_GIFTS.SOCIAL,
                  },
                  [GiftTypesEnum.CURSES]: {
                    [GiftSubTypesEnum.PHYSICAL]: this.giftData.CURSES.PHYSICAL,
                    [GiftSubTypesEnum.MENTAL]: this.giftData.CURSES.MENTAL,
                    [GiftSubTypesEnum.SUPERNATURAL]: this.giftData.CURSES.SUPERNATURALS,
                    [GiftSubTypesEnum.SOCIAL]: this.giftData.CURSES.SOCIAL,
                  },
                  [GiftTypesEnum.DIVINE_GIFTS]: {
                    [GiftSubTypesEnum.PHYSICAL]: this.giftData.DIVINE_GIFTS,
                    [GiftSubTypesEnum.MENTAL]: this.giftData.DIVINE_GIFTS,
                    [GiftSubTypesEnum.SUPERNATURAL]: this.giftData.DIVINE_GIFTS,
                    [GiftSubTypesEnum.SOCIAL]: this.giftData.DIVINE_GIFTS,
                  }
                };
                this.addStep2(select[this.giftType][data]);
            }}]};
            openAlert(alertParams);

    }else if(this.giftType === GiftTypesEnum.DIVINE_GIFTS){
      this.addStep2(this.giftData.DIVINE_GIFTS);
    }
  }

  private addStep2(textGifts: TextGift[]){
    // Add gift 2ND step: Choose Gift
    const inputs: AlertInput[] = textGifts.map((textGift: TextGift) => (
      {type: 'radio', label: textGift.NAME, value: textGift.ID}
    ));
    const alertParams: AlertOptions = {
      header: this.translate.instant('EDIT.ADD'),
      inputs : inputs,
      buttons: [
        { text:  this.translate.instant('SHARED.CANCEL'), cssClass: 'alert-secondaryButton' },
        {
          text:  this.translate.instant('SHARED.OK'),
          cssClass: 'alert-primaryButton',
          handler:  (giftId: string) => {
            this.addStep3(giftId);
        }}]};
        openAlert(alertParams);
  }

  private addStep3(giftId: string){
    // Add gift 3RD step: Choose Cost
    const gift = getTextGift(giftId, this.giftData);
    if (gift.COST.length > MAGIC_NUMBERS.N_1){
      const inputs: AlertInput[] = gift.COST.map(cost => (
        {type: 'radio', label: cost.toString(), value: cost.toString()}
      ));
      const alertParams: AlertOptions = {
        header: this.translate.instant('WIKI_PAGE.COST'),
        inputs : inputs,
        buttons: [
          { text:  this.translate.instant('SHARED.CANCEL'), cssClass: 'alert-secondaryButton' },
          {
            text:  this.translate.instant('SHARED.OK'),
            cssClass: 'alert-primaryButton',
            handler:  (cost: string) => {
              this.addStep4(giftId, Number(cost));
          }}]};
          openAlert(alertParams);
    }else{
      this.addStep4(giftId, gift.COST[MAGIC_NUMBERS.N_0]);
    }
  }

  private addStep4(giftId: string, cost: number){
    // Add gift 4TH step: Save
    this.gifts.push(new Gift(giftId, cost));
    if(this.giftType === GiftTypesEnum.COMMON_GIFTS){
      this.tabledata = getGiftData( this.gifts,
        [...this.giftData.COMMON_GIFTS.SOCIAL, ...this.giftData.COMMON_GIFTS.PHYSICAL, ...this.giftData.COMMON_GIFTS.MENTAL, ...this.giftData.COMMON_GIFTS.SUPERNATURALS], this.translate);
    }else if(this.giftType === GiftTypesEnum.CURSES){
      this.tabledata = getGiftData( this.gifts,
        [...this.giftData.CURSES.SOCIAL, ...this.giftData.CURSES.PHYSICAL, ...this.giftData.CURSES.MENTAL, ...this.giftData.CURSES.SUPERNATURALS], this.translate);
    }else if(this.giftType === GiftTypesEnum.DIVINE_GIFTS){
      this.tabledata = getGiftData( this.gifts, this.giftData.DIVINE_GIFTS, this.translate);
    }
  }

  private saveCharacterGifts(gifs : Gift[]){
    if(this.giftType === GiftTypesEnum.COMMON_GIFTS){
      this.character.setCommonGifts(gifs);
    }else if(this.giftType === GiftTypesEnum.CURSES){
      this.character.setCurses(gifs);
    }else if(this.giftType === GiftTypesEnum.DIVINE_GIFTS){
      this.character.setDivineGifts(gifs);
    }
  }

  private fetch(){
    if(this.giftType === GiftTypesEnum.COMMON_GIFTS){
      this.gifts = this.character.getCommonGifts();
      this.tabledata = getGiftData( this.character.getCommonGifts(),
        [...this.giftData.COMMON_GIFTS.SOCIAL, ...this.giftData.COMMON_GIFTS.PHYSICAL, ...this.giftData.COMMON_GIFTS.MENTAL, ...this.giftData.COMMON_GIFTS.SUPERNATURALS], this.translate);
    }else if(this.giftType === GiftTypesEnum.CURSES){
      this.gifts = this.character.getCurses();
      this.tabledata = getGiftData( this.character.getCurses(),
        [...this.giftData.CURSES.SOCIAL, ...this.giftData.CURSES.PHYSICAL, ...this.giftData.CURSES.MENTAL, ...this.giftData.CURSES.SUPERNATURALS], this.translate);
    }else if(this.giftType === GiftTypesEnum.DIVINE_GIFTS){
      this.gifts = this.character.getDivineGifts();
      this.tabledata = getGiftData( this.character.getDivineGifts(), this.giftData.DIVINE_GIFTS, this.translate);
    }
    this.initialGifts= cloneGifts(this.gifts);

  }

  private finishLoading(loading: HTMLIonLoadingElement) {
    if(--this.loading === MAGIC_NUMBERS.N_0){
      this.fetch();
      loading.dismiss();
    }
  }

  private async showGiftDetail(row: any){
    await openGiftDetail(row);
  }
}
