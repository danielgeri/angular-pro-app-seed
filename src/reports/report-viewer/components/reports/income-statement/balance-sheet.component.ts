import { Component, Input } from '@angular/core';

@Component({
  selector: 'balance-sheet-report',
  styleUrls: ['balance-sheet.component.scss'],
  templateUrl: 'balance-sheet.component.html'
})
export class BalanceSheetComponent {
  @Input()
  data: any;
}