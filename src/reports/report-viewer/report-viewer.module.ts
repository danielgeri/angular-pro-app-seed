import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

// components - general
import { ActionsComponent } from './components/actions/actions.component';
import { ContentComponent } from './components/content/content.component';
import { FilterFormComponent } from './components/filter-form/filter-form.component';
import { ReportComponent } from './components/report/report.component';
import { ReportTitleComponent } from './components/report-title/report-title.component';

// components - specific reports
import { BalanceSheetComponent } from './components/reports/balance-sheet/balance-sheet.component';

// containers
import { ReportViewerComponent } from './containers/report-viewer/report-viewer.component';

// services
import { ReportService } from './services/report.service';
import { XLSXService } from './services/xlsx.service';

export const ROUTES: Routes = [
  { path: '', component: ReportViewerComponent }
]

@NgModule({
  imports: [
    HttpModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES),
    SharedModule.forRoot()
  ],
  declarations: [
    ActionsComponent,
    ContentComponent,
    FilterFormComponent,
    ReportComponent,
    ReportViewerComponent,
    ReportTitleComponent,

    // specific reports
    BalanceSheetComponent
  ],
  providers: [
    XLSXService,
    ReportService
  ]
})
export class ReportViewerModule {}