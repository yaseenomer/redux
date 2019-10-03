import {Customer} from '../customer.model';
import * as customerAction from '../state/customer.actions';
import * as fromRoot from '../../state/app-state';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';

export interface CustomerState extends EntityState<Customer> {
  selectedCustomerId: number| null;
  loading: boolean;
  loaded: boolean;
  error: string;
}
export interface AppState extends fromRoot.AppState {
  customers: CustomerState;
}
export const customerAdapter: EntityAdapter<Customer> = createEntityAdapter<Customer>();

export const defaultCustomer: CustomerState = {
  ids: [],
  entities: {},
  selectedCustomerId: null,
  loading: false,
  loaded: false,
  error: ''
};
export const initialState = customerAdapter.getInitialState(defaultCustomer);

export function customerReducer(state = initialState, action: customerAction.Action): CustomerState {
  switch (action.type) {
    case customerAction.CustomerActions.LOAD_CUSTOMERS_SUCCESS: {
      return customerAdapter.addAll(action.payload, {
        ...state,
        loading: false,
        loaded: true
      });
    }
    case customerAction.CustomerActions.LOAD_CUSTOMERS_FAIL: {
      return {
        ...state,
        entities: {},
        loading: false,
        loaded: false,
        error:  action.payload
      };
    }
    case customerAction.CustomerActions.LOAD_CUSTOMER_SUCCESS: {
      return customerAdapter.addOne(action.payload, {
        ...state,
        selectedCustomerId: action.payload.id
      });
    }
    case customerAction.CustomerActions.LOAD_CUSTOMER_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }

    case customerAction.CustomerActions.CREATE_CUSTOMER_SUCCESS: {
      return customerAdapter.addOne(action.payload, state);
    }
    case customerAction.CustomerActions.CREATE_CUSTOMER_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }

    case customerAction.CustomerActions.UPDATE_CUSTOMER_SUCCESS: {
      return customerAdapter.updateOne(action.payload, state);
    }
    case customerAction.CustomerActions.UPDATE_CUSTOMER_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }

    case customerAction.CustomerActions.DELETE_CUSTOMER_SUCCESS: {
      return customerAdapter.removeOne(action.payload, state);
    }
    case customerAction.CustomerActions.DELETE_CUSTOMER_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }
    default : {
      return state;
    }
  }
}

export const getCustomerFeatureState = createFeatureSelector<CustomerState>('customers');

export const getCustomers = createSelector(getCustomerFeatureState, customerAdapter.getSelectors().selectAll);

export const getCustomersLoading = createSelector(getCustomerFeatureState, (state: CustomerState) => state.loading);

export const getCustomersLoaded = createSelector(getCustomerFeatureState, (state: CustomerState) => state.loaded);

export const getError = createSelector(getCustomerFeatureState, (state: CustomerState) => state.error);

export const getCurrentCustomerId = createSelector(
  getCustomerFeatureState,
  (state: CustomerState) => state.selectedCustomerId
);

export const getCurrentCustomer = createSelector(
  getCustomerFeatureState,
  getCurrentCustomerId,
  state => state.entities[state.selectedCustomerId]
);
