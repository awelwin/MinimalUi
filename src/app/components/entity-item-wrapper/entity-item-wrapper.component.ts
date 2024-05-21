import { Component, DestroyRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IEntity } from '../../lib/IEntity';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DatePipe, NgClass } from '@angular/common';

@Component({
  selector: 'entity-item-wrapper',
  standalone: true,
  imports: [NgClass, DatePipe],
  templateUrl: './entity-item-wrapper.component.html',
  styleUrl: './entity-item-wrapper.component.scss'
})
export class EntityItemWrapperComponent implements OnInit {

  @Input()
  entity!: IEntity;

  @Input()
  menuOpened!: EventEmitter<number>;

  @Output()
  editClick = new EventEmitter<IEntity>();

  @Output()
  deleteClick = new EventEmitter<IEntity>()

  _menuIsOpen: boolean = false;
  _tooltip: string = "";

  constructor(private destroyRef: DestroyRef) { }

  ngOnInit() {

    //subscribe close menu
    this.menuOpened
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({ next: (id) => { if (id != this.entity.id) this._menuIsOpen = false; } });
  }

  toggleMenu() {
    //toggle and broadcast to parent
    if (this._menuIsOpen) { this._menuIsOpen = false; }
    else {
      this._menuIsOpen = true;
      this.menuOpened.emit(this.entity.id);
    }
  }

  edit() {
    this.editClick.emit(this.entity);
  }
  delete() {
    this.deleteClick.emit(this.entity);
  }

}


