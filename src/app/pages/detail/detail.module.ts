import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DetailPageRoutingModule } from './detail-routing.module';
import { DetailPage } from './detail.page';
import {  HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TableComponent } from 'src/app/components/table/table.component';
import { EditionModalComponent } from 'src/app/components/modal/edition-modal.component';
import { EditMainInfoComponent } from 'src/app/components/edition/edit-main-info/edit-main-info.component';
import { EditAtributesComponent } from 'src/app/components/edition/edit-atributes/edit-atributes.component';
import { EditPowersComponent } from 'src/app/components/edition/edit-powers/edit-powers.component';
import { EditSkillsComponent } from 'src/app/components/edition/edit-skills/edit-skills.component';
import { EditListComponent } from 'src/app/components/edition/edit-list/edit-list.component';
import { EditAfinitiesComponent } from 'src/app/components/edition/edit-afinities/edit-afinities.component';
import { EditGiftsComponent } from 'src/app/components/edition/edit-gifts/edit-gifts.component';
import { EditCombatComponent } from 'src/app/components/edition/edit-combat/edit-combat.component';
import { EditFollowersComponent } from 'src/app/components/edition/edit-followers/edit-followers.component';
import { EditCompanionsComponent } from 'src/app/components/edition/edit-companions/edit-companions.component';

export const createTranslateLoader = (http: HttpClient) =>
  new TranslateHttpLoader(http, './assets/i18n/', '.json');

const editComnponents = [
  EditListComponent,
  EditSkillsComponent,
  EditMainInfoComponent,
  EditAtributesComponent,
  EditPowersComponent,
  EditAfinitiesComponent,
  EditGiftsComponent,
  EditCombatComponent,
  EditFollowersComponent,
  EditCompanionsComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    DetailPageRoutingModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  declarations: [...editComnponents, DetailPage, TableComponent, EditionModalComponent]
})
export class DetailPageModule {}
