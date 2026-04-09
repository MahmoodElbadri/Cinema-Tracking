import { Component } from '@angular/core';
import { RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLinkActive],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {

}
