import * as empActions from './emp.actions';
import * as fromRoot from "../../state/app-state";
import { Emp } from "../../shared/model/emp.model";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity"

export interface EmpState extends EntityState<Emp> {
    selectedCustomerId: number | null;
    loading: boolean,
    loaded: boolean,
    error: string;
}

export interface AppState extends fromRoot.AppState {
    employees: EmpState;
}


export const empAdapter: EntityAdapter<Emp> = createEntityAdapter<Emp>();

export const defaultEmp: EmpState = {
    ids: [],
    entities: {},
    selectedCustomerId: null,
    loading: false,
    loaded: false,
    error: ""
};

export const initialState = empAdapter.getInitialState(defaultEmp);


export function empReducer(state = initialState, action: empActions.Actions): EmpState {
    switch (action.type) {
  
        case empActions.EmpActionTypes.LOAD_EMP_SUCCESS: {
            return empAdapter.setAll(action.payload, {
                ...state,
                loading: false,
                loaded: true
            });
        }


        case empActions.EmpActionTypes.LOAD_EMP_FAIL: {
            return {
                ...state,
                entities: {},
                loading: false,
                loaded: false,
                error: action.payload
            };
        }

        case empActions.EmpActionTypes.LOAD_ONE_EMP_SUCCESS: {
            return empAdapter.addOne(action.payload, {
                ...state,
                selectedCustomerId: action.payload.id

            });
        }


        case empActions.EmpActionTypes.LOAD_ONE_EMP_FAIL: {
            return {
                ...state,
                error: action.payload
            };
        }



        case empActions.EmpActionTypes.CREATE_EMP_SUCCESS: {
            return empAdapter.addOne(action.payload, state);
        }

        case empActions.EmpActionTypes.CREATE_EMP_FAIL: {
            return {
                ...state,
                error: action.payload
            };
        }

        case empActions.EmpActionTypes.UPDATE_EMP_SUCCESS: {
            return empAdapter.updateOne(action.payload, state);
        }

        case empActions.EmpActionTypes.UPDATE_EMP_FAIL: {
            return {
                ...state,
                error: action.payload
            };
        }

        case empActions.EmpActionTypes.DELETE_EMP_SUCCESS: {
            return empAdapter.removeOne(action.payload, state);
        }

        case empActions.EmpActionTypes.DELETE_EMP_FAIL: {
            return {
                ...state,
                error: action.payload
            };
        }

        default: {
            return state;
        }

    }
}

const getEmpFeatureState = createFeatureSelector<EmpState>("emp")

export const getEmps = createSelector(
    getEmpFeatureState,
    empAdapter.getSelectors().selectAll
);

export const getEmpsLoading = createSelector(getEmpFeatureState, (state: EmpState) =>
    state.loading
);

export const getEmpsLoaded = createSelector(getEmpFeatureState, (state: EmpState) =>
    state.loaded
);

export const getError = createSelector(getEmpFeatureState, (state: EmpState) =>
    state.error
);

export const getCurrentEmpId = createSelector(
    getEmpFeatureState,
    (state: EmpState) => state.selectedCustomerId
);

export const getCurrentEmp = createSelector(
    getEmpFeatureState,
    getCurrentEmpId,
    state => state.entities[state.selectedCustomerId]
);
