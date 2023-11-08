import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BadgeComponent } from '../badge/badge.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private modal: NgbModal) { }

  ngOnInit(): void {
  }


  /**
  * @description "Open the 'badge' component for currency selection.
  * @author Brayan Rios
  * @date 07/11/2023
  */
  openBadge(){
    try {
      const modalRef = this.modal.open(BadgeComponent, { backdrop: 'static', size: 'lg', centered: true });
  } catch (e) {
      console.log('Error: ' + e);
  }
  }

}
