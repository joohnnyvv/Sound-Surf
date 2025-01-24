import { bootstrapApplication } from '@angular/platform-browser'
import { AppComponent } from './app/app.component'
import { provideRouter } from '@angular/router'
import { appRoutes } from './app/app.routes'
import { provideState, provideStore } from '@ngrx/store'
import { provideStoreDevtools } from '@ngrx/store-devtools'
import { isDevMode, importProvidersFrom } from '@angular/core'
import { provideHttpClient } from '@angular/common/http'
import { authFeatureKey, authReducer } from './app/auth/store/reducers'
import { provideEffects } from '@ngrx/effects'
import * as authEffects from './app/auth/store/effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(appRoutes),
    provideStore(),
    provideState(authFeatureKey, authReducer),
    provideEffects(authEffects),
    provideStoreDevtools({
        maxAge: 25,
        logOnly: !isDevMode(),
        autoPause: true,
        trace: false,
        traceLimit: 75,
    }),
    importProvidersFrom(BrowserAnimationsModule)
],
})
