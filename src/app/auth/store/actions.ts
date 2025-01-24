import { BackendErrors } from './../types/BackendErrors.interface'
import { createActionGroup, emptyProps, props } from '@ngrx/store'
import { AccessTokenRequest } from '../types/accessTokenRequest.interface'
import { AccessTokenResponse } from '../types/accessTokenResponse.interface'

export const authActions = createActionGroup({
  source: 'Auth',
  events: {
    Register: props<{ request: AccessTokenRequest }>(),
    'Register success': props<{ response: AccessTokenResponse }>(),
    'Register failure': props<{ error: BackendErrors }>(),
  },
})
