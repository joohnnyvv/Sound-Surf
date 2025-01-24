import { Route } from '@angular/router'
import { RegisterComponent } from './components/register/register.component'
import { AuthorizedComponent } from './components/register/authorized/authorized.component'

export const registerRoutes: Route[] = [
  {
    path: '',
    component: RegisterComponent,
  },
  {
    path: 'authorized',
    component: AuthorizedComponent,
  },
]
