export interface AccessTokenResponse {
  access_token: string
  scope: string
  expires_in: number
  refresh_token: string
  token_type: string
}
