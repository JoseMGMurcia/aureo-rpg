import { Component, EventEmitter, Output} from '@angular/core';
import { FormControl, UntypedFormBuilder } from '@angular/forms';
import { AlertInput, AlertOptions, LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';
import { MAGIC_NUMBERS } from 'src/app/constants/number.constants';
import { CharacterController } from 'src/app/controller/characterController';
import { noSpecialCharactersValidator } from 'src/app/controller/custom.validator';
import { cloneFollowers  } from 'src/app/controller/follower-companion.controller';
import { Character } from 'src/app/model/character';
import { Follower } from 'src/app/model/follower';

import { CharactersService } from 'src/app/services/characters.service';
import { easyConfirmAlert, openAlert } from 'src/app/utils/alert.utils';

@Component({
  selector: 'app-edit-followers',
  templateUrl: './edit-followers.component.html',
  styleUrls: ['./edit-followers.component.scss'],
})
export class EditFollowersComponent{

  @Output() saveCharacter: EventEmitter<any> = new EventEmitter<any>();
  @Output() exitModal: EventEmitter<any> = new EventEmitter<any>();


  public character: Character = new Character('Pepe');
  public followers: Follower[] = [];
  public selectedFollower: Follower = new Follower('');
  public initialFollowers: Follower[] = [];
  public loading = MAGIC_NUMBERS.N_1;

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private translate: TranslateService,
    private charactersService: CharactersService,
    private loadingController: LoadingController,
    private formBuilder: UntypedFormBuilder,
  ) { }

  async ngOnInit() {
    const loading: HTMLIonLoadingElement = await this.loadingController.create({
      message: this.translate.instant('SHARED.LOADING')
    });
    await loading.present();

    this.charactersService.character
      .pipe(
        takeUntil(this.ngUnsubscribe))
      .subscribe((character)=> {
      this.character = character;
      this.finishLoading(loading);
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public handleChange(event: any){
    this.selectedFollower = this.followers.find(follower => follower.getName() === event.detail.value) || this.selectedFollower;
   }

  public removeItem(){
    const alertParams: AlertOptions = {
      header: this.translate.instant('EDIT.REMOVE_POWER'),
      inputs : this.followers.map((followe): AlertInput => ({
        type: 'radio',
        label: followe.getName(),
        value: followe.getName()
      })),
      buttons: [
        { text:  this.translate.instant('SHARED.CANCEL'), cssClass: 'alert-secondaryButton' },
        {
          text:  this.translate.instant('SHARED.DELETE'),
          cssClass: 'alert-primaryButton',
          handler:  (data: any) => {
            this.followers = this.followers.filter(follo => follo.getName() !== data);
            this.character.setFollowers(this.followers);
            if(this.selectedFollower.getName() === data){
              this.selectedFollower.setName('');
            }
    }}]};
    openAlert(alertParams);
  }

  public addItem(){
    // Add Power 1ST step: Choose cult
    const inputs: AlertInput[] = [{
      type: 'text',
      name: 'name',
      label: this.translate.instant('DETAIL_PAGE.BACKGROUND_SEC.NAME'),
      placeholder: this.translate.instant('DETAIL_PAGE.BACKGROUND_SEC.NAME'),
    },
    {
      type: 'text',
      name: 'arquetype',
      label: this.translate.instant('DETAIL_PAGE.BACKGROUND_SEC.FOLLOWERS.ARQUETYPE'),
      placeholder: this.translate.instant('DETAIL_PAGE.BACKGROUND_SEC.FOLLOWERS.ARQUETYPE'),
    }
  ];

   const alertParams: AlertOptions = {
     header: this.translate.instant('EDIT.ADD'),
     inputs : inputs,
     buttons: [
      { text:  this.translate.instant('SHARED.CANCEL'), cssClass: 'alert-secondaryButton' },
      {
        text:  this.translate.instant('SHARED.OK'),
        cssClass: 'alert-primaryButton',
        handler:  (data: any) => {
          if(this.followers.some(follo => follo.getName() === data.name) || !CharacterController.isNameValid(data.name)){
            easyConfirmAlert(this.translate.instant('CHAR_PAGE.ADD_ALERT.NO_VALID_NAME'), () => { return; }, this.translate);
            return;
          }
          const folloMan = new Follower(data.name);
          folloMan.setArquetype(data.arquetype);
          this.followers.push(folloMan);
       }}]};
       openAlert(alertParams);
 }

  public handleSave(){
    this.saveCharacter.emit();
  }

  public handleExit(){
    easyConfirmAlert(
      this.translate.instant('EDIT.MAIN_INFO.CHANGES_LOST'),
      () => {
        this.character.setFollowers(this.initialFollowers);
        this.fetch();
        this.exitModal.emit();
      },
      this.translate);
  }

  public removeCombat(){
    const target = this.selectedFollower.getCombat() - MAGIC_NUMBERS.N_1;
    this.selectedFollower.setCombat(target > -MAGIC_NUMBERS.N_11 ? target : this.selectedFollower.getCombat());
  }

  public addCombat(){
    const target = this.selectedFollower.getCombat() + MAGIC_NUMBERS.N_1;
    this.selectedFollower.setCombat(target < MAGIC_NUMBERS.N_11 ? target : this.selectedFollower.getCombat());
  }

  public removePhysical(){
    const target = this.selectedFollower.getPhysical() - MAGIC_NUMBERS.N_1;
    this.selectedFollower.setPhysical(target > -MAGIC_NUMBERS.N_11 ? target : this.selectedFollower.getPhysical());
  }

  public addPhysical(){
    const target = this.selectedFollower.getPhysical() + MAGIC_NUMBERS.N_1;
    this.selectedFollower.setPhysical(target < MAGIC_NUMBERS.N_11 ? target : this.selectedFollower.getPhysical());
  }

  public removeSpiritual(){
    const target = this.selectedFollower.getSpiritual() - MAGIC_NUMBERS.N_1;
    this.selectedFollower.setEspiritual(target > -MAGIC_NUMBERS.N_11 ? target : this.selectedFollower.getSpiritual());
  }

  public addSpiritual(){
    const target = this.selectedFollower.getSpiritual() + MAGIC_NUMBERS.N_1;
    this.selectedFollower.setEspiritual(target < MAGIC_NUMBERS.N_11 ? target : this.selectedFollower.getSpiritual());
  }

  public removeMental(){
    const target = this.selectedFollower.getMental() - MAGIC_NUMBERS.N_1;
    this.selectedFollower.setMental(target > -MAGIC_NUMBERS.N_11 ? target : this.selectedFollower.getMental());
  }

  public addMental(){
    const target = this.selectedFollower.getMental() + MAGIC_NUMBERS.N_1;
    this.selectedFollower.setMental(target < MAGIC_NUMBERS.N_11 ? target : this.selectedFollower.getMental());
  }

  public removeSocial(){
    const target = this.selectedFollower.getSocial() - MAGIC_NUMBERS.N_1;
    this.selectedFollower.setSocial(target > -MAGIC_NUMBERS.N_11 ? target : this.selectedFollower.getSocial());
  }

  public addSocial(){
    const target = this.selectedFollower.getSocial() + MAGIC_NUMBERS.N_1;
    this.selectedFollower.setSocial(target < MAGIC_NUMBERS.N_11 ? target : this.selectedFollower.getSocial());
  }

  public editFollowerTexts(){
    const inputs: AlertInput[] = [{
      type: 'text',
      name: 'name',
      label: this.translate.instant('DETAIL_PAGE.BACKGROUND_SEC.NAME'),
      placeholder: this.translate.instant('DETAIL_PAGE.BACKGROUND_SEC.NAME'),
      value: this.selectedFollower.getName(),
    },
    {
      type: 'text',
      name: 'arquetype',
      label: this.translate.instant('DETAIL_PAGE.BACKGROUND_SEC.FOLLOWERS.ARQUETYPE'),
      placeholder: this.translate.instant('DETAIL_PAGE.BACKGROUND_SEC.FOLLOWERS.ARQUETYPE'),
      value: this.selectedFollower.getArquetype(),
    }
  ];
    const alertParams: AlertOptions = {
      header: this.translate.instant('DETAIL_PAGE.BACKGROUND_SEC.FOLLOWERS.EDIT'),
      inputs : inputs,
      buttons: [
        { text:  this.translate.instant('SHARED.CANCEL'), cssClass: 'alert-secondaryButton' },
        {
          text:  this.translate.instant('SHARED.OK'),
          cssClass: 'alert-primaryButton',
          handler:  (data: any) => {
            this.selectedFollower.setArquetype(data.arquetype);
            this.selectedFollower.setName(data.name);
          }}]};
    openAlert(alertParams);
  }

  private fetch(){
    this.followers = this.character.getFollowers();
    this.initialFollowers= cloneFollowers(this.character.getFollowers());
}

  private finishLoading(loading: HTMLIonLoadingElement) {
    if(--this.loading === MAGIC_NUMBERS.N_0){
      this.fetch();
      loading.dismiss();
    }
  }
}
