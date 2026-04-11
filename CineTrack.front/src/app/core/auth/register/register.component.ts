import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/AuthService';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  
  //variables
  protected registerForm!: FormGroup;
  
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
    this.initializeRegisterForm();
  }
  
  initializeRegisterForm(){
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  
  onSubmit() {
    const model = this.registerForm.value;
    this.authService.register(model).subscribe({
      next: () => {
        this.router.navigate(['/movies']);
        this.toastr.success('Registration successful');
      },
      error: (error) => {
        console.log(error);
        this.toastr.error('Registration failed');
      }
    });
  }
}
