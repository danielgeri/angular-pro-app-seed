import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';

import { ReportService } from '../../services/report.service';
import { Store } from 'store';

import { Report } from '../../models/report.interface';

@Component({
  selector: 'report-viewer',
  styleUrls: ['report-viewer.component.scss'],
  templateUrl: 'report-viewer.component.html'
})
export class ReportViewerComponent implements OnInit {
  reports: Report[] = [
    {
      id: 'balanceSheet',
      title: 'Balance Sheet',
      endpoint: 'balance_sheet',
      filters: 'test'
    }
  ];

  filterForm = this.fb.group({
    reportSelector: this.fb.group({
      endpoint: ''
    }),
    filters: this.fb.group({
      entity_id: 'iut1kf160cfs9iua',
      property_id: '802s0n0crsf8k5sg',
      transaction_start_date: '2017-09-28',
      transaction_end_date: '2017-08-15'
    })
  });

  data$: Observable<any>;
  subscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private reportService: ReportService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(queryParams => {
      this.reportService.getReport(queryParams.endpoint, queryParams).subscribe(param => {
        this.data$ = param;
      })
    });
      
  }

  applyToURL(event: FormGroup) {
    this.router.navigate(['/viewer'], { queryParams: {
      ...event.get('reportSelector').value,
      ...event.get('filters').value
    }});
  }
}