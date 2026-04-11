import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/AuthService';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  //variables
  protected loginForm!: FormGroup;

  //injections
  private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  //methods
  ngOnInit(): void {
    this.initializeSignInForm();
  }

  initializeSignInForm(){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required, Validators.minLength(6)]
    });
  }



}
