/// <reference types="@angular/localize" />

//Import other modules
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/components/app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/services/app.routes';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ApplicationRef, DestroyRef, EnvironmentInjector, Injector, importProvidersFrom } from '@angular/core';
import { environment } from './environments/environment';
import { ErrorService } from './app/services/ErrorService';
import { QueryService } from './app/services/QueryService';
import { DOCUMENT } from '@angular/common';
import { ModalServiceFactory } from './app/components/modal/ModalServiceFactory';
import { RepositoryServiceFactory } from './app/services/RepositoryServiceFactory';

//Factory methods
export function getRepositoryServiceFactory(http: HttpClient) {
  return new RepositoryServiceFactory(http, environment.serviceUri);
}
export function QueryServiceFactory(http: HttpClient, restService: QueryService) {
  return new QueryService(http, environment.serviceUri);
}
export function ErrorServiceFactory(elementId: string) {
  return new ErrorService("global-error-service");
}
export function getModalServiceFactory(
  environmentInjector: EnvironmentInjector,
  contentInjector: Injector,
  applicationRef: ApplicationRef,
  document: Document,
  errorService: ErrorService,
  destroyRef: DestroyRef) {
  return new ModalServiceFactory(environmentInjector, contentInjector, applicationRef, document, errorService, destroyRef);
}

//bootstrap this module
bootstrapApplication(
  AppComponent,
  {
    providers: [

      importProvidersFrom(HttpClientModule),
      provideRouter(routes),
      { provide: RepositoryServiceFactory, useFactory: getRepositoryServiceFactory, deps: [HttpClient] },
      { provide: ErrorService, useFactory: ErrorServiceFactory },
      { provide: QueryService, useFactory: QueryServiceFactory, deps: [HttpClient] },
      { provide: ModalServiceFactory, useFactory: getModalServiceFactory, deps: [EnvironmentInjector, Injector, ApplicationRef, DOCUMENT, ErrorService, DestroyRef] },
    ]
  },

)
  .catch((err) => console.error(err));
