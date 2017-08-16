import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { Store } from '../store';

// feature modules
import { ReportsModule } from '../reports/reports.module';

// containers
import { AppComponent } from './containers/app/app.component';

// tokens
import { API_ROOT_TOKEN } from './tokens/api-root.token';

// routes
export const ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'viewer'}
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    ReportsModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    Store,
    { provide: API_ROOT_TOKEN, useValue: 'https://accounting.staging.mynd.ws/api/reporting/reporting'}
  ]
})
export class AppModule {}
