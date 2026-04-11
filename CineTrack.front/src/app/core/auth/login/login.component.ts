import { Component, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthService } from '../services/AuthService';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  //variables
  loginForm!: FormGroup;

  //injections
  authService = inject(AuthService);

}
