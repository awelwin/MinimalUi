import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { SideMenuComponent } from '../side-menu/side-menu.component';
import { EntityComponent } from '../entity/entity.component';
import { EntitySummaryComponent } from '../entity-summary/entity-summary.component';
import { AggregateComponent } from '../aggregate/aggregate.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, SideMenuComponent, EntityComponent, EntitySummaryComponent, AggregateComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'MinimalUi';
}
