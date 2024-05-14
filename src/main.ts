/// <reference types="@angular/localize" />

import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

//Import other modules
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/components/app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { RestService } from './app/common/lib/RestService';
import { environment } from './environments/environment';
import { AggregateService } from './app/components/aggregate/aggregate-service';
import { Employee } from './app/common/lib/Employee';
import { ErrorService } from './app/common/lib/ErrorService';
import { QueryService } from './app/components/aggregate/QueryService';

//Factory method for RestService
export function RestServiceFactory(http: HttpClient, restService: RestService) {
  return new RestService(http, environment.serviceUri);
}
//Factory method for QueryService
export function QueryServiceFactory(http: HttpClient, restService: QueryService) {
  return new QueryService(http, environment.serviceUri);
}

//Factory method for ErrorService
export function ErrorServiceFactory(elementId: string) {
  return new ErrorService("global-error-service");
}

//bootstrap this module
bootstrapApplication(
  AppComponent,
  {
    providers: [

      importProvidersFrom(HttpClientModule),
      provideRouter(routes),
      NgbActiveModal,
      { provide: RestService, useFactory: RestServiceFactory, deps: [HttpClient] },
      { provide: ErrorService, useFactory: ErrorServiceFactory },
      { provide: QueryService, useFactory: QueryServiceFactory, deps: [HttpClient] },
      AggregateService,
      AggregateService<Employee>
    ]
  },

)
  .catch((err) => console.error(err));
