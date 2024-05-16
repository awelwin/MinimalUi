import { Routes } from '@angular/router';
import { AggregateComponent } from '../components/aggregate/aggregate.component';
import { AboutComponent } from '../components/about/about.component';
export const routes: Routes = [
    { path: '', redirectTo: '/about', pathMatch: 'full' },
    { path: 'about', component: AboutComponent, pathMatch: 'full' },
    { path: 'aggregate', component: AggregateComponent, pathMatch: 'full' }
];
