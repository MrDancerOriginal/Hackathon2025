import { Injectable } from '@angular/core';
import { OAuthService, AuthConfig } from 'angular-oauth2-oidc';

const authConfig: AuthConfig = {
  issuer: 'https://your-identity-server-url',
  redirectUri: window.location.origin + '/login/callback',
  clientId: 'angular-client',
  scope: 'openid profile email api',
  responseType: 'code',
  showDebugInformation: true,
  silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',
};

@Injectable({
  providedIn: 'root',
})
export class AuthConfigService {
  constructor(private oauthService: OAuthService) {
    this.oauthService.configure(authConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }
}
