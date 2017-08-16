import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';

import { ReportService } from '../../services/report.service';

@Component({
  selector: 'report-content',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['content.component.scss'],
  templateUrl: 'content.component.html'
})
export class ContentComponent implements OnInit {
  queryParams: Object;
  subscription: Subscription;
  report$: Observable<any>

  @Input()
  data: any;

  constructor(
    private route: ActivatedRoute,
    private reportService: ReportService
  ) {}

  ngOnInit() {
  }
}