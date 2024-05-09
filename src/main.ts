/// <reference types="@angular/localize" />

import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

//Import other modules
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/components/app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
//bootstrap this module
bootstrapApplication(
  AppComponent,
  {
    providers: [provideRouter(routes), NgbActiveModal]
  },

)
  .catch((err) => console.error(err));
