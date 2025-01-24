import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { AccessTokenRequest } from '../types/accessTokenRequest.interface'
import { Observable } from 'rxjs'
import { AccessTokenResponse } from '../types/accessTokenResponse.interface'
import { environment } from 'src/environments/environment.development'
import { ApiRoutes } from 'src/app/enums/ApiRoutes'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  getAccessToken(data: AccessTokenRequest): Observable<AccessTokenResponse> {
    const url = `${environment.api + ApiRoutes.OAUTH}/${ApiRoutes.ACCESS_TOKEN}`
    const body = new HttpParams()
      .set('client_id', data.client_id)
      .set('client_secret', data.client_secret)
      .set('grant_type', data.grant_type)
      .set('code', data.code)

    return this.http.post<AccessTokenResponse>(url, body.toString(), {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    })
  }
}
