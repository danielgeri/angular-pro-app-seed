import { Component } from '@angular/core';

import { XLSXService } from '../../services/xlsx.service';

@Component({
  selector: 'report-actions',
  styleUrls: ['actions.component.scss'],
  templateUrl: 'actions.component.html'
})
export class ActionsComponent {
  constructor(private xlsxService: XLSXService) {
    
  }

  export() {
    this.xlsxService.exportTableToExcel('test', 'test', {}, 'fdsa', 'xlsx');
  }
}