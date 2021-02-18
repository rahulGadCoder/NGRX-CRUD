import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-ag-grid',
  templateUrl: './ag-grid.component.html'
})
export class AgGridComponent implements OnInit {

  columnDefs = [
    { headerName: 'No', sortable: true, field: 'id', filter: true },
    { headerName: 'Name', sortable: true, field: 'name', filter: true },
    { headerName: 'Age', sortable: true, field: 'age', filter: true },
    { headerName: 'Profession', sortable: true, field: 'profession', filter: true },
    { headerName: 'Dob', sortable: true, field: 'dob', filter: true },

  ];

  defaultColDef = {
    sortable: true,
    filter: true
  };

  // rowData = [
  //   { make: 'Toyota', model: 'Celica', price: 35000 },
  //   { make: 'Ford', model: 'Mondeo', price: 32000 },
  //   { make: 'Porsche', model: 'Boxter', price: 72000 }
  // ];
  rowData: any = [];

  constructor(private service: SharedService) { }

  ngOnInit() {

    this.service.httpGetRequest().subscribe(response => {
      this.rowData = response;
      console.log("response", response);
    })
  }

  onRowClick(event){
    console.log("eventevent",event.data);
    
  }

}
