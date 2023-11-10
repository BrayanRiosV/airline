import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IState } from '../interfaces/interface';
import { AppStore } from '../store/state-store';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss']
})
export class BadgeComponent implements OnInit {

  appStore: AppStore = new AppStore();
  modalRef: any;

  constructor(private store: Store<IState>) {

   }

  ngOnInit(): void {
  }

  /**
  * @description Change badget on redux
  * @author Brayan Rios
  * @date 09/11/2023
  * @param {string} badge
  * @returns
  */
  changeBadge(badge: string){
    this.modalRef.close(badge);
  }

}
