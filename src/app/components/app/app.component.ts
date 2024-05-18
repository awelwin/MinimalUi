import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { SideMenuComponent } from '../side-menu/side-menu.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, SideMenuComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'MinimalUi';
}
