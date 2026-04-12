import { Component, inject } from '@angular/core';
import { RouterLinkActive, RouterLink } from "@angular/router";
import { AuthService } from '../../core/auth/services/AuthService';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLinkActive, RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {

  //injections
  protected authService = inject(AuthService);

  logout(){
    this.authService.logout();
  }
}
