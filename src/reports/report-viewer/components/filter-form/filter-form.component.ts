import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Store } from 'store';

import { ReportService } from '../../services/report.service';
import { Report } from '../../models/report.interface';

@Component({
  selector: 'report-filter-form',
  styleUrls: ['filter-form.scss'],
  templateUrl: 'filter-form.html'
})
export class FilterFormComponent {
  @Input()
  parent: FormGroup;

  @Input()
  reports: Report[]

  @Output()
  run = new EventEmitter<FormGroup>();

  constructor(private reportService: ReportService) {}

  runReport() {
    this.run.emit(this.parent);
  }
}