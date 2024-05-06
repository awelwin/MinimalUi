import { Routes } from '@angular/router';
import { AggregateComponent } from './components/aggregate/aggregate.component';

export const routes: Routes = [
    { path: '', redirectTo: '/aggregate', pathMatch: 'full'},
    { path: 'aggregate', component: AggregateComponent, pathMatch: 'full'}
];
