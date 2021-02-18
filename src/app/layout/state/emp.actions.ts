import { Update } from '@ngrx/entity';
import { Action } from "@ngrx/store";
import { Emp } from "../../shared/model/emp.model";


export enum EmpActionTypes {
    LOAD_EMP = "[Emp] Load Employee",
    LOAD_EMP_SUCCESS = "[Emp] Load Employee Success",
    LOAD_EMP_FAIL = "[Emp] Load Employee Fail",

    // LOAD_ONE_EMP = "[Emp] Load One Employee",
    // LOAD_ONE_EMP_SUCCESS = "[Emp] Load One Employee Success",
    // LOAD_ONE_EMP_FAIL = "[Emp] Load One Employee Fail",

    LOAD_ONE_EMP = "[Emp] Load One Employee",
    LOAD_ONE_EMP_SUCCESS = "[Emp] Load One Employee Success",
    LOAD_ONE_EMP_FAIL = "[Emp] Load One Employee Fail",



    CREATE_EMP = "[Emp] Create Employee",
    CREATE_EMP_SUCCESS = "[Emp] Create Employee Success",
    CREATE_EMP_FAIL = "[Emp] Create Employee Fail",

    UPDATE_EMP = "[Emp] Update Employee",
    UPDATE_EMP_SUCCESS = "[Emp] Update Employee Success",
    UPDATE_EMP_FAIL = "[Emp] Update Employee Fail",

    DELETE_EMP = "[Emp] Delete Employee",
    DELETE_EMP_SUCCESS = "[Emp] Delete Employee Success",
    DELETE_EMP_FAIL = "[Emp] Delete Employee Fail",
    LOAD_EMP_ONE_FAIL = "LOAD_EMP_ONE_FAIL"
}

export class LoadEmployee implements Action {
    readonly type = EmpActionTypes.LOAD_EMP;
}

export class LoadEmployeeSuccess implements Action {
    readonly type = EmpActionTypes.LOAD_EMP_SUCCESS;
    constructor(public payload: Emp[]) { }
}

export class LoadEmployeeFail implements Action {
    readonly type = EmpActionTypes.LOAD_EMP_FAIL;
    constructor(public payload: string) { }
}

export class LoadCustomer implements Action {
    readonly type = EmpActionTypes.LOAD_ONE_EMP;
    constructor(public payload: number) {}
  }
  
  export class LoadCustomerSuccess implements Action {
    readonly type = EmpActionTypes.LOAD_ONE_EMP_SUCCESS;
  
    constructor(public payload: Emp) {}
  }
  
  export class LoadCustomerFail implements Action {
    readonly type = EmpActionTypes.LOAD_ONE_EMP_FAIL;
    constructor(public payload: string) {}
  }


export class CreateEmp implements Action {
    readonly type = EmpActionTypes.CREATE_EMP;

    constructor(public payload: Emp) { }
}

export class CreateEmpSuccess implements Action {
    readonly type = EmpActionTypes.CREATE_EMP_SUCCESS;

    constructor(public payload: Emp) { }
}

export class CreateEmpFail implements Action {
    readonly type = EmpActionTypes.CREATE_EMP_FAIL;
    constructor(public payload: string) { }
}



export class UpdateEmp implements Action {
    readonly type = EmpActionTypes.UPDATE_EMP;

    constructor(public payload: Emp) { }
}

export class UpdateEmpSuccess implements Action {
    readonly type = EmpActionTypes.UPDATE_EMP_SUCCESS;
    constructor(public payload: Update<Emp>) { }
}

export class UpdateEmpFail implements Action {
    readonly type = EmpActionTypes.UPDATE_EMP_FAIL;

    constructor(public payload: string) { }
}


export class DeleteEmp implements Action {
    readonly type = EmpActionTypes.DELETE_EMP;

    constructor(public payload: number) { }
}

export class DeleteEmpSuccess implements Action {
    readonly type = EmpActionTypes.DELETE_EMP_SUCCESS;

    constructor(public payload: number) { }
}

export class DeleteEmpFail implements Action {
    readonly type = EmpActionTypes.DELETE_EMP_FAIL;

    constructor(public payload: string) { }
}



export type Actions = LoadEmployee | LoadEmployeeSuccess | LoadEmployeeFail
    | CreateEmp | CreateEmpSuccess | CreateEmpFail | UpdateEmp | UpdateEmpSuccess | UpdateEmpFail
    | DeleteEmp | DeleteEmpSuccess | DeleteEmpFail | LoadCustomer | LoadCustomerSuccess | LoadCustomerFail;

