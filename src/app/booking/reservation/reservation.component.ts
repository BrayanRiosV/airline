import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ICards, IPathGet, IState } from 'src/app/shared/interfaces/interface';
import { AppStore } from 'src/app/shared/store/state-store';
import { environmentDev } from 'src/environments/environment-dev';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {

  cards: ICards[];
  regularForm: FormGroup;
  sameValue = false;
  url: IPathGet = {
    url: ''
  };
  appStore: AppStore = new AppStore();

  constructor(private store: Store<IState>,
    private router: Router
  ) {
    this.regularForm = new FormGroup(
      {
        origin: new FormControl('', [Validators.required, Validators.maxLength(3)]),
        destination: new FormControl('', [Validators.required, Validators.maxLength(3)]),
        limit: new FormControl(0),
      }, { updateOn: 'change' }
    );
    this.cards = [
      {
        icon: 'fa fa-plane',
        title: 'Flota Moderna',
        text: 'Contamos con una flota de 100 aviones de última generación, equipados con tecnología avanzada para ofrecerte un viaje suave y placentero.'
      },
      {
        icon: 'fa fa-leaf',
        title: 'Compromiso Ambiental',
        text: 'Estamos comprometidos con el medio ambiente. Utilizamos aviones ecoeficientes y hemos implementado programas de reciclaje a bordo para reducir nuestra huella ecológica.'
      },
      {
        icon: 'fa fa-star',
        title: 'Programas de Fidelidad',
        text: 'Únete a nuestro programa de fidelidad y acumula millas en cada vuelo. Disfruta de beneficios exclusivos, como upgrades gratuitos, acceso a salas VIP y ofertas especiales para nuestros miembros más leales.'
      },
      {
        icon: 'fa fa-mobile',
        title: 'Innovaciones Tecnológicas',
        text: 'Haz el check-in desde la comodidad de tu hogar con nuestra aplicación móvil intuitiva. Además, disfruta de Wi-Fi gratuito a bordo para estar siempre conectado durante tus viajes.'
      }
    ];
  }

  ngOnInit(): void {

  }


  /**
  * @description Ensure that both fields do not have identical data.
  * @author Brayan Rios
  * @date 06/11/2023
  */
  originDestinationValidator() {
    try {
      const origin = this.regularForm?.controls?.['origin']?.value;
      const destination = this.regularForm?.controls?.['destination']?.value;

      if (origin === destination) {
        this.sameValue = true;
      } else {
        this.sameValue = false;
      }
    } catch (error) {
      console.log(error);
      this.sameValue = false;
    }
  }

  get origin() {
    return this.regularForm.get('origin');
  }

  get destination() {
    return this.regularForm.get('destination');
  }

  /**
  * @description Request to Api
  * @author Brayan Rios
  * @date 09/11/2023
  */
  getJourney() {
    try {
      this.url.url = environmentDev.getJourneys;

      let origin = this.regularForm.controls['origin'].value;
      let destination = this.regularForm.controls['destination'].value;
      let limit = this.regularForm.controls['limit'].value;

      this.url.url = this.url.url.replace('valueOrigin', origin);
      this.url.url = this.url.url.replace('valueDestination', destination);
      this.url.url = this.url.url.replace('valueLimit', limit);

      this.store.dispatch(this.appStore.getJourneys(this.url));

      this.router.navigate(
        ['flys'],
        {
          skipLocationChange: true,
        }
      ).catch();
    } catch (error) {
      console.log(error);
    }
  }

  upperValidatorDestination(){
    const destinationControl = this.regularForm.get('destination');

    if (destinationControl?.value) {
      destinationControl.setValue(destinationControl.value.toUpperCase(), { emitEvent: false });
    }
  }

  upperValidatorOrigin(){
    const originControl = this.regularForm.get('origin');

    if (originControl?.value) {
      originControl.setValue(originControl.value.toUpperCase(), { emitEvent: false });
    }
  }
}
