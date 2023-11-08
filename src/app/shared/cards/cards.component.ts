import { Component, Input, OnInit } from '@angular/core';
import { ICards } from '../interfaces/interface';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {

  @Input() cards: ICards[] | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
