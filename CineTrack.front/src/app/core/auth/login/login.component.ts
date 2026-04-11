import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/AuthService';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
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
  private toastr = inject(ToastrService);
  
  //methods
  ngOnInit(): void {
    if(this.authService.isAuthenticated()){
      this.router.navigate(['/movies']);
    }
    this.initializeSignInForm();
  }
  
  initializeSignInForm(){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  
  
  onSubmit() {
  const model = this.loginForm.value;
  this.authService.login(model).subscribe({
    next: () => {
      this.router.navigate(['/movies']);
      this.toastr.success('Login successful');
    },
    error: (error) => {
      console.log(error);
      this.toastr.error('Username or password is incorrect');
    }
  });
  }

}
