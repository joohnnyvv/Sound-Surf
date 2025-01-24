import { AccessTokenResponse } from './accessTokenResponse.interface'
import { BackendErrors } from './BackendErrors.interface'

export interface AuthState {
  accessTokenResponse: AccessTokenResponse | null | undefined
  isLoading: boolean
  validationErrors: BackendErrors | null
}
