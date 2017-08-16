import { Injectable, Inject } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';

import { Store } from 'store';

import { API_ROOT_TOKEN } from '../../../app/tokens/api-root.token';

import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

@Injectable()
export class ReportService {
  constructor(
    private http: Http,
    private store: Store,
    @Inject(API_ROOT_TOKEN) private apiRoot: string
  ) {}

  getReport(endpoint: string, body: Object) {
    if (!endpoint) return Observable.of([]);

    const options = new RequestOptions({ withCredentials: true });

    return this.http
      .post(`${this.apiRoot}/${endpoint}`, body, options)
      .map(res => {
        console.log(res.json());
        return res.json();
      });
  }
}