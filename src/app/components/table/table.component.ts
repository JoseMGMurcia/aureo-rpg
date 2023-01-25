import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent{
  @Input() data = [];
  @Input() dataConfiguration: TableDataConfiguration;

  public getClass(row): string {
    const index = this.data.indexOf(row);
      return index % 2 === 0 ? 'pairRow' : 'oddRow';
  }

  public getFormatedData(data: string | number): string | number{
    return data && (!isNaN(Number(data)) || data ) ? data : '-';
  }
}

export class TableDataConfiguration {
  public columns: TableColumn[];
  public swHideHeader?: boolean = true;
}

export class TableColumn {
  public name: string;
  public id: string;
}

