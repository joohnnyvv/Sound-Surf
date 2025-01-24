import { Component } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { ApiRoutes } from 'src/app/enums/ApiRoutes'
import { environment } from 'src/environments/environment.development'

@Component({
  selector: 'mc-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class RegisterComponent {
  authorize() {
    window.open(
      `${environment.api}${
        ApiRoutes.OAUTH + '/' + ApiRoutes.AUTHORIZE
      }/?client_id=${environment.clientId}&response_type=code`,
      '_blank'
    )
  }
}
