import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { CardsComponent } from './cards/cards.component';
import { BadgeComponent } from './badge/badge.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    CardsComponent,
    BadgeComponent
  ],
  imports: [
    CommonModule,
    NgbModule
  ],
  exports: [
    NavbarComponent,
    CardsComponent,
    BadgeComponent
  ]
})
export class SharedModule { }
