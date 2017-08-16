import { Component, Input } from '@angular/core';

@Component({
  selector: 'm-button',
  styleUrls: ['button.component.scss'],
  templateUrl: 'button.component.html'
})
export class ButtonComponent {
  @Input()
  color: string;
  
  @Input()
  hasMinWidth: boolean = true;
}