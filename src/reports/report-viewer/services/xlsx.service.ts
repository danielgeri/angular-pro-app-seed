import { Injectable } from '@angular/core';

import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

@Injectable()
export class XLSXService {
  exportTableToExcel(
    reportId : string,
    reportName: string,
    reportFilters: any,
    reportRunTime: string,
    type: string
  ) {
    const reportTable = document.getElementById(reportId); // eslint-disable-line angular/document-service
    const dataArray = this.__generateArray(reportTable, reportName, reportFilters, reportRunTime);

    /* original data */
    const data = dataArray[0];

    const workbook : any = {
      SheetNames: [],
      Sheets: {}
    };

    const worksheet = this.__sheetFromArrayOfArrays(data);

    /* add worksheet to workbook */
    workbook.SheetNames.push(reportName);
    workbook.Sheets[reportName] = worksheet;

    const generatedWorkbook = XLSX.write(workbook);
    const fileName = `${reportId}-${Number(new Date())}.${type}`;
    FileSaver.saveAs(new Blob([this.s2ab(generatedWorkbook)], {type: "application/octet-stream"}), fileName);
    return generatedWorkbook;
  }

  __generateArray(table: any, reportName: string, reportFilters: any , reportRunTime: string) {
    const out = [];
    const rows = table.getElementsByClassName('row');

    if (reportName) {
      out.push([reportName]);
    }

    for (let R = 0; R < rows.length; ++R) {
      const outRow = [];
      const row = rows[R];
      const columns = row.getElementsByClassName('column');
      for (let C = 0; C < columns.length; ++C) {
        const cell = columns[C];
        const indexClass = 'indent-';
        const indentIndex = cell.className.indexOf(indexClass);
        const indent = indentIndex === -1 ? null :
          Number(cell.className.slice(
            indentIndex + indexClass.length,
            indentIndex + indexClass.length + 1
          ));

        let cellValue = cell.innerText;
        if (cellValue !== "" && cellValue === +Number(cellValue)) {
          cellValue = +Number(cellValue);
        }

        // Handle Value
        outRow.push(cellValue === "" ? null : cellValue);

        // Handle indent
        if (indent) {
          for (let k = 0; k < indent; ++k) {
            outRow.unshift(null);
          }
        }
      }
      out.push(outRow);
    }

    if (reportFilters) {
      out.push([`Applied Filters: ${JSON.parse(reportFilters)}`]);
    }

    if (reportRunTime) {
      out.push([`Report created at ${reportRunTime}`]);
    }

    return [out];
  }

  __sheetFromArrayOfArrays(data: any) {
    const worksheet: any = {};
    const range = {s: {c: 10000000, r: 10000000}, e: {c: 0, r: 0}};
    for (let R = 0; R !== data.length; ++R) {
      for (let C = 0; C !== data[R].length; ++C) {
        if (range.s.r > R) {
          range.s.r = R;
        }
        if (range.s.c > C) {
          range.s.c = C;
        }
        if (range.e.r < R) {
          range.e.r = R;
        }
        if (range.e.c < C) {
          range.e.c = C;
        }
        const cell: any = {v: data[R][C]};
        if (cell.v === null) {
          continue;
        }
        const cellref = XLSX.utils.encode_cell({c: C, r: R});

        if (Number.isInteger(cell.v) || cell.v.includes('$') || cell.v.includes('-$') || cell.v.includes('($')) {
          cell.t = 'n';
          cell.v = this.__parseCurrency(cell.v);
          cell.z = '$#,##0.00;($#,##0.00)';
        } else if (typeof cell.v === 'boolean') {
          cell.t = 'b';
        } else if (cell.v instanceof Date) {
          cell.t = 'n';
          cell.z = XLSX.SSF._table[14];
          cell.v = this._dateNum(cell.v, false);
        }	else {
          cell.t = 's';
        }

        worksheet[cellref] = cell;
      }
    }
    if (range.s.c < 10000000) {
      worksheet['!ref'] = XLSX.utils.encode_range(range);
    }
    return worksheet;
  }

  s2ab(s: any) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i !== s.length; ++i) {
      view[i] = s.charCodeAt(i) & 0xFF;
    }
    return buf;
  }

  _dateNum(v: any, date1904: any) {
    if (date1904) {
      v += 1462;
    }
    const epoch = Date.parse(v);
    // return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
    return Date.now();
  }

  __parseCurrency(value: any) {
    if (value.includes('($')) {
      return Number(value.replace('($', '').replace(')', '').replace(/,/g, '')) * -1;
    }

    return Number(value.replace('$', '').replace(/,/g, ''));
  }
}