import { Component, DestroyRef, EventEmitter } from '@angular/core';
import { Input } from '@angular/core';
import { Employee } from '../../lib/Employee';
import { CommonModule, DatePipe } from '@angular/common';
import { EntityItemWrapperComponent } from '../entity-item-wrapper/entity-item-wrapper.component';
import { ErrorService } from '../../services/ErrorService';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'entity',
  standalone: true,
  imports: [DatePipe, CommonModule, EntityItemWrapperComponent],
  templateUrl: './entity.component.html',
  styleUrl: './entity.component.scss'
})
export class EntityComponent {

  @Input()
  data!: Employee;

  _menuOpened: EventEmitter<number>;

  constructor(

    private errorService: ErrorService,
    private destroyRef: DestroyRef) {

    //subscribe menuOpen
    this._menuOpened = new EventEmitter<number>();
  }
}
