import { AccessTokenResponse } from './../types/accessTokenResponse.interface'
import { inject } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { AuthService } from '../services/auth.service'
import { authActions } from './actions'
import { catchError, map, of, switchMap } from 'rxjs'
import { HttpErrorResponse } from '@angular/common/http'
import { LocalStorageService } from 'src/app/shared/services/localStorage.service'
import { LocalStorageKeys } from '../components/register/enums/localStorageKeys'

export const registerEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    localStorageService = inject(LocalStorageService)
  ) => {
    return actions$.pipe(
      ofType(authActions.register),
      switchMap(({ request }) => {
        return authService.getAccessToken(request).pipe(
          map((response: AccessTokenResponse) => {
            localStorageService.set(
              LocalStorageKeys.SESSION_DATA,
              JSON.stringify(response)
            )
            return authActions.registerSuccess({ response })
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              authActions.registerFailure({ error: errorResponse.error.error })
            )
          })
        )
      })
    )
  },
  { functional: true }
)
