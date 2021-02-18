import { DatePipe, getLocaleDateFormat } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';
import { ToastrService } from 'ngx-toastr';
import { dateFormatPipe } from 'src/app/shared/pipe/date.pipe';
import { Store, select } from '@ngrx/store';
import * as Actions from "../state/emp.actions";
import { Emp } from 'src/app/shared/model/emp.model';
import { Observable } from "rxjs";
import * as fromEmp from "../state/emp.reducer";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  @ViewChild('addclosebutton') addclosebutton;
  @ViewChild('updateclosebutton') updateclosebutton;
  @ViewChild('closebutton') closebutton;


  empList: any = [];
  search: any;
  addForm: FormGroup;
  finalData: any = {};
  submitted = false;
  EmpId: any;
  deleteEmpId: any;
  updateFlag: boolean = false;
  addFlag: boolean = false;
  selectedAll: any;
  modalClose: any;

  isDesc: boolean = false;
  column: string = 'CategoryName';

  isDelete: boolean = false;
  deleteIndex: any;

  emplist$: Observable<Emp[]>;

  constructor(private store: Store<fromEmp.AppState>, private service: SharedService, private formBuilder: FormBuilder, private router: Router,
    private toastr: ToastrService, public datepipe: DatePipe) { }

  ngOnInit() {

    this.store.dispatch(new Actions.LoadEmployee());
    this.emplist$ = this.store.pipe(select(fromEmp.getEmps));

    this.addForm = this.formBuilder.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      profession: ['', Validators.required],
      // dob: ['', Validators.required],
      // address: this.formBuilder.array([])
    });
    // this.getData();

  }

  address(): FormArray {
    return this.addForm.get('address') as FormArray;
  }

  newAddress(): FormGroup {
    return this.formBuilder.group({
      area: '',
      city: '',
      pin: ''
    })
  }

  addAddress() {
    this.address().push(this.newAddress());
  }

  removeAddress(i: any) {
    this.address().removeAt(i);
  }





  getData() {
    this.service.httpGetRequest().subscribe(response => {
      this.empList = response;
    })
  }

  onAddRowClick() {
    this.submitted = false;
    this.addForm.reset();
    this.addFlag = true;
  }


  onClickAdd() {
    this.submitted = true;
    if (this.addForm.invalid) {
      return;
    }
    this.finalData = {};
    this.finalData.name = this.addForm.controls['name'].value
    this.finalData.age = this.addForm.controls['age'].value
    this.finalData.profession = this.addForm.controls['profession'].value
    this.finalData.dob = "01.10.2020";
    this.finalData.selected = true;


    // const newEmp: Emp = {
    //   name: this.addForm.controls['name'].value,
    //   age: this.addForm.controls['age'].value,
    //   profession: this.addForm.controls['profession'].value,
    //   dob: "01.10.2020",
    //   selected: true
    // };

    this.store.dispatch(new Actions.CreateEmp(this.finalData));
    this.addclosebutton.nativeElement.click();

    // this.service.httpPostRequest(this.finalData).subscribe(response => {
    //   this.addclosebutton.nativeElement.click();
    //   this.toastr.success('Record Added Successfully..!');
    //   this.getData();
    // })
  }

  onClickUpdate() {
    this.submitted = true;
    if (this.addForm.invalid) {
      return;
    }
    this.finalData = {};
    this.finalData.name = this.addForm.controls['name'].value
    this.finalData.age = this.addForm.controls['age'].value
    this.finalData.profession = this.addForm.controls['profession'].value
    this.finalData.dob = "10.10.2020";
    this.finalData.selected = false;
    this.finalData.id = this.EmpId;

    this.store.dispatch(new Actions.UpdateEmp(this.finalData))
    this.updateclosebutton.nativeElement.click();


    // this.service.httpPutRequest(this.finalData, this.EmpId).subscribe(response => {
    //   this.updateclosebutton.nativeElement.click();
    //   this.toastr.success('Record Updated Successfully..!');
    //   this.getData();
    // })
  }

  onClickDeleteRow(id, index) {
    this.deleteEmpId = id;
    this.deleteIndex = index;

    if (this.deleteIndex !== -1) {
      this.empList.splice(this.deleteIndex, 1);
      this.closebutton.nativeElement.click();
      this.isDelete = true;
      this.toastr.success('Record Deleted Temporary..!');
    }
  }

  onDeleteClick() {

    this.store.dispatch(new Actions.DeleteEmp(this.deleteEmpId));
    this.closebutton.nativeElement.click();
    this.isDelete = true;
    
    // this.service.httpDeleteRequest(this.deleteEmpId).subscribe(response => {
    //   this.closebutton.nativeElement.click();
    //   this.toastr.success('Record Deleted Successfully..!');
    //   this.isDelete = true;
    //   this.getData();
    // })
  }

  onClickDeleteCancel() {
    this.isDelete = true;
    this.toastr.error('Record is Deleted..!');
  }


  get f() {
    return this.addForm.controls;
  }

  onRowClick(id) {
    this.submitted = false;
    this.addForm.reset();
    this.service.httpGetRequestBYId(id).subscribe(response => {
      this.addForm.controls['name'].setValue(response.name);
      this.addForm.controls['age'].setValue(response.age);
      this.addForm.controls['profession'].setValue(response.profession);
      // this.addForm.controls['dob'].setValue(response.dob);
      this.EmpId = id;
      this.updateFlag = true;
    })
  }


  selectAll() {
    this.selectedAll = !this.selectedAll;
    for (var i = 0; i < this.empList.length; i++) {
      this.empList[i].selected = this.selectedAll;
    }
  }

  checkIfAllSelected() {
    var totalSelected = 0;
    for (var i = 0; i < this.empList.length; i++) {
      if (this.empList[i].selected)
        totalSelected++;
    }
    this.selectedAll = totalSelected === this.empList.length;
    return true;
  }

  onRowClickEvent(event: any) {
    this.router.navigate(['/layout/empdetails', event.id]);
  }


  sort(property) {
    this.isDesc = !this.isDesc; //change the direction    
    this.column = property;
    let direction = this.isDesc ? 1 : -1;

    this.empList.sort(function (a, b) {
      if (a[property] < b[property]) {
        return -1 * direction;
      }
      else if (a[property] > b[property]) {
        return 1 * direction;
      }
      else {
        return 0;
      }
    });
  };


  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }

}




