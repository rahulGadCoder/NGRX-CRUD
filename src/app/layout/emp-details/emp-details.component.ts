import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, startWith } from 'rxjs/operators';
import { SharedService } from 'src/app/shared/shared.service';
import { MenuItem } from 'primeng/components/common/menuitem';

import { Store, select } from '@ngrx/store';
import * as Actions from "../state/emp.actions";
import { Emp } from 'src/app/shared/model/emp.model';
import { Observable } from "rxjs";
import * as fromEmp from "../state/emp.reducer";


export interface State {
  name: string;
}

@Component({
  selector: 'app-emp-details',
  templateUrl: './emp-details.component.html',
  styleUrls: ['./emp-details.component.css']
})
export class EmpDetailsComponent implements OnInit {

  empId: any;
  empData: any = {};

  stateCtrl = new FormControl();
  filteredStates: Observable<State[]>;

  loginDetails: any;
  userId: any;

  states: State[] = [
    {
      name: 'India',
    },
    {
      name: 'Aus',
    },
    {
      name: 'UK',
    },
    {
      name: 'NewZeland',
    }
  ];

  items: MenuItem[];
  emp_Data$: Observable<Emp>;
  name: any;
  age: any;
  profession: any;

  customerForm: FormGroup;

  constructor(private route: ActivatedRoute, private service: SharedService,
    private store: Store<fromEmp.AppState>, private fb: FormBuilder) {

    this.filteredStates = this.stateCtrl.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this._filterStates(state) : this.states.slice())
      );
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.empId = params['id'];
      console.log("empId", this.empId);
    })

    this.customerForm = this.fb.group({
      name: ["", Validators.required],
      age: ["", Validators.required],
      profession: ["", Validators.required],
      id: null,
      dob: '',
      selected: ''
    })



    this.getEmpDetails();
    this.spiltBtnFunction()

  }


  spiltBtnFunction() {
    this.loginDetails = JSON.parse(localStorage.getItem('loginForm'));
    this.userId = this.loginDetails.usrName;

    if (this.userId == "Rahull") {
      this.items = [
        {
          label: 'Update', icon: 'pi pi-refresh', command: () => {
            this.update();
          }
        },
        {
          label: 'Delete', icon: 'pi pi-times', command: () => {
            this.delete();
          }
        },
        { label: 'Setup', icon: 'pi pi-cog', routerLink: ['/setup'] }
      ];
    } else {
      this.items = [];
    }
  }


  update() {
    alert("Update Alert");
  }

  save(event: string) {
    alert(event);

  }

  delete() {
    alert("Delete Alert");
  }



  private _filterStates(value: string) {
    const filterValue = value.toLowerCase();
    return this.states.filter(state => state.name.toLowerCase().indexOf(filterValue) === 0);
  }


  getEmpDetails() {
    this.empData = {};
    this.store.dispatch(new Actions.LoadCustomer(this.empId));
    this.emp_Data$ = this.store.select(fromEmp.getCurrentEmp);
    this.emp_Data$.subscribe(currentCustomer => {
      if (currentCustomer) {
        this.customerForm.patchValue({
          name: currentCustomer.name,
          age: currentCustomer.age,
          profession: currentCustomer.selected,
          dob: currentCustomer.dob,
          id: currentCustomer.id,
        });
      }

    })

    // this.service.httpGetRequestBYId(this.empId).subscribe(response => {
    //   this.empData = response;
    //   console.log("this.empData", this.empData);

    // })
  }

}
