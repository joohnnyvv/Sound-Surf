import { inject } from '@angular/core'
import { createFeature, createReducer, on } from '@ngrx/store'
import { AuthState } from '../types/authState.interface'
import { authActions } from './actions'
import { LocalStorageService } from 'src/app/shared/services/localStorage.service'
import { LocalStorageKeys } from '../components/register/enums/localStorageKeys'
import { AccessTokenResponse } from '../types/accessTokenResponse.interface'

const getInitialState = () => {
  const localStorageValue = localStorage.getItem(LocalStorageKeys.SESSION_DATA)
  if (localStorageValue) {
    return JSON.parse(localStorageValue) as AccessTokenResponse
  }
  return undefined
}

const initialState: AuthState = {
  isLoading: false,
  validationErrors: null,
  accessTokenResponse: getInitialState(),
}

const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(authActions.register, (state) => ({
      ...state,
      validationErrors: null,
      isLoading: true,
    })),
    on(authActions.registerSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      accessTokenResponse: action.response,
    })),
    on(authActions.registerFailure, (state, action) => ({
      ...state,
      isLoading: false,
      validationErrors: action.error,
    }))
  ),
})

export const {
  name: authFeatureKey,
  reducer: authReducer,
  selectAccessTokenResponse,
  selectIsLoading,
  selectValidationErrors,
} = authFeature
