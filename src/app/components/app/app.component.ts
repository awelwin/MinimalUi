import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { SideMenuComponent } from '../side-menu/side-menu.component';
import { AggregateComponent } from '../aggregate/aggregate.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, SideMenuComponent, AggregateComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'MinimalUi';
}
