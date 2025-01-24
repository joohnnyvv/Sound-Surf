import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { authActions } from 'src/app/auth/store/actions'
import {
  selectAccessTokenResponse,
  selectIsLoading,
  selectValidationErrors,
} from 'src/app/auth/store/reducers'
import { AuthState } from 'src/app/auth/types/authState.interface'
import { environment } from 'src/environments/environment'

@Component({
  selector: 'app-authorized',
  templateUrl: './authorized.component.html',
  styleUrls: ['./authorized.component.css'],
  imports: [CommonModule],
  standalone: true,
})
export class AuthorizedComponent implements OnInit {
  denied: string = ''
  code: string = ''

  isLoading$ = this.store.select(selectIsLoading)
  errors$ = this.store.select(selectValidationErrors)
  accessTokenResponse$ = this.store.select(selectAccessTokenResponse)

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private store: Store<{ auth: AuthState }>
  ) {}

  ngOnInit(): void {
    this._activatedRoute.queryParams.subscribe((params) => {
      this.denied = params['error'] || ''
      this.code = params['code'] || ''

      if (this.code) {
        this.getAccessToken()
      }
    })
  }

  navigateToRegistrationPage() {
    this._router.navigate(['..'], { relativeTo: this._activatedRoute })
  }

  getAccessToken() {
    const request = {
      client_id: environment.clientId,
      client_secret: environment.clientSecret,
      grant_type: 'authorization_code',
      code: this.code,
    }

    this.accessTokenResponse$.subscribe((response) => {
      // if (response === null || response === undefined) {
      this.store.dispatch(
        authActions.register({
          request,
        })
      )
      // }
    })
  }
}
