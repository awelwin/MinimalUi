import { Component, Input } from '@angular/core';

@Component({
  selector: 'modal-wrapper',
  standalone: true,
  imports: [],
  styleUrl: "./modal-wrapper.component.scss",
  template: `<div id="GLOBAL_MODAL_ELEMENT_ID" class="modal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        
          <div class="text-end p-1">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
        
        <div id="GLOBAL_MODAL_BODY_ELEMENT_ID" class="modal-body">
         <!-- 

              DYNAMIC CONTENT RENDERED HERE HERE <----
          
             -->
        </div>
      </div>
    </div>
  </div>
  `
})
export class ModalWrapperComponent {
  ngOnInit() { }

}