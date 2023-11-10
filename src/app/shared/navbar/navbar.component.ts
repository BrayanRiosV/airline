import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BadgeComponent } from '../badge/badge.component';
import { AppStore } from '../store/state-store';
import { Store } from '@ngrx/store';
import { IState } from '../interfaces/interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  appStore: AppStore = new AppStore();

  constructor(
    private modal: NgbModal,
    private store: Store<IState>
    ) { }

  ngOnInit(): void {
    this.store.dispatch(this.appStore.getBadges());
  }


  /**
  * @description "Open the 'badge' component for currency selection.
  * @author Brayan Rios
  * @date 07/11/2023
  */
  openBadge(){
    try {
      const modalRef = this.modal.open(BadgeComponent, { backdrop: 'static', size: 'lg', centered: true });
      modalRef.result.then((result)=> {
        this.store.dispatch(this.appStore.setBadge({ badge: result}));
      });
      modalRef.componentInstance.modalRef = modalRef;
  } catch (e) {
      console.log('Error: ' + e);
  }
  }

}
