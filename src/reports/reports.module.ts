import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const ROUTES: Routes = [
  { path: 'viewer', loadChildren: './report-viewer/report-viewer.module#ReportViewerModule' }
]

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES),
  ]
})
export class ReportsModule {}