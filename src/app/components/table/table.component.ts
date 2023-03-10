import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent{
  @Input() data: any[] = [];
  @Input() dataConfiguration: TableDataConfiguration = {columns: []};

  public getClass(row: any): string {
    const index = this.data.indexOf(row);
      return index % 2 === 0 ? 'pairRow' : 'oddRow';
  }

  public getFormatedData(data: string | number): string | number{
    return data && (!isNaN(Number(data)) || data ) ? data : '-';
  }
}

export class TableDataConfiguration {
  public columns: TableColumn[] = [];
  public swHideHeader?: boolean = true;
  public onClickRow?: (row: any) => void;
}

export class TableColumn {
  public name = '';
  public id = '';
  public templatedId? : boolean = false;
}

export const getListConfiguration = (): TableDataConfiguration =>({
  swHideHeader: true,
  columns: [{
    id: 'name',
    name: ''
  }]});

