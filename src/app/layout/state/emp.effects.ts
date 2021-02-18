import { Injectable } from '@angular/core';
import { injectInjector } from "@angular/core/src/render3/di";

import { Action } from "@ngrx/store"
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { map, mergeMap, catchError } from "rxjs/operators"

import { SharedService } from "../../shared/shared.service";
import * as empActions from "../state/emp.actions";
import { Emp } from "../../shared/model/emp.model";

@Injectable()

export class EmpEffects {

    constructor(private actions$: Actions, private service: SharedService) { }


    @Effect()
    loadEmps$: Observable<Action> = this.actions$.pipe(
        ofType<empActions.LoadEmployee>(
            empActions.EmpActionTypes.LOAD_EMP
        ),
        mergeMap((action: empActions.LoadEmployee) =>
            this.service.httpGetRequest().pipe(
                map(
                    (emp: Emp[]) =>
                        new empActions.LoadEmployeeSuccess(emp)
                ),
                catchError(err => of(new empActions.LoadEmployeeFail(err)))
            )
        )
    );


    // @Effect()
    // loadEmp$: Observable<Action> = this.actions$.pipe(
    //     ofType<empActions.LoadCustomer>(
    //         empActions.EmpActionTypes.LOAD_EMP
    //     ),
    //     mergeMap((action: empActions.LoadOneEmp) =>
    //         this.service.httpGetRequestBYId(action.payload).pipe(
    //             map(
    //                 (emp: Emp) =>
    //                     new empActions.LoadOneEmpSuccess(emp)
    //             ),
    //             catchError(err => of(new empActions.LoadOneEmpFail(err)))
    //         )
    //     )
    // );

    @Effect()
    loadCustomer$: Observable<Action> = this.actions$.pipe(
      ofType<empActions.LoadCustomer>(
        empActions.EmpActionTypes.LOAD_ONE_EMP
      ),
      mergeMap((action: empActions.LoadCustomer) =>
        this.service.httpGetRequestBYId(action.payload).pipe(
          map(
            (customer: Emp) =>
              new empActions.LoadCustomerSuccess(customer)
          ),
          catchError(err => of(new empActions.LoadCustomerFail(err)))
        )
      )
    );
  









    @Effect()
    createEmp$: Observable<Action> = this.actions$.pipe(
        ofType<empActions.CreateEmp>(
            empActions.EmpActionTypes.CREATE_EMP
        ),
        map((action: empActions.CreateEmp) => action.payload),
        mergeMap((emp: Emp) =>
            this.service.httpPostRequest(emp).pipe(
                map(
                    (newEmp: Emp) =>
                        new empActions.CreateEmpSuccess(newEmp)
                ),
                catchError(err => of(new empActions.CreateEmpFail(err)))
            )
        )
    );


    @Effect()
    updateEmp$: Observable<Action> = this.actions$.pipe(
        ofType<empActions.CreateEmp>(
            empActions.EmpActionTypes.UPDATE_EMP
        ),
        map((action: empActions.CreateEmp) => action.payload),
        mergeMap((emp: Emp) =>
            this.service.httpPutRequest(emp, emp.id).pipe(
                map(
                    (updateEmp: Emp) =>
                        new empActions.UpdateEmpSuccess({
                            id: updateEmp.id,
                            changes: updateEmp
                        })
                ),
                catchError(err => of(new empActions.UpdateEmpFail(err)))
            )
        )
    );

    @Effect()
    deleteEmp$: Observable<Action> = this.actions$.pipe(
        ofType<empActions.DeleteEmp>(
            empActions.EmpActionTypes.DELETE_EMP
        ),
        map((action: empActions.DeleteEmp) => action.payload),
        mergeMap((id: number) =>
            this.service.httpDeleteRequest(id).pipe(
                map(
                    (id: number) =>
                        new empActions.DeleteEmpSuccess(id)
                ),
                catchError(err => of(new empActions.DeleteEmpFail(err)))
            )
        )
    );




}

