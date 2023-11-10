import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IState } from './shared/interfaces/interface';
import { AppStore } from './shared/store/state-store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'flyr';

  appStore: AppStore = new AppStore();

  constructor(private store: Store<IState>) {
  }

  ngOnInit(): void {
    this.store.dispatch(this.appStore.loadState());
  }
}
